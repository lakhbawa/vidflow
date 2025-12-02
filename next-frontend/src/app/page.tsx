"use client";

import Link from "next/link";

export default function Home() {
  const techStack = [
    { name: "Python", icon: "🐍", color: "text-yellow-400" },
    { name: "FastAPI", icon: "⚡", color: "text-green-400" },
    { name: "Go", icon: "🔵", color: "text-blue-400" },
    { name: "Gin", icon: "🍸", color: "text-cyan-400" },
    { name: "Next.js", icon: "▲", color: "text-white" },
    { name: "React", icon: "⚛️", color: "text-blue-300" },
    { name: "PostgreSQL", icon: "🐘", color: "text-blue-500" },
    { name: "Redis Streams", icon: "📮", color: "text-red-400" },
    { name: "Docker", icon: "🐳", color: "text-blue-400" },
    { name: "FFmpeg", icon: "🎬", color: "text-green-500" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white px-6 py-12 relative overflow-hidden">
      {/* Animated background gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-sm text-blue-400 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Go + Python + Typescript Based Video Converter
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Vidflow by Lakh Bawa
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            A full-stack video conversion platform showcasing modern
            microservices architecture. Extract MP3 from MP4 or any other video
            format with blazing-fast performance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/video/conversion">
              <button className="group relative bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-105 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                Start Converting
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </Link>
            <a
              href="https://github.com/lakhbawa/vidflow"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border-2 border-gray-700 hover:border-gray-500 hover:bg-gray-800/50 px-8 py-4 rounded-xl font-medium transition-all backdrop-blur-sm flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                View on GitHub
              </button>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 text-sm text-gray-400">
            <a
              href="https://www.linkedin.com/in/lakhbawa/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <span className="text-gray-700">•</span>
            <a
              href="https://lakhveerbawa.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              Portfolio
            </a>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Tech Stack</h2>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-all hover:scale-105"
                >
                  <span className="text-3xl">{tech.icon}</span>
                  <span className={`text-sm font-medium ${tech.color}`}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Architecture Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all">
            <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Microservices Architecture
            </h3>
            <p className="text-gray-400 text-sm">
              FastAPI for API Gateway, Go for CPU-intensive video processing,
              Redis Streams for inter-service communication.
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all">
            <div className="w-12 h-12 bg-green-600/10 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Optimized Performance
            </h3>
            <p className="text-gray-400 text-sm">
              Go handles video processing with FFmpeg for maximum efficiency.
              PostgreSQL for reliable job persistence.
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all">
            <div className="w-12 h-12 bg-purple-600/10 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Containerized Deployment
            </h3>
            <p className="text-gray-400 text-sm">
              Full Docker setup with docker-compose for easy deployment and
              scalability across environments.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Current Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    MP4, MOV, AVI, MKV to MP3 Conversion
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Extract high-quality audio from video files up to 100MB.
                    Professional-grade 320kbps output.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-400">
                    Coming Soon
                  </h3>
                  <p className="text-gray-500 text-sm">
                    • Video aspect ratio conversion (9:16, 1:1)
                    <br />• Resolution resizing for social media
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">
                100MB
              </div>
              <div className="text-sm text-gray-400">Max File Size</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">
                &lt;30s
              </div>
              <div className="text-sm text-gray-400">Avg. Processing</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">
                320kbps
              </div>
              <div className="text-sm text-gray-400">Audio Quality</div>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center text-xs text-gray-500 z-10 relative pt-8 pb-4">
        © {new Date().getFullYear()} Vidflow — Built by{" "}
        <a
          href="https://lakhveerbawa.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          Lakhveer Bawa
        </a>
      </footer>
    </main>
  );
}
