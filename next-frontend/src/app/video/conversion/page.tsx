"use client"

import ConvertVideoForm from "./includes/ConvertVideoForm"


export default function Conversion() {

    return (
        <>
            <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-lg shadow-md ">
                <h1 className="font-semibold">Chose Mp4 file to convert to mp3 (Size Limit: 100M) </h1>
                <ConvertVideoForm></ConvertVideoForm>
            </div>
        </>
    )
}