"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import PSsearch from '@/app/components/PSsearch';
import RoomSearch from '@/app/components/RoomSearch';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

interface MealDetails {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

interface TeamDetails {
  teamId: string;
  teamName: string;
  allocatedRoom: string;
  allocatedPS: string;
  meals: MealDetails;
  // Add other team details as needed
}

const TeamPage: React.FC = () => {
  const searchParams = useParams();
  const { team_id } = searchParams;
  const [teamDetails, setTeamDetails] = useState<TeamDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (team_id) {
      const fetchTeamDetails = async () => {
        try {
          const token = localStorage.getItem('authToken');
          const response = await axios.get(`${SERVER_URL}/admin/team/${team_id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setTeamDetails(response.data.team);
        } catch (error) {
          setError('Failed to fetch team details');
          console.error('Error fetching team details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchTeamDetails();
    }
  }, [team_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!teamDetails) {
    return <div>No team details found</div>;
  }

  return (
    <div className="container flex gap-10 mx-auto p-4">
      <div>
        <h1 className="text-2xl mb-4">Team Details</h1>
        <p><strong>Team ID:</strong> {teamDetails.teamId}</p>
        <p><strong>Team Name:</strong> {teamDetails.teamName}</p>
        <p><strong>Room:</strong> {teamDetails.allocatedRoom}</p>
        <p><strong>PS:</strong> {teamDetails.allocatedPS}</p>
        <h2 className="text-xl mt-4">Meals</h2>
        <p><strong>Breakfast:</strong> {teamDetails.meals.breakfast ? 'Yes' : 'No'}</p>
        <p><strong>Lunch:</strong> {teamDetails.meals.lunch ? 'Yes' : 'No'}</p>
        <p><strong>Dinner:</strong> {teamDetails.meals.dinner ? 'Yes' : 'No'}</p>
        {/* Add other team details as needed */}
      </div>
      <div>
        <PSsearch />
      </div>
      <div>
        <RoomSearch />
      </div>
    </div>
  );
};

export default TeamPage;