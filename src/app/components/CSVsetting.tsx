import React from 'react';
import axios from 'axios';

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

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Download CSV Files</h1>
            <div className="flex flex-col gap-4">
                <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={() => downloadCsv('http://127.0.0.1:3000/admin/csv/ps', 'ps_submissions.csv')}
                >
                    Download PS CSV
                </button>
                <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={() => downloadCsv('http://127.0.0.1:3000/admin/csv/project', 'project_submissions.csv')}
                >
                    Download Project CSV
                </button>
                <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={() => downloadCsv('http://127.0.0.1:3000/admin/csv/feedback', 'feedback_submissions.csv')}
                >
                    Download Feedback CSV
                </button>
            </div>
        </div>
    );
};

export default CSVSetting;