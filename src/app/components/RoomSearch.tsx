"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

const RoomSearch: React.FC = () => {
  const { team_id } = useParams();
  const [allocatedRoom, setAllocatedRoom] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAllocateRoom = async () => {
    if (!team_id || !allocatedRoom) {
      alert('Please enter a team ID and a room number.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.patch(`${SERVER_URL}/admin/team/room`, {
        teamId: team_id,
        allocatedRoom,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setSuccess('Room allocated successfully');
      } else {
        setError('Failed to allocate room');
      }
    } catch (error) {
      console.error('Error allocating room:', error);
      setError('Failed to allocate room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Allocate Room</h1>
      <div className="mb-4">
        <input
          type="text"
          value={allocatedRoom}
          onChange={(e) => setAllocatedRoom(e.target.value)}
          placeholder="Enter Room Number"
          className="p-2 text-black border border-gray-300 rounded w-full"
        />
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleAllocateRoom}
        disabled={loading}
      >
        {loading ? 'Allocating...' : 'Allocate Room'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
};

export default RoomSearch;