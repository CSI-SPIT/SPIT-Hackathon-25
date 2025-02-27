"use client";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { RiSearchLine, RiCloseLine, RiTeamLine, RiHistoryLine, RiEditLine } from 'react-icons/ri';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import PSsearch from '@/app/components/PSsearch';
import RoomSearch from '@/app/components/RoomSearch';
import MealStatus from '@/app/components/MealStatus';
import TeamMembers from '@/app/components/TeamMembers';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

interface MealDetails {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

interface TeamMember {
  _id?: string;
  name: string;
  linkedIn?: string;
  instagram?: string;
}

interface Team {
  _id?: string;
  teamId: string;
  teamName: string;
  allocatedRoom?: string;
  allocatedPS?: string;
  meals?: MealDetails;
  members?: TeamMember[];
  qrCode?: string;
}

const TeamsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<Team[]>([]);
  const [teamDetails, setTeamDetails] = useState<Team | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentTeamSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches).slice(0, 5));
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

        if (response.data.success && Array.isArray(response.data.teams)) {
          setSuggestions(response.data.teams);
        } else {
          setSuggestions([]);
          console.error('Invalid response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const fetchTeamDetails = async (teamId: string) => {
    setLoadingDetails(true);
    setError(null);
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${SERVER_URL}/admin/team/${teamId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setTeamDetails(response.data.team);

      setIsEditing(false);
    } catch (error) {
      setError('Failed to fetch team details');
      console.error('Error fetching team details:', error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleSelectTeam = (team: Team) => {
    setSelectedTeam(team);
    setSearchQuery(team.teamName);
    setSuggestions([]);
    fetchTeamDetails(team.teamId);

    const updatedRecentSearches = [
      team,
      ...recentSearches.filter(item => item.teamId !== team.teamId)
    ].slice(0, 5);

    setRecentSearches(updatedRecentSearches);
    localStorage.setItem('recentTeamSearches', JSON.stringify(updatedRecentSearches));
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedTeam(null);
    setTeamDetails(null);
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateComplete = () => {
    if (teamDetails) {
      fetchTeamDetails(teamDetails.teamId);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl text-[#a5f0d3] font-bold mb-2">Team Management</h1>
        <p className="text-gray-400">Search for teams participating in the hackathon</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Panel */}
        <div className="lg:col-span-1">
          <div className="bg-[#1d2029] rounded-lg border border-gray-800 overflow-hidden shadow-lg h-full">
            <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-[#1d2029] to-[#252a3a]">
              <div className="flex items-center">
                <RiTeamLine className="h-6 w-6 text-[#a5f0d3] mr-2" />
                <h2 className="text-xl font-bold text-[#a5f0d3]">Team Search</h2>
              </div>
            </div>

            <div className="p-6">
              <div className="relative w-full" ref={dropdownRef}>
                <div className="relative">
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter team name or ID..."
                    className="pl-10 bg-[#1d2029] border-gray-800 text-gray-200 focus:border-[#a5f0d3] focus:ring-1 focus:ring-[#a5f0d3]"
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
                  <div className="mt-4 p-4 text-center">
                    <div className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#a5f0d3] mr-2"></div>
                    <span className="text-gray-400">Searching teams...</span>
                  </div>
                )}

                {suggestions.length > 0 && (
                  <div className="absolute mt-1 w-full z-10 bg-[#1d2029] border border-gray-800 rounded-lg shadow-lg">
                    <ul className="max-h-60 overflow-y-auto rounded-lg">
                      {suggestions.map((team) => (
                        <li
                          key={team._id}
                          onClick={() => handleSelectTeam(team)}
                          className="p-3 cursor-pointer hover:bg-[#a5f0d3]/10 text-gray-200"
                        >
                          <div className="font-medium">{team.teamName}</div>
                          <div className="text-sm text-gray-400">ID: {team.teamId}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {recentSearches.length > 0 && !searchQuery && (
                <div className="mt-8">
                  <div className="flex items-center mb-4 text-gray-300">
                    <RiHistoryLine className="h-4 w-4 mr-2 text-gray-400" />
                    <h3 className="text-sm font-medium">Recent Searches</h3>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((team) => (
                      <div
                        key={team.teamId}
                        onClick={() => handleSelectTeam(team)}
                        className="block p-3 border border-gray-800 rounded-lg hover:bg-[#a5f0d3]/10 hover:border-[#a5f0d3]/50 transition-all duration-200 cursor-pointer"
                      >
                        <div className="font-medium text-gray-200">{team.teamName}</div>
                        <div className="text-sm text-gray-400 mt-1">ID: {team.teamId}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          <div className="bg-[#1d2029] rounded-lg border border-gray-800 overflow-hidden shadow-lg h-full">
            <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-[#1d2029] to-[#252a3a]">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#a5f0d3]">Team Information</h2>
                {teamDetails && (
                  <Button
                    onClick={handleToggleEdit}
                    className={`flex items-center gap-1 ${isEditing ? 'bg-gray-600 hover:bg-gray-700' : 'bg-[#a5f0d3]/20 hover:bg-[#a5f0d3]/30 text-[#a5f0d3]'}`}
                    variant="ghost"
                    size="sm"
                  >
                    {isEditing ? (
                      <>Cancel <RiCloseLine className="ml-1" /></>
                    ) : (
                      <>Edit Team <RiEditLine className="ml-1" /></>
                    )}
                  </Button>
                )}
              </div>
            </div>

            <div className="p-6">
              {loadingDetails && (
                <div className="flex justify-center items-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a5f0d3]"></div>
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-lg">
                  {error}
                </div>
              )}

              {selectedTeam && teamDetails && !loadingDetails && !error ? (
                <div>
                  <div className="bg-[#252a3a]/50 p-6 rounded-lg border border-gray-800 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                      {!isEditing && (
                        <>
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">{teamDetails.teamName}</h3>
                            <div className="text-sm text-gray-400 mb-4">Team ID: {teamDetails.teamId}</div>
                          </div>
                          {teamDetails.qrCode && (
                            <div className="mt-4 md:mt-0">
                              <img
                                src={teamDetails.qrCode}
                                alt="Team QR Code"
                                className="w-24 h-24 border-2 border-[#a5f0d3]/30 rounded"
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {!isEditing && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="bg-[#1d2029] p-4 rounded-lg border border-gray-800">
                          <div className="text-gray-400 text-xs uppercase mb-1">Problem Statement</div>
                          <div className="text-white font-medium">{teamDetails.allocatedPS || 'Not assigned'}</div>
                        </div>
                        <div className="bg-[#1d2029] p-4 rounded-lg border border-gray-800">
                          <div className="text-gray-400 text-xs uppercase mb-1">Room No.</div>
                          <div className="text-white font-medium">{teamDetails.allocatedRoom || 'Not assigned'}</div>
                        </div>
                      </div>
                    )}

                    {/* Meal Status Component */}
                    {teamDetails.meals && !isEditing && <MealStatus meals={teamDetails.meals} />}

                    {/* PS and Room Allocation */}
                    {!isEditing && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-[#252a3a]/50 p-4 rounded-lg border border-gray-800">
                          <PSsearch teamId={teamDetails.teamId} />
                        </div>
                        <div className="bg-[#252a3a]/50 p-4 rounded-lg border border-gray-800">
                          <RoomSearch teamId={teamDetails.teamId} />
                        </div>
                      </div>
                    )}

                    {/* Team Members Section */}
                    <div className="mt-8">
                      <div className="mb-3">
                        <h4 className="text-lg font-medium text-gray-300">Team Members</h4>
                      </div>

                      <TeamMembers
                        teamId={teamDetails.teamId}
                        teamName={teamDetails.teamName}
                        members={teamDetails.members || []}
                        isEditing={isEditing}
                        onUpdateComplete={handleUpdateComplete}
                      />
                    </div>
                  </div>
                </div>
              ) : !loadingDetails && !error ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <RiTeamLine className="h-16 w-16 text-gray-700 mb-4" />
                  <h3 className="text-xl font-medium text-gray-300 mb-2">No Team Selected</h3>
                  <p className="text-gray-500 max-w-md">
                    Search for a team using the panel on the left to view their complete information.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
