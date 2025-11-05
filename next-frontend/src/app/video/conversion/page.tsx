"use client"

import ConvertVideoForm from "./includes/ConvertVideoForm"
import Link from "next/link"


export default function Conversion() {

    return (
        <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-2xl">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Convert Your Video</h1>
                        <p className="text-gray-400">
                            Upload your video file and convert it to MP3 format. Files up to 100MB supported.
                        </p>
                    </div>

                    <ConvertVideoForm />

                    <div className="mt-8 pt-6 border-t border-gray-800">
                        <h3 className="text-sm font-medium text-gray-400 mb-3">Supported Features:</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Fast Processing
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                High Quality Output
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Real-time Status
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Secure Processing
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}