"use client";

import axios from "axios";
import { useEffect, useState, use } from "react";

export default function ConversionStatus({ params }: { params: Promise<{ conversion_id: string }> }) {
  const { conversion_id } = use(params);

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
    <div>
      <h2>Video Conversion Status</h2>
      <p>Status: {conversionData.status}</p>
      <p>Original file: {conversionData.original_path}</p>
      {conversionData.status === "completed" && conversionData.final_path && (
        <p>
          Download:{" "}
          <a href={`/static/${conversionData.final_path}`} download>
            {conversionData.final_path}
          </a>
        </p>
      )}
    </div>
  );
}
