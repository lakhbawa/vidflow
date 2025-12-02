"use client";

import axios from "axios";
import {use, useEffect, useState} from "react";
import Link from "next/link";
interface ConversionData {
    status: string;
    original_path: string;
    final_path?: string;
}

export default function ConversionStatus({params}: { params: Promise<{ conversion_id: string }> }) {
    const {conversion_id} = use(params);

    const [conversionData, setConversionData] = useState<ConversionData | null>(null);
    const [error, setError] = useState<string | null>(null);

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
                setError("Failed to fetch conversion status");
            }
        }

        fetchConversionData();

        // cleanup on unmount
        return () => {
            if (intervalId) clearTimeout(intervalId);
        };
    }, [conversion_id]);

    if (error) {
        return (
            <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6">
                <div className="w-full max-w-2xl">
                    <div className="bg-gray-900 border border-red-900 rounded-2xl shadow-2xl p-8 text-center">
                        <svg className="mx-auto h-16 w-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-2xl font-bold mb-2">Error</h2>
                        <p className="text-gray-400 mb-6">{error}</p>
                        <Link href="/video/conversion">
                            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition">
                                Try Again
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    if (!conversionData) {
        return (
            <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6">
                <div className="flex flex-col items-center gap-4">
                    <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-400">Loading conversion status...</p>
                </div>
            </main>
        );
    }

    const isPending = conversionData.status === "PENDING";
    const isCompleted = conversionData.status === "completed";

    return (
        <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-2xl">
                <Link href="/video/conversion" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    New Conversion
                </Link>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        {isPending && (
                            <div className="mb-6">
                                <svg className="animate-spin h-16 w-16 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        )}
                        {isCompleted && (
                            <div className="mb-6">
                                <svg className="h-16 w-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        )}

                        <h1 className="text-3xl font-bold mb-2">
                            {isPending ? "Converting Your Video" : "Conversion Complete"}
                        </h1>
                        <p className="text-gray-400">
                            {isPending
                                ? "Please wait while we process your file..."
                                : "Your file is ready for download"}
                        </p>
                    </div>

                    <div className="bg-gray-800 rounded-xl p-6 space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-gray-700">
                            <span className="text-gray-400 font-medium">Status</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                isPending
                                    ? "bg-yellow-900 text-yellow-300"
                                    : "bg-green-900 text-green-300"
                            }`}>
                                {isPending ? "Processing" : "Completed"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between py-3 border-b border-gray-700">
                            <span className="text-gray-400 font-medium">Conversion ID</span>
                            <span className="text-gray-300 font-mono text-sm">{conversion_id}</span>
                        </div>

                        <div className="flex items-start justify-between py-3">
                            <span className="text-gray-400 font-medium">Original File</span>
                            <span className="text-gray-300 text-sm text-right break-all max-w-md">
                                {conversionData.original_path}
                            </span>
                        </div>
                    </div>

                    {isPending && (
                        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm text-blue-300">
                                    This page will automatically update when your conversion is complete. No need to refresh!
                                </p>
                            </div>
                        </div>
                    )}

                    {isCompleted && conversionData.final_path && (
                        <div className="mt-6 space-y-4">
                            <a
                                href={`/static/${conversionData.final_path}`}
                                download
                                className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium transition"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download File
                            </a>

                            <p className="text-center text-sm text-gray-500">
                                {conversionData.final_path}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
