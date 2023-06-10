import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch the data from the API
    axios
      .get(
        "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=RIBXT3XYLI69PC0Q"
      )
      .then((response) => {
        // Extract the time series data from the response
        const timeSeries = response.data["Time Series (5min)"];
        // Convert the object into an array of [time, price] pairs
        const data = Object.entries(timeSeries).map(([time, value]) => [
          time,
          Number(value["4. close"]),
        ]);
        // Set the state with the data
        setData(data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">IBM Stock Price</h1>
      {data ? (
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left p-2">Time</th>
              <th className="text-right p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map(([time, price]) => (
              <tr key={time} className="border-b">
                <td className="text-left p-2">{time}</td>
                <td className="text-right p-2">{price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
}


export default App;
