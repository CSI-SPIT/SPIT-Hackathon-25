"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { isAuthenticated } from '@/Utils/Auth';
import { redirect } from 'next/navigation';
import CSVSetting from '../components/CSVsetting';

const Admin: React.FC = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      if (!authStatus) {
        redirect('/');
      } else {
        setAuth(true);
      }
    };

    checkAuth();
  }, []);

  if (!auth) {
    return <div>Loading...</div>;
  }

  return (
    <main className="text-center h-screen flex justify-center items-center">
        <div>
          <Dashboard />
        </div>
        <div>
          <CSVSetting />
        </div>
    </main>
  );
};

const Dashboard: React.FC = () => {
  const [features, setFeatures] = useState({
    showPSForm: false,
    showProjectForm: false,
    showFeedbackForm: false,
    showAllocatedRoom: false,
    showAllocatedPS: false,
  });

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://127.0.0.1:3000/features', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setFeatures(response.data);
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    fetchFeatures();
  }, []);

  const toggleFeature = async (feature: keyof typeof features) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.patch(`http://127.0.0.1:3000/features/${feature}`, {
        value: !features[feature],
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setFeatures((prevFeatures) => ({
          ...prevFeatures,
          [feature]: !prevFeatures[feature],
        }));
      }
    } catch (error) {
      console.error(`Error updating feature ${feature}:`, error);
    }
  };

  const featureButtons = [
    { label: 'Toggle PS Form', feature: 'showPSForm' },
    { label: 'Toggle Project Form', feature: 'showProjectForm' },
    { label: 'Toggle Feedback Form', feature: 'showFeedbackForm' },
    { label: 'Toggle Allocated Room', feature: 'showAllocatedRoom' },
    { label: 'Toggle Allocated PS', feature: 'showAllocatedPS' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Admin Dashboard</h1>
      <div className="flex flex-col gap-4">
        {featureButtons.map(({ label, feature }) => (
          <Button
            key={feature}
            label={label}
            isActive={features[feature as keyof typeof features]}
            onClick={() => toggleFeature(feature as keyof typeof features)}
          />
        ))}
      </div>
    </div>
  );
};

interface ButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`p-2 rounded ${isActive ? 'bg-green-500' : 'bg-red-500'} text-white`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Admin;