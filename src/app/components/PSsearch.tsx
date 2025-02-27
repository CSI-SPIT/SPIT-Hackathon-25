"use client";
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { RiSearchLine, RiSendPlaneFill } from 'react-icons/ri';
import { Input } from "@/components/ui/input";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL
interface ProblemStatement {
  psId: string;
  title: string;
  description: string;
}

interface PSsearchProps {
  teamId?: string;
}

const PSsearch: React.FC<PSsearchProps> = ({ teamId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ProblemStatement[]>([]);
  const [selectedPS, setSelectedPS] = useState<ProblemStatement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        const response = await axios.get(`${SERVER_URL}/admin/ps`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          params: {
            search: searchQuery,
          },
        });

        if (response.data.problemStatements) {
          setSuggestions(response.data.problemStatements);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching problem statements:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleSelectPS = (ps: ProblemStatement) => {
    setSelectedPS(ps);
    setSearchQuery(ps.title);
    setSuggestions([]);
  };

  const handleAllocatePS = async () => {
    if (!teamId || !selectedPS) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.patch(`${SERVER_URL}/admin/team/ps`, {
        teamId: teamId,
        psId: selectedPS.psId,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setSuccess('Problem statement allocated successfully');
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError('Failed to allocate problem statement');
      }
    } catch (error) {
      console.error('Error allocating problem statement:', error);
      setError('Failed to allocate problem statement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-[#a5f0d3] mb-3">Allocate Problem Statement</h3>
      <div className="relative w-full mb-4" ref={dropdownRef}>
        <div className="relative">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problem statements..."
            className="pl-10 bg-[#1d2029] border-gray-800 focus:border-[#a5f0d3] focus:ring-1 focus:ring-[#a5f0d3] text-gray-200"
          />
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        {isLoading && (
          <div className="mt-2 p-2 text-center">
            <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#a5f0d3] mr-2"></div>
            <span className="text-gray-400 text-sm">Searching...</span>
          </div>
        )}

        {suggestions.length > 0 && (
          <div className="absolute mt-1 w-full z-10 bg-[#1d2029] border border-gray-800 rounded-lg shadow-lg">
            <ul className="max-h-48 overflow-y-auto rounded-lg">
              {suggestions.map((ps) => (
                <li
                  key={ps.psId}
                  onClick={() => handleSelectPS(ps)}
                  className="p-3 cursor-pointer hover:bg-[#a5f0d3]/10 text-gray-200 border-b border-gray-800 last:border-b-0"
                >
                  <div className="font-medium">{ps.title}</div>
                  <div className="text-xs text-gray-400 mt-1">ID: {ps.psId}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all ${!teamId || !selectedPS
          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
          : 'bg-[#a5f0d3]/20 hover:bg-[#a5f0d3]/30 text-[#a5f0d3] border border-[#a5f0d3]/30'
          }`}
        onClick={handleAllocatePS}
        disabled={loading || !teamId || !selectedPS}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#a5f0d3]"></div>
            <span>Allocating...</span>
          </>
        ) : (
          <span>Allocate Problem Statement</span>
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
          Select a team to allocate a problem statement
        </div>
      )}
    </div>
  );
};

export default PSsearch;