"use client";
import { useState } from "react";
import axios from "axios";


export default function Home() {
    const res = axios.get('nginx:80/api')

    console.log(res)
  

  return (
    <>
      <h1>Hello</h1>
    </>
  );
}
