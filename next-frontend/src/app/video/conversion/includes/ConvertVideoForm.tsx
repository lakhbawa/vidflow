"use client";
import {
  convertJsonToFormData,
  handleFormInputChangeHelper,
} from "@/lib/helpers";
import axios from "axios";
import { FormEvent, useState } from "react";

export default function ConvertVideoForm() {
  console.log("loaded");
  const [formData, setFormData] = useState({
    file: null,
    target_format: "mp3",
  });

function handleInputChange(
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) {
    handleFormInputChangeHelper(event, setFormData);
  }

  async function submitForm(event: FormEvent) {
    event.preventDefault();

    console.log("form submission: ", convertJsonToFormData(formData));

    const res = await axios
      .post("/api/video/convert", convertJsonToFormData(formData), {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <>
      <form onSubmit={submitForm} encType="multipart/form-data">
        <label>
          <input
            className="border-gray-200 p-2 border-2 rounded"
            name="file"
            type="file"
            accept=".mp4"
            placeholder="Select File"
            onChange={handleInputChange}
          />
        </label>
        <label>
          <select
            className="border-gray-200 p-2 border-2 rounded"
            name="target_format"
            onChange={handleInputChange}
          >
            <option value="mp3">Mp3</option>
          </select>
        </label>

        <input
          className="border-gray-200 p-2 border-2 rounded bg-gray-500 text-white"
          type="submit"
          value="Submit"
          onClick={submitForm}
        ></input>
      </form>
    </>
  );
}
