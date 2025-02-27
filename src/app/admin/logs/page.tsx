"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  RiRefreshLine,
  RiFilterLine,
  RiSearchLine,
  RiDeleteBin5Line,
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiInformationLine,
  RiCloseLine
} from 'react-icons/ri';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

interface LogEntry {
  level: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';
  message: string;
  timestamp: string;
  [key: string]: string | number | boolean | object | undefined;
}

const LogsPage: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalLogs, setTotalLogs] = useState(0);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [expandedLog, setExpandedLog] = useState<number | null>(null);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${SERVER_URL}/admin/logs`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const parsedLogs = response.data.logs.map((log: string) => JSON.parse(log));
        setLogs(parsedLogs);
        setTotalLogs(response.data.totalLines);
      } else {
        setError('Failed to fetch logs');
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
      setError('An error occurred while fetching logs');
    } finally {
      setLoading(false);
    }
  };

  const resetLogs = async () => {
    try {
      setIsDeleting(true);
      const token = localStorage.getItem('authToken');
      await axios.post(`${SERVER_URL}/admin/logs`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      await fetchLogs();
      setConfirmClear(false);
    } catch (error) {
      console.error('Error resetting logs:', error);
      setError('Failed to reset logs');
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoRefresh) {
      interval = setInterval(() => {
        fetchLogs();
      }, 10000);
    }

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getLogLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'error':
        return 'text-red-400 bg-red-900/20 border-red-500';
      case 'warn':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-500';
      case 'info':
        return 'text-blue-400 bg-blue-900/20 border-blue-500';
      case 'http':
        return 'text-purple-400 bg-purple-900/20 border-purple-500';
      case 'verbose':
        return 'text-indigo-400 bg-indigo-900/20 border-indigo-500';
      case 'debug':
        return 'text-green-400 bg-green-900/20 border-green-500';
      case 'silly':
        return 'text-pink-400 bg-pink-900/20 border-pink-500';
      default:
        return 'text-gray-400 bg-gray-900/20 border-gray-700';
    }
  };

  // Filter logs based on level and search query
  const filteredLogs = logs.filter(log => {
    const matchesLevel = filter === 'all' || log.level === filter;
    const matchesSearch = searchQuery === '' ||
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.timestamp && log.timestamp.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesLevel && matchesSearch;
  });

  const toggleLogExpansion = (index: number) => {
    setExpandedLog(expandedLog === index ? null : index);
  };

  const viewLogDetail = (log: LogEntry) => {
    setSelectedLog(log);
  };

  return (
    <div className="container mx-auto">
      <div className="bg-[#1d2029] border border-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 bg-gradient-to-r from-[#1d2029] to-[#252a3a]">
          <div>
            <h2 className="text-2xl font-bold text-[#a5f0d3] flex items-center">
              <RiInformationLine className="mr-2" /> System Logs
            </h2>
            <p className="text-gray-400 mt-1">Monitor and manage system activity logs</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 flex items-center gap-2 rounded-lg border transition-all duration-300 ${autoRefresh
                  ? 'bg-[#a5f0d3]/10 border-[#a5f0d3] text-[#a5f0d3]'
                  : 'bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800'
                }`}
            >
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={() => setAutoRefresh(!autoRefresh)}
                className="w-4 h-4 accent-[#a5f0d3] bg-gray-900 border-gray-700"
                onClick={e => e.stopPropagation()}
              />
              <span className="text-sm">Auto-refresh</span>
            </button>

            <button
              className="px-4 py-2 bg-[#1d2029] hover:bg-[#a5f0d3]/10 border border-[#a5f0d3] text-[#a5f0d3] rounded-lg transition-all duration-300 flex items-center shadow-md hover:shadow-[#a5f0d3]/20"
              onClick={fetchLogs}
              disabled={loading}
            >
              <RiRefreshLine className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              className={`px-4 py-2 ${confirmClear ? 'bg-red-900/40' : 'bg-red-950/30'} hover:bg-red-900/50 border border-red-500 text-red-400 rounded-lg transition-all duration-300 flex items-center shadow-md`}
              onClick={() => confirmClear ? resetLogs() : setConfirmClear(true)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-400 mr-2"></div>
                  Processing...
                </span>
              ) : confirmClear ? (
                <span className="flex items-center">
                  <RiDeleteBin5Line className="h-5 w-5 mr-2" />
                  Confirm Reset
                </span>
              ) : (
                <span className="flex items-center">
                  <RiDeleteBin5Line className="h-5 w-5 mr-2" />
                  Reset Logs
                </span>
              )}
            </button>

            {confirmClear && (
              <button
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-300 rounded-lg transition-all duration-300 flex items-center"
                onClick={() => setConfirmClear(false)}
              >
                <RiCloseLine className="h-5 w-5 mr-2" />
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6 flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <RiSearchLine className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-11 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-[#a5f0d3] focus:ring-1 focus:ring-[#a5f0d3] transition-all duration-300"
                placeholder="Search logs by message or timestamp..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2">
              <RiFilterLine className="h-5 w-5 text-gray-400" />
              <select
                className="bg-gray-900 text-white border-0 focus:ring-0 py-1"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="error">Error</option>
                <option value="warn">Warning</option>
                <option value="info">Info</option>
                <option value="http">HTTP</option>
                <option value="verbose">Verbose</option>
                <option value="debug">Debug</option>
                <option value="silly">Silly</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-900/30 border border-red-500 text-red-400 rounded-lg shadow-lg animate-pulse">
              <div className="flex items-center">
                <RiInformationLine className="h-5 w-5 mr-2" />
                {error}
              </div>
            </div>
          )}

          <div className="mb-4 p-3 bg-gray-800/30 border border-gray-700/50 rounded-lg flex justify-between items-center">
            <p className="text-sm text-gray-400">
              Showing <span className="font-medium text-white">{filteredLogs.length}</span> of <span className="font-medium text-white">{totalLogs}</span> logs
            </p>
            {autoRefresh && (
              <div className="flex items-center text-[#a5f0d3] text-sm">
                <div className="w-2 h-2 rounded-full bg-[#a5f0d3] mr-2 animate-pulse"></div>
                Auto-refreshing
              </div>
            )}
          </div>

          <div className="rounded-lg overflow-hidden border border-gray-700/50 shadow-lg">
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64 bg-gray-900/30">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#a5f0d3] mb-3"></div>
                <p className="text-gray-400">Loading logs...</p>
              </div>
            ) : filteredLogs.length === 0 ? (
              <div className="text-center p-12 bg-gray-900/30 text-gray-400">
                <RiInformationLine className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-lg">No logs found matching your criteria</p>
                <p className="text-sm mt-2 max-w-md mx-auto">Try changing your search query or filter settings to see more logs</p>
              </div>
            ) : (
              <div className="overflow-x-auto bg-gray-900/20">
                <table className="min-w-full divide-y divide-gray-800">
                  <thead className="bg-gray-900/50">
                    <tr>
                      <th className="px-2 py-3 text-center w-10"></th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="px-4 py-3 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filteredLogs.map((log, index) => (
                      <React.Fragment key={index}>
                        <tr
                          className={`hover:bg-gray-800/40 transition-colors duration-150 cursor-pointer ${expandedLog === index ? 'bg-gray-800/40' : ''}`}
                          onClick={() => toggleLogExpansion(index)}
                          style={{ cursor: `url('/cursor-click.png'), auto` }}
                        >
                          <td className="px-2 py-4 text-center">
                            {expandedLog === index ?
                              <RiArrowDownSLine className="h-5 w-5 text-gray-400 mx-auto" /> :
                              <RiArrowRightSLine className="h-5 w-5 text-gray-400 mx-auto" />
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getLogLevelColor(log.level)}`}>
                              {log.level.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            <div className="max-w-xl overflow-hidden text-ellipsis whitespace-nowrap">{log.message}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              className="text-[#a5f0d3] hover:text-[#7ae5bd] transition-colors duration-150"
                              onClick={(e) => {
                                e.stopPropagation();
                                viewLogDetail(log);
                              }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                        {expandedLog === index && (
                          <tr className="bg-gray-900/40">
                            <td colSpan={5} className="px-6 py-4">
                              <div className="border-l-2 border-gray-700 pl-4">
                                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono bg-black/20 p-4 rounded overflow-x-auto max-h-96">
                                  {JSON.stringify(log, null, 2)}
                                </pre>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Log Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1d2029] border border-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center border-b border-gray-800 p-4">
              <h3 className="text-xl font-bold text-[#a5f0d3]">Log Details</h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <RiCloseLine className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-900/40 p-3 rounded-lg">
                  <span className="text-gray-400 text-xs uppercase block mb-1">Timestamp</span>
                  <span className="text-white font-mono">
                    {new Date(selectedLog.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="bg-gray-900/40 p-3 rounded-lg">
                  <span className="text-gray-400 text-xs uppercase block mb-1">Log Level</span>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getLogLevelColor(selectedLog.level)}`}>
                    {selectedLog.level.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-gray-400 text-xs uppercase block mb-2">Message</span>
                <div className="bg-gray-900/40 p-4 rounded-lg">
                  <p className="text-white whitespace-pre-wrap break-words">{selectedLog.message}</p>
                </div>
              </div>
              <div>
                <span className="text-gray-400 text-xs uppercase block mb-2">Full Log Data</span>
                <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-sm text-gray-300 whitespace-pre-wrap font-mono max-h-96">
                  {JSON.stringify(selectedLog, null, 2)}
                </pre>
              </div>
            </div>
            <div className="border-t border-gray-800 p-4 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogsPage;
