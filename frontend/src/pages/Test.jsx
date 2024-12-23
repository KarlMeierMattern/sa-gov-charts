import React, { useState, useEffect } from "react";
import axios from "axios";

const Test = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/gov/test");
        setResponse(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return <div>{response}</div>;
};

export default Test;
