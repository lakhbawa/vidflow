"use client";
import { useState } from "react";
import axios from "axios";


export default function Home() {
  const [data, setData] = useState(null)
  useState(() => {
    axios.get('/api').then(res => {
      setData(res.data)
    })
  })
  
    
  return (
    <>
      <h1>Hello</h1>
      <p>
        {data ? JSON.stringify(data) : 'Loading'}
      </p>
    </>
  );
}
