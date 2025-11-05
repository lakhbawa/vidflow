"use client";

import axios from "axios";
import {use, useEffect, useState} from "react";

export default function ConversionStatus({params}: { params: Promise<{ conversion_id: string }> }) {
    const {conversion_id} = use(params);

    const [conversionData, setConversionData] = useState<any>(null);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        async function fetchConversionData() {
            try {
                const res = await axios.get(`/api/conversion-status/${conversion_id}`);
                const data = res.data;

                setConversionData(data);

                if (data.status === "PENDING") {
                    intervalId = setTimeout(fetchConversionData, 2000);
                }
            } catch (err) {
                console.error(err);
            }
        }

        fetchConversionData();

        // cleanup on unmount
        return () => {
            if (intervalId) clearTimeout(intervalId);
        };
    }, [conversion_id]);

    if (!conversionData) return <p>Loading...</p>;

    return (
        <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-lg shadow-md ">
            <h2 className="font-semibold">Video Conversion Status</h2>
            <p>Status: {conversionData.status}</p>
            <p>Original file: {conversionData.original_path}</p>
            {conversionData.status === "PENDING" && (
                <h2> Video Conversion in progress, Please wait </h2>

            )}
            {conversionData.status === "completed" && conversionData.final_path && (
                <p>
                    Download:{" "}
                    <a className="text-blue text-gray-800 bg-blue-300" href={`/static/${conversionData.final_path}`}
                       download>
                        {conversionData.final_path}
                    </a>
                </p>
            )}
        </div>
    );
}
