"use client";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { RiSearchLine, RiCloseLine } from 'react-icons/ri';
import { Input } from "@/components/ui/input";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

interface Team {
  teamId: string;
  teamName: string;
}

const TeamsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Team[]>([]);
  const [, setSelectedTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<Team[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentTeamSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches).slice(0, 3));
      } catch (e) {
        console.error('Failed to parse recent searches', e);
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleSelectTeam = (team: Team) => {
    setSelectedTeam(team);
    setSearchQuery(team.teamName);
    setSuggestions([]);

    const updatedRecentSearches = [
      team,
      ...recentSearches.filter(item => item.teamId !== team.teamId)
    ].slice(0, 3);

    setRecentSearches(updatedRecentSearches);
    localStorage.setItem('recentTeamSearches', JSON.stringify(updatedRecentSearches));
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedTeam(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#1d2029] rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold text-[#a5f0d3]">Team Search</h1>
        </div>
        <div className="p-6">
          <div className="relative w-full" ref={dropdownRef}>
            <div className="relative">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Teams"
                className="pl-10 bg-[#1d2029] border-gray-800"
              />
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              {searchQuery && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-800 rounded-md"
                  onClick={handleClearSearch}
                >
                  <RiCloseLine className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>

            {isLoading && (
              <div className="text-gray-400 mt-2">Loading...</div>
            )}

            {suggestions.length > 0 && (
              <div className="absolute mt-1 w-full z-10 bg-[#1d2029] border border-gray-800 rounded-lg shadow-lg">
                <ul className="max-h-60 overflow-y-auto rounded-lg">
                  {suggestions.map((team) => (
                    <li
                      key={team.teamId}
                      onClick={() => handleSelectTeam(team)}
                      className="p-3 cursor-pointer hover:bg-[#a5f0d3]/10 text-gray-200"
                    >
                      {team.teamName}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {recentSearches.length > 0 && !searchQuery && (
              <div className="mt-4 bg-[#1d2029] border border-gray-800 rounded-lg">
                <div className="p-4">
                  <h2 className="text-gray-400 mb-2 text-sm">Recent Searches</h2>
                  <ul className="space-y-1">
                    {recentSearches.map((team) => (
                      <li
                        key={team.teamId}
                        onClick={() => handleSelectTeam(team)}
                        className="p-2 cursor-pointer hover:bg-[#a5f0d3]/10 text-gray-200 rounded"
                      >
                        {team.teamName}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
