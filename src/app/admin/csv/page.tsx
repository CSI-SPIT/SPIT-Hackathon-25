"use client";
import React, { useEffect } from 'react';
import axios from 'axios';
import { RiDownloadLine, RiRefreshLine } from 'react-icons/ri';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

const CSVSetting: React.FC = () => {
  const [token, setToken] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<{ message: string, type: 'success' | 'error' | null }>({
    message: '',
    type: null
  });

  useEffect(() => {
    setToken(localStorage.getItem('authToken'));
  }, []);

  const downloadCsv = async (url: string, filename: string) => {
    try {
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

  const resetCsv = async (url: string) => {
    try {
      const response = await axios.post(url, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setStatus({ message: 'CSV reset successfully', type: 'success' });
      } else {
        setStatus({ message: 'Failed to reset CSV', type: 'error' });
      }
    } catch (error) {
      console.error(`Error resetting CSV at ${url}:`, error);
      setStatus({ message: 'Failed to reset CSV. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="bg-[#1d2029] border border-gray-800 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-[#a5f0d3]">CSV Management</h2>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
          {status.message && (
            <div className={`mb-6 p-4 rounded-lg ${status.type === 'success'
              ? 'bg-green-900/30 border border-green-500 text-green-400'
              : 'bg-red-900/30 border border-red-500 text-red-400'
              }`}>
              {status.message}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/30 p-6 rounded-lg">
              <h3 className="text-md font-medium text-[#a5f0d3] mb-4">Download CSV Files</h3>
              <div className="grid gap-3">
                <button
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1d2029] hover:bg-[#a5f0d3]/10 border border-[#a5f0d3] text-[#a5f0d3] rounded-lg transition-colors duration-200"
                  onClick={() => downloadCsv(`${SERVER_URL}/admin/csv/ps`, 'ps_submissions.csv')}
                >
                  <RiDownloadLine className="h-5 w-5" /> Download PS CSV
                </button>
                <button
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1d2029] hover:bg-[#a5f0d3]/10 border border-[#a5f0d3] text-[#a5f0d3] rounded-lg transition-colors duration-200"
                  onClick={() => downloadCsv(`${SERVER_URL}/admin/csv/project`, 'project_submissions.csv')}
                >
                  <RiDownloadLine className="h-5 w-5" /> Download Project CSV
                </button>
                <button
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1d2029] hover:bg-[#a5f0d3]/10 border border-[#a5f0d3] text-[#a5f0d3] rounded-lg transition-colors duration-200"
                  onClick={() => downloadCsv(`${SERVER_URL}/admin/csv/feedback`, 'feedback_submissions.csv')}
                >
                  <RiDownloadLine className="h-5 w-5" /> Download Feedback CSV
                </button>
              </div>
            </div>

            <div className="bg-gray-800/30 p-6 rounded-lg">
              <h3 className="text-md font-medium text-red-400 mb-4">Reset CSV Data</h3>
              <div className="grid gap-3">
                <button
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-red-950/30 hover:bg-red-900/50 border border-red-500 text-red-400 rounded-lg transition-colors duration-200"
                  onClick={() => resetCsv(`${SERVER_URL}/admin/csv/ps/reset`)}
                >
                  <RiRefreshLine className="h-5 w-5" /> Reset PS CSV
                </button>
                <button
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-red-950/30 hover:bg-red-900/50 border border-red-500 text-red-400 rounded-lg transition-colors duration-200"
                  onClick={() => resetCsv(`${SERVER_URL}/admin/csv/project/reset`)}
                >
                  <RiRefreshLine className="h-5 w-5" /> Reset Project CSV
                </button>
                <button
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-red-950/30 hover:bg-red-900/50 border border-red-500 text-red-400 rounded-lg transition-colors duration-200"
                  onClick={() => resetCsv(`${SERVER_URL}/admin/csv/feedback/reset`)}
                >
                  <RiRefreshLine className="h-5 w-5" /> Reset Feedback CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSVSetting;