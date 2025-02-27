"use client"
import { useState } from 'react';
import axios from 'axios';
import Image from "next/image";
import { useRouter } from 'next/navigation';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

const Login: React.FC = () => {
  const router = useRouter();
  const [teamId, setTeamId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${SERVER_URL}/login`, {
        teamId,
        password,
      });

      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
        router.push('/admin');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'An error occurred. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-20 justify-center items-center p-4">
      <Image src="/secret.png" alt="Secret" width={500} height={300} className="mb-4" priority />
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Team Login</h2>
          <div className="mb-4">
            <label htmlFor="teamId" className="block text-gray-700 font-medium mb-2">Team ID</label>
            <input
              type="text"
              id="teamId"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              className="w-full text-black p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-black p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md font-medium hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;