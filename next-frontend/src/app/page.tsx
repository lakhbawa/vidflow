"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold mb-4 text-center">
        Vidflow
      </h1>

      <p className="text-gray-300 text-lg max-w-2xl text-center mb-8">
        Fast and reliable video conversion powered by Go & Python.
        Upload your video and let Vidflow handle the rest — optimized performance,
        real-time progress updates, professional-grade results.
      </p>

      <div className="flex gap-4">
        <Link href="/video/conversion">
          <button
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition"
          >
            Upload Video
          </button>
        </Link>
        <button
          className="border border-gray-600 hover:border-white hover:text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Learn More
        </button>
      </div>

      <footer className="absolute bottom-6 text-xs text-gray-500">
        © {new Date().getFullYear()} Vidflow — Built for Engineering Excellence
      </footer>
    </main>
  );
}
