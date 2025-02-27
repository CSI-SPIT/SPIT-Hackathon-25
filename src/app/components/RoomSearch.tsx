"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { RiHotelLine } from 'react-icons/ri';
import { Input } from "@/components/ui/input";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

interface RoomSearchProps {
  teamId?: string;
}

const RoomSearch: React.FC<RoomSearchProps> = ({ teamId }) => {
  const [allocatedRoom, setAllocatedRoom] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAllocateRoom = async () => {
    if (!teamId || !allocatedRoom) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.patch(`${SERVER_URL}/admin/team/room`, {
        teamId: teamId,
        allocatedRoom,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setSuccess('Room allocated successfully');
        setTimeout(() => setSuccess(null), 3000);
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
    <div>
      <h3 className="text-lg font-medium text-[#a5f0d3] mb-3">Allocate Room</h3>
      <div className="relative mb-4">
        <Input
          type="text"
          value={allocatedRoom}
          onChange={(e) => setAllocatedRoom(e.target.value)}
          placeholder="Enter Room Number (e.g., 406A)"
          className="pl-10 bg-[#1d2029] border-gray-800 focus:border-[#a5f0d3] focus:ring-1 focus:ring-[#a5f0d3] text-gray-200"
        />
        <RiHotelLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      <button
        className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all ${!teamId || !allocatedRoom
          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
          : 'bg-[#a5f0d3]/20 hover:bg-[#a5f0d3]/30 text-[#a5f0d3] border border-[#a5f0d3]/30'
          }`}
        onClick={handleAllocateRoom}
        disabled={loading || !teamId || !allocatedRoom}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#a5f0d3]"></div>
            <span>Allocating...</span>
          </>
        ) : (
          <span>Allocate Room</span>
        )}
      </button>

      {error && (
        <div className="mt-3 p-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-3 p-2 bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-md">
          {success}
        </div>
      )}

      {!teamId && (
        <div className="mt-3 p-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm rounded-md">
          Select a team to allocate a room
        </div>
      )}
    </div>
  );
};

export default RoomSearch;