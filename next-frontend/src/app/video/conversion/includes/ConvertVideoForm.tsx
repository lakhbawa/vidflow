"use client";
import {convertJsonToFormData, handleFormInputChangeHelper,} from "@/lib/helpers";
import axios from "axios";
import {FormEvent, useState} from "react";
import {useRouter} from 'next/navigation';

export default function ConvertVideoForm() {
    const router = useRouter();

    const [conversionId, setConversionId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState<string>("");
    const [formData, setFormData] = useState({
        file: null,
        target_format: "mp3",
    });

    function handleInputChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) {
        handleFormInputChangeHelper(event, setFormData);

        if (event.target instanceof HTMLInputElement && event.target.type === "file") {
            const file = event.target.files?.[0];
            if (file) {
                setFileName(file.name);
            }
        }
    }

    async function submitForm(event: FormEvent) {
        event.preventDefault();

        if (!formData.file) {
            alert("Please select a file");
            return;
        }

        setIsLoading(true);

        try {
            const res = await axios.post(
                "/api/video/convert",
                convertJsonToFormData(formData),
                {
                    headers: {"Content-Type": "multipart/form-data"},
                }
            );

            setConversionId(res.data.conversion_id);
            router.push(`/video/status/${res.data.conversion_id}`);

        } catch (err) {
            console.error(err);
            alert("Conversion failed. Please try again.");
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={submitForm} encType="multipart/form-data" className="space-y-6">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                    Select Video File
                </label>
                <div className="relative">
                    <input
                        className="hidden"
                        name="file"
                        type="file"
                        accept=".mp4,.mov,.avi,.mkv"
                        id="file-input"
                        onChange={handleInputChange}
                    />
                    <label
                        htmlFor="file-input"
                        className="flex items-center justify-center w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer hover:bg-gray-750 hover:border-gray-600 transition-all"
                    >
                        <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="mt-2 text-sm text-gray-400">
                                {fileName ? (
                                    <span className="text-blue-400 font-medium">{fileName}</span>
                                ) : (
                                    <>
                                        <span className="text-blue-400 font-medium">Click to upload</span> or drag and drop
                                    </>
                                )}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                MP4, MOV, AVI, MKV up to 100MB
                            </p>
                        </div>
                    </label>
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                    Target Format
                </label>
                <select
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    name="target_format"
                    onChange={handleInputChange}
                    defaultValue="mp3"
                >
                    <option value="mp3">MP3 Audio</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={isLoading || !formData.file}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </>
                ) : (
                    "Convert Video"
                )}
            </button>
        </form>
    );
}
