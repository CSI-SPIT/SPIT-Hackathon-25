"use client";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Result } from "@zxing/library";
import axios from "axios";

const ScanQR: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [mealType, setMealType] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messageColor, setMessageColor] = useState<string>("");

  const handleResult = (result: Result | null, error: Error | null) => {
    if (result) {
      setData(result.getText());
    }

    if (error) {
      console.info(error);
    }
  };

  const handleRedeem = async () => {
    if (!data || !mealType) {
      setMessage("Please select a meal type.");
      setMessageColor("text-red-500");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:3000/admin/team/meal", {
        teamId: data,
        mealType,
      });

      if (response.status === 201) {
        setMessage(`Meal type ${mealType} redeemed successfully`);
        setMessageColor("text-green-500");
      } else {
        setMessage(`Failed to redeem meal type ${mealType}`);
        setMessageColor("text-red-500");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setMessage(`Meal type ${mealType} already redeemed`);
        setMessageColor("text-red-500");
      } else {
        setMessage("An error occurred. Please try again.");
        setMessageColor("text-red-500");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      {data ? (
        <div>
          <h2 className="text-2xl mb-4">QR Code Result</h2>
          <p>{data}</p>
          <div className="mt-4">
            <label htmlFor="mealType" className="block text-gray-700">Select Meal Type</label>
            <select
              id="mealType"
              value={mealType ?? ""}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full p-2 border border-gray-300 text-black rounded mt-1"
            >
              <option value="" disabled>Select a meal</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>
          <button
            className="mt-4 bg-blue-500 text-white p-2 rounded"
            onClick={handleRedeem}
          >
            Redeem
          </button>
          {message && <p className={`mt-4 ${messageColor}`}>{message}</p>}
          <button
            className="mt-4 bg-blue-500 text-white p-2 rounded"
            onClick={() => {
              setData(null);
              setMealType(null);
              setMessage(null);
            }}
          >
            Scan Again
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl mb-4">Scan QR Code</h2>
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={(result, error) => {
              handleResult(result ?? null, error ?? null);
            }}
            containerStyle={{ width: '100%' }}
            videoStyle={{ width: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export default ScanQR;