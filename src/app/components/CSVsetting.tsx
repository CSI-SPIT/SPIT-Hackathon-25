"use client";
import React from 'react';
import axios from 'axios';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

const CSVSetting: React.FC = () => {
  const downloadCsv = async (url: string, filename: string) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        responseType: 'blob', // Important for downloading files
      });

      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = urlBlob;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(`Error downloading CSV from ${url}:`, error);
    }
  };

  const resetCsv = async (url: string, password: string) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(url, { password }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert('CSV reset successfully');
      } else {
        alert('Failed to reset CSV');
      }
    } catch (error) {
      console.error(`Error resetting CSV at ${url}:`, error);
      alert('Failed to reset CSV');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Download and Reset CSV Files</h1>
      <div className="flex flex-col gap-4">
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => downloadCsv(`${SERVER_URL}/admin/csv/ps`, 'ps_submissions.csv')}
        >
          Download PS CSV
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => downloadCsv(`${SERVER_URL}/admin/csv/project`, 'project_submissions.csv')}
        >
          Download Project CSV
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => downloadCsv(`${SERVER_URL}/admin/csv/feedback`, 'feedback_submissions.csv')}
        >
          Download Feedback CSV
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={() => resetCsv(`${SERVER_URL}/admin/csv/ps/reset`, 'YOUR_PASSWORD')}
        >
          Reset PS CSV
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={() => resetCsv(`${SERVER_URL}/admin/csv/project/reset`, 'YOUR_PASSWORD')}
        >
          Reset Project CSV
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={() => resetCsv(`${SERVER_URL}/admin/csv/feedback/reset`, 'YOUR_PASSWORD')}
        >
          Reset Feedback CSV
        </button>
      </div>
    </div>
  );
};

export default CSVSetting;