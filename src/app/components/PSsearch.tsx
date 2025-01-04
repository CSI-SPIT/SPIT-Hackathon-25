"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL
interface ProblemStatement {
  psId: string;
  title: string;
  description: string;
}

const PSsearch: React.FC = () => {
  const { team_id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ProblemStatement[]>([]);
  const [selectedPS, setSelectedPS] = useState<ProblemStatement | null>(null);

  useEffect(() => {
    if (searchQuery) {
      const fetchSuggestions = async () => {
        try {
          const token = localStorage.getItem('authToken');
          const response = await axios.get(`${SERVER_URL}/admin/ps`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            params: {
              search: searchQuery,
            },
          });
          setSuggestions(response.data.problemStatements);
        } catch (error) {
          console.error('Error fetching problem statements:', error);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSelectPS = (ps: ProblemStatement) => {
    setSelectedPS(ps);
    setSearchQuery(ps.title);
    setSuggestions([]);
  };

  const handleAllocatePS = async () => {
    if (!team_id || !selectedPS) {
      alert('Please select a team and a problem statement.');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.patch(`${SERVER_URL}/admin/team/ps`, {
        teamId: team_id,
        psId: selectedPS.psId,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert('Problem statement allocated successfully');
      } else {
        alert('Failed to allocate problem statement');
      }
    } catch (error) {
      console.error('Error allocating problem statement:', error);
      alert('Failed to allocate problem statement');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Allocate Problem Statement</h1>
      <div className="mb-4 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Problem Statements"
          className="p-2 text-black border border-gray-300 rounded w-full"
        />
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded w-full mt-1 max-h-60 overflow-y-auto">
            {suggestions.map((ps) => (
              <li
                key={ps.psId}
                onClick={() => handleSelectPS(ps)}
                className="p-2 text-black cursor-pointer hover:bg-gray-200"
              >
                <strong>{ps.title}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleAllocatePS}
      >
        Allocate Problem Statement
      </button>
    </div>
  );
};

export default PSsearch;