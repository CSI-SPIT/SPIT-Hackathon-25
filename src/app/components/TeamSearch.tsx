"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

interface Team {
  teamId: string;
  teamName: string;
}

const TeamSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  useEffect(() => {
    if (searchQuery) {
      const fetchSuggestions = async () => {
        try {
          const token = localStorage.getItem('authToken');
          const response = await axios.get(`${SERVER_URL}/admin/teams`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            params: {
              search: searchQuery,
            },
          });
          setSuggestions(response.data.teams);
        } catch (error) {
          console.error('Error fetching teams:', error);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSelectTeam = (team: Team) => {
    setSelectedTeam(team);
    setSearchQuery(team.teamName);
    setSuggestions([]);
  };

  return (
    <div className="container relative mx-auto p-4">
      <h1 className="text-2xl mb-4">Search Teams</h1>
      <div className="mb-4 relative flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Teams"
          className="p-2 text-black border border-gray-300 rounded w-full"
        />
        {selectedTeam && (
          <Button href={`/admin/${selectedTeam.teamId}`} text="Go to Team Page" />
        )}
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 w-[97%] rounded mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((team) => (
            <li
              key={team.teamId}
              onClick={() => handleSelectTeam(team)}
              className="p-2 text-black cursor-pointer hover:bg-gray-200"
            >
              <strong>{team.teamName}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


interface ButtonProps {
  href: string;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ href, text }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <button onClick={handleClick} className="bg-green-500 text-white p-2 rounded ml-2">
      {text}
    </button>
  );
};

export default TeamSearch;