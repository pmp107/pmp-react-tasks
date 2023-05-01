// import logo from './logo.svg';
import './App.css';

import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import $ from 'jquery';

export default function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts',
      type: 'POST',
      data: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }),
      dataType: 'json',
      contentType: 'application/json',
      async: true,
      success: (result, status, xhr) => {
        // debugger;
        // console.log("Success=> ",result,xhr,status);
        setData([result]); // in case of post object is received hence enclosed in array, 
                            //incase of GET we already get array as response so no need to use [].
        setIsLoading(false);
      },
      error: (xhr, status, error) => {
        // console.log("Error=> ",xhr,status,error);
        setError(new Error('Network response was not ok'));
        setIsLoading(false);
      },
      complete: (xhr, status) => {
        // console.log("complete=> ",xhr,status,error);
        // Do something after the request is complete
      },
      context: this // Set the context for the callbacks
    });
    setIsLoading(true);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      Hello
      <h1>
        {data && data.map((da) => {
          return <p key={da.id}>{da.title}</p>;
        })}
      </h1>
    </div>
  );
}
