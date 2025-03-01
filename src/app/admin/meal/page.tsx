"use client";
import React, { useState } from 'react';
import { useZxing } from "react-zxing";
import axios from 'axios';
import { RiQrScanLine, RiCloseLine, RiRestaurantLine, RiCheckLine, RiCameraLine } from 'react-icons/ri';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

type MealType = 'breakfast' | 'lunch' | 'dinner';

const MealPage = () => {
  const [selectedMeal, setSelectedMeal] = useState<MealType | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const { ref, torch } = useZxing({
    paused: !showScanner,
    onDecodeResult(result) {
      const decodedText = result.getText();
      handleScan(decodedText);
    },
    onError(error) {
      console.error("Scanner error:", error);
    },
  });

  const handleScan = async (result: string) => {
    if (!selectedMeal || loading || !result) return;

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Authentication token not found. Please log in again.');
        return;
      }

      const response = await axios.post(
        `${SERVER_URL}/admin/team/meal`,
        {
          teamCode: result,
          mealType: selectedMeal,
        },
        {
          headers: { 'Authorization': `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSuccess(response.data.message || 'Meal marked successfully');
        setShowScanner(false);
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(response.data.message || 'Failed to mark meal');
      }
    } catch (error: unknown) {
      console.error('Error marking meal:', error);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
          'An error occurred while processing the request. Please try again.'
        );
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const meals = [
    { type: 'breakfast' as MealType, label: 'Breakfast', icon: '🍳' },
    { type: 'lunch' as MealType, label: 'Lunch', icon: '🍲' },
    { type: 'dinner' as MealType, label: 'Dinner', icon: '🍽️' },
  ];

  const handleStartScanning = () => {
    setError(null);
    setSuccess(null);
    setShowScanner(true);
  };

  const handleStopScanning = () => {
    setShowScanner(false);
  };

  const toggleTorch = () => {
    if (torch.isOn) {
      torch.off();
    } else {
      torch.on();
    }
  };

  return (
    <div className="container mx-auto max-w-3xl">
      <div className="bg-[#1d2029] border border-gray-800 rounded-lg shadow-xl">
        <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-[#1d2029] to-[#252a3a]">
          <div className="flex items-center">
            <RiRestaurantLine className="h-6 w-6 text-[#a5f0d3] mr-2" />
            <h1 className="text-xl font-bold text-[#a5f0d3]">Meal Tracking</h1>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {meals.map(({ type, label, icon }) => (
              <button
                key={type}
                onClick={() => setSelectedMeal(type)}
                className={`p-4 rounded-lg border transition-all duration-200 ${selectedMeal === type
                  ? 'bg-[#a5f0d3]/20 border-[#a5f0d3] text-[#a5f0d3]'
                  : 'bg-gray-800/30 border-gray-700 text-gray-400 hover:bg-gray-800/50'
                  }`}
              >
                <div className="text-xl mb-1">{icon}</div>
                <div>{label}</div>
              </button>
            ))}
          </div>

          {selectedMeal && !showScanner && (
            <button
              onClick={handleStartScanning}
              className="w-full py-4 bg-[#a5f0d3]/20 hover:bg-[#a5f0d3]/30 text-[#a5f0d3] rounded-lg border border-[#a5f0d3] flex items-center justify-center gap-2"
            >
              <RiQrScanLine className="h-5 w-5" /> Scan QR Code
            </button>
          )}

          {showScanner && selectedMeal && (
            <div className="relative mb-6">
              <div className="border-2 border-[#a5f0d3]/30 rounded-lg overflow-hidden bg-black">
                <video
                  ref={ref}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-2 border-[#a5f0d3] rounded-lg"></div>
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={handleStopScanning}
                    className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white z-10"
                  >
                    <RiCloseLine className="h-5 w-5" />
                  </button>
                  {torch.isAvailable && (
                    <button
                      onClick={toggleTorch}
                      className={`p-2 rounded-full text-gray-400 hover:text-white z-10 ${torch.isOn ? 'bg-[#a5f0d3]/30 text-[#a5f0d3]' : 'bg-gray-800'
                        }`}
                    >
                      <RiCameraLine className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center text-sm text-white/70 bg-black/50 px-3 py-1 rounded-full">
                  Position QR code in the frame
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-900/30 border border-red-500 text-red-400 rounded-lg flex items-center">
              <RiCloseLine className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mt-6 p-4 bg-green-900/30 border border-green-500 text-green-400 rounded-lg flex items-center">
              <RiCheckLine className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {loading && (
            <div className="mt-6 flex justify-center items-center p-4 bg-gray-800/30 rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#a5f0d3]"></div>
              <span className="ml-3 text-gray-400">Processing...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPage;
