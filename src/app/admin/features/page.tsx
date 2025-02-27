"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

interface FeatureFlags {
  showPSForm: boolean;
  showProjectForm: boolean;
  showFeedbackForm: boolean;
  showAllocatedRoom: boolean;
  showAllocatedPS: boolean;
  countdownTime: {
    enabled: boolean;
    time: string;
  };
  qrBackground: string;
  psCount: number;
}

const FeaturesPage: React.FC = () => {
  const [features, setFeatures] = useState<FeatureFlags>({
    showPSForm: false,
    showProjectForm: false,
    showFeedbackForm: false,
    showAllocatedRoom: false,
    showAllocatedPS: false,
    countdownTime: {
      enabled: true,
      time: "2025-02-09T11:00:00"
    },
    qrBackground: "background.jpeg",
    psCount: 8
  });
  const [isLoading, setIsLoading] = useState(true);
  const [loadingFeatures, setLoadingFeatures] = useState<Record<string, boolean>>({});
  const [qrBackgroundInput, setQrBackgroundInput] = useState("");
  const [psCountInput, setPsCountInput] = useState("");
  const [countdownTimeInput, setCountdownTimeInput] = useState("");
  const [feedback, setFeedback] = useState<{
    qrBackground: string | null;
    psCount: string | null;
    countdownTime: string | null;
  }>({
    qrBackground: null,
    psCount: null,
    countdownTime: null
  });

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${SERVER_URL}/features`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setFeatures(response.data);
        setQrBackgroundInput(response.data.qrBackground);
        setPsCountInput(response.data.psCount.toString());
        setCountdownTimeInput(response.data.countdownTime.time || "");
      } catch (error) {
        console.error('Error fetching features:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  const toggleFeature = async (feature: keyof FeatureFlags) => {
    try {
      // Set loading state for this specific feature
      setLoadingFeatures(prev => ({ ...prev, [feature]: true }));
      const token = localStorage.getItem('authToken');

      const response = await axios.patch(`${SERVER_URL}/features/${feature}`, {
        value: !features[feature],
      }, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.status === 200) {
        setFeatures(prev => ({
          ...prev,
          [feature]: !prev[feature as keyof typeof prev],
        }));
      }
    } catch (error) {
      console.error(`Error updating feature ${feature}:`, error);
    } finally {
      setLoadingFeatures(prev => ({ ...prev, [feature]: false }));
    }
  };

  const updateCountdownTime = async () => {
    try {
      setLoadingFeatures(prev => ({ ...prev, countdownTime: true }));
      const token = localStorage.getItem('authToken');

      const response = await axios.patch(`${SERVER_URL}/features/countdownTime`, {
        value: countdownTimeInput,
      }, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.status === 200) {
        setFeatures(prev => ({
          ...prev,
          countdownTime: {
            ...prev.countdownTime,
            time: countdownTimeInput
          },
        }));
        setFeedback(prev => ({ ...prev, countdownTime: "Countdown time updated successfully!" }));
        setTimeout(() => setFeedback(prev => ({ ...prev, countdownTime: null })), 3000);
      }
    } catch (error) {
      console.error('Error updating countdown time:', error);
      setFeedback(prev => ({ ...prev, countdownTime: "Failed to update countdown time" }));
      setTimeout(() => setFeedback(prev => ({ ...prev, countdownTime: null })), 3000);
    } finally {
      setLoadingFeatures(prev => ({ ...prev, countdownTime: false }));
    }
  };

  const updateQrBackground = async () => {
    try {
      setLoadingFeatures(prev => ({ ...prev, qrBackground: true }));
      const token = localStorage.getItem('authToken');

      const response = await axios.patch(`${SERVER_URL}/features/qrBackground`, {
        value: qrBackgroundInput,
      }, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.status === 200) {
        setFeatures(prev => ({
          ...prev,
          qrBackground: qrBackgroundInput,
        }));
        setFeedback(prev => ({ ...prev, qrBackground: "QR Background updated successfully!" }));
        setTimeout(() => setFeedback(prev => ({ ...prev, qrBackground: null })), 3000);
      }
    } catch (error) {
      console.error('Error updating QR background:', error);
      setFeedback(prev => ({ ...prev, qrBackground: "Failed to update QR background" }));
      setTimeout(() => setFeedback(prev => ({ ...prev, qrBackground: null })), 3000);
    } finally {
      setLoadingFeatures(prev => ({ ...prev, qrBackground: false }));
    }
  };

  const updatePsCount = async () => {
    try {
      const count = parseInt(psCountInput);
      if (isNaN(count) || count < 0) {
        alert('Please enter a valid number for PS count');
        return;
      }

      setLoadingFeatures(prev => ({ ...prev, psCount: true }));
      const token = localStorage.getItem('authToken');

      const response = await axios.patch(`${SERVER_URL}/features/psCount`, {
        value: count,
      }, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.status === 200) {
        setFeatures(prev => ({
          ...prev,
          psCount: count,
        }));
        setFeedback(prev => ({ ...prev, psCount: "PS Count updated successfully!" }));
        setTimeout(() => setFeedback(prev => ({ ...prev, psCount: null })), 3000);
      }
    } catch (error) {
      console.error('Error updating PS count:', error);
      setFeedback(prev => ({ ...prev, psCount: "Failed to update PS count" }));
      setTimeout(() => setFeedback(prev => ({ ...prev, psCount: null })), 3000);
    } finally {
      setLoadingFeatures(prev => ({ ...prev, psCount: false }));
    }
  };

  const featureLabels: Record<string, string> = {
    showPSForm: 'Problem Statement Submission',
    showProjectForm: 'Project Submission',
    showFeedbackForm: 'Feedback Form',
    showAllocatedRoom: 'Room Allocation Display',
    showAllocatedPS: 'PS Allocation Display',
    'countdownTime.enabled': 'Countdown Timer',
  };

  return (
    <div className="container mx-auto">
      <div className="bg-[#1d2029] rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold text-[#a5f0d3]">Feature Controls</h1>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#a5f0d3]"></div>
            </div>
          ) : (
            <div className="space-y-8">
              <div>
                <h3 className="text-md font-medium text-[#a5f0d3] mb-4">Form Controls</h3>
                <div className="grid grid-cols-1 gap-4">
                  {/* Boolean Toggles - All buttons on the same row */}
                  <div className="flex flex-wrap gap-4 bg-gray-800/30 p-4 rounded-lg items-center">
                    {Object.entries(features)
                      .filter(([key]) => typeof features[key as keyof FeatureFlags] === 'boolean')
                      .map(([feature, isEnabled]) => (
                        <div key={feature} className="flex-1 min-w-[180px]">
                          <div className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-gray-300">{featureLabels[feature]}</span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                toggleFeature(feature as keyof FeatureFlags);
                              }}
                              disabled={loadingFeatures[feature]}
                              className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${isEnabled
                                  ? 'bg-[#a5f0d3]/20 hover:bg-[#a5f0d3]/30 text-[#a5f0d3] border border-[#a5f0d3]'
                                  : 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500'
                                }`}
                            >
                              {loadingFeatures[feature] ? (
                                <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                              ) : (
                                isEnabled ? 'Enabled' : 'Disabled'
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-700 pt-8">
                {/* Countdown Timer Settings */}
                <div className="bg-gray-800/30 p-6 rounded-lg">
                  <h3 className="text-md font-medium text-[#a5f0d3] mb-4">Timer Settings</h3>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-gray-300">Countdown Time</span>
                    <div className="p-3 bg-gray-800/50 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Current Time:</span>
                        <span className="text-[#a5f0d3]">{features.countdownTime.time}</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                          value={countdownTimeInput}
                          onChange={(e) => setCountdownTimeInput(e.target.value)}
                          placeholder="YYYY-MM-DDThh:mm:ss"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            updateCountdownTime();
                          }}
                          disabled={loadingFeatures['countdownTime']}
                          className="bg-[#a5f0d3]/20 hover:bg-[#a5f0d3]/30 text-[#a5f0d3] border border-[#a5f0d3] py-2 px-4 rounded"
                        >
                          {loadingFeatures['countdownTime'] ? (
                            <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                          ) : (
                            'Update'
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Format: YYYY-MM-DDThh:mm:ss</p>
                      {feedback.countdownTime && (
                        <div className={`mt-2 text-sm py-1 px-2 rounded ${feedback.countdownTime.includes('Failed') ? 'bg-red-900/50 text-red-300' : 'bg-green-900/50 text-green-300'}`}>
                          {feedback.countdownTime}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Other Settings */}
                <div className="bg-gray-800/30 p-6 rounded-lg">
                  <h3 className="text-md font-medium text-[#a5f0d3] mb-4">Additional Settings</h3>
                  <div className="space-y-4">
                    {/* QR Background */}
                    <div className="p-3 bg-gray-800/50 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">QR Background:</span>
                        <span className="text-[#a5f0d3] max-w-[200px] truncate">{features.qrBackground}</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                          value={qrBackgroundInput}
                          onChange={(e) => setQrBackgroundInput(e.target.value)}
                          placeholder="Background filename"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            updateQrBackground();
                          }}
                          disabled={loadingFeatures['qrBackground']}
                          className="bg-[#a5f0d3]/20 hover:bg-[#a5f0d3]/30 text-[#a5f0d3] border border-[#a5f0d3] py-2 px-4 rounded"
                        >
                          {loadingFeatures['qrBackground'] ? (
                            <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                          ) : (
                            'Update'
                          )}
                        </button>
                      </div>
                      {feedback.qrBackground && (
                        <div className={`mt-2 text-sm py-1 px-2 rounded ${feedback.qrBackground.includes('Failed') ? 'bg-red-900/50 text-red-300' : 'bg-green-900/50 text-green-300'}`}>
                          {feedback.qrBackground}
                        </div>
                      )}
                    </div>

                    {/* PS Count */}
                    <div className="p-3 bg-gray-800/50 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">PS Count:</span>
                        <span className="text-[#a5f0d3]">{features.psCount}</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                          value={psCountInput}
                          onChange={(e) => setPsCountInput(e.target.value)}
                          placeholder="Problem statement count"
                          min="1"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            updatePsCount();
                          }}
                          disabled={loadingFeatures['psCount']}
                          className="bg-[#a5f0d3]/20 hover:bg-[#a5f0d3]/30 text-[#a5f0d3] border border-[#a5f0d3] py-2 px-4 rounded"
                        >
                          {loadingFeatures['psCount'] ? (
                            <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                          ) : (
                            'Update'
                          )}
                        </button>
                      </div>
                      {feedback.psCount && (
                        <div className={`mt-2 text-sm py-1 px-2 rounded ${feedback.psCount.includes('Failed') ? 'bg-red-900/50 text-red-300' : 'bg-green-900/50 text-green-300'}`}>
                          {feedback.psCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
