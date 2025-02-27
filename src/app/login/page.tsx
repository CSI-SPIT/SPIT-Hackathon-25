"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { RiLockLine, RiTeamLine, RiLoginBoxLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

const Login: React.FC = () => {
  const router = useRouter();
  const [teamId, setTeamId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-20 justify-center items-center p-4 max-w-6xl mx-auto">
      <div className="w-full max-w-md">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#a5f0d3] to-[#4b9dff] rounded-lg blur opacity-25 animate-pulse"></div>
          <Image
            src="/secret.png"
            alt="Admin Portal"
            width={500}
            height={300}
            className="rounded-lg shadow-2xl relative"
            priority
          />
        </div>
      </div>

      <div className="w-full max-w-md">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#a5f0d3] to-[#4b9dff] rounded-lg blur opacity-25"></div>
          <div className="bg-[#1d2029] border border-gray-800 p-8 rounded-lg shadow-2xl relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-[#252a3a] rounded-full mb-4">
                <RiLockLine className="h-8 w-8 text-[#a5f0d3]" />
              </div>
              <h2 className="text-2xl font-bold text-white">Admin Access</h2>
              <p className="text-gray-400 mt-2">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="teamId" className="block text-gray-400 font-medium mb-2 text-sm">Team ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RiTeamLine className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="teamId"
                    value={teamId}
                    placeholder='T01'
                    onChange={(e) => setTeamId(e.target.value)}
                    className="w-full bg-[#252a3a] text-white pl-10 p-3 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#a5f0d3] focus:border-transparent"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="mb-8">
                <label htmlFor="password" className="block text-gray-400 font-medium mb-2 text-sm">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RiLockLine className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder='********'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#252a3a] text-white pl-10 pr-10 p-3 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#a5f0d3] focus:border-transparent"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <RiEyeOffLine className="h-5 w-5" /> : <RiEyeLine className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#a5f0d3] text-gray-900 font-medium p-3 rounded-md hover:shadow-lg hover:shadow-[#a5f0d3]/20 transition-all duration-300 flex items-center justify-center disabled:opacity-70"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900 mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <RiLoginBoxLine className="mr-2" /> Sign In
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-900/30 border border-red-500 text-red-400 rounded-md animate-pulse">
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;