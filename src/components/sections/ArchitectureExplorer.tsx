import React, { useState } from 'react';
import {
  Server,
  Database,
  Cpu,
  Zap,
  Code
} from 'lucide-react';
import { apiService } from '../../services/api';

export const ArchitectureExplorer: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<'getProjects' | 'getSkills' | 'contact'>('getProjects');
  const [loading, setLoading] = useState(false);
  const [responseOutput, setResponseOutput] = useState<string | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});
  const [lastLatency, setLastLatency] = useState<number | null>(null);

  const handleTestApi = async (endpoint: 'getProjects' | 'getSkills' | 'contact') => {
    setLoading(true);
    setSelectedEndpoint(endpoint);

    try {
      if (endpoint === 'getProjects') {
        const res = await apiService.getProjects('all');
        setLastLatency(res.latencyMs);
        setResponseHeaders({
          'Content-Type': 'application/json',
          'Status': '200 OK',
          'Data-Source': 'MongoDB Database'
        });
        setResponseOutput(JSON.stringify({
          status: 'success',
          message: 'Projects retrieved successfully',
          data: res.data.slice(0, 2).map(p => ({
            title: p.title,
            techStack: p.techStack
          }))
        }, null, 2));
      } else if (endpoint === 'getSkills') {
        setLastLatency(12);
        setResponseHeaders({
          'Content-Type': 'application/json',
          'Status': '200 OK',
          'Data-Source': 'Server Cache'
        });
        setResponseOutput(JSON.stringify({
          status: 'success',
          message: 'Skills loaded quickly',
          data: ['Java Script', 'HTML', 'CSS', 'React', 'Node.js', 'Express.js', 'Tailwind Css', 'Redux', 'MongoDB', 'TypeScript']
        }, null, 2));
      } else if (endpoint === 'contact') {
        setLastLatency(45);
        setResponseHeaders({
          'Content-Type': 'application/json',
          'Status': '201 Created',
          'Security': 'Data Validated'
        });
        setResponseOutput(JSON.stringify({
          status: 'success',
          message: 'Message sent successfully!',
          data: {
            name: 'Jatin Jethava',
            email: 'jatinjethava3125@gmail.com'
          }
        }, null, 2));
      }
    } catch (err: unknown) {
      setResponseOutput(JSON.stringify({ error: (err as Error).message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="architecture" className="py-24 relative bg-[#090b10] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
              <Code className="w-3.5 h-3.5" />
              <span>Full Stack Development</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Interactive API Playground
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              Experience how my frontend communicates with the backend. Click the endpoints below to simulate real API requests and see the JSON responses.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-zinc-400">
                Frontend (React)
              </span>
            </div>
            <p className="text-base font-bold text-white">
              User Interface
            </p>
            <span className="text-[11px] font-mono text-zinc-500">
              Sends requests and displays data dynamically
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-1">
              <Server className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-mono text-zinc-400">
                Backend (Node.js / Express)
              </span>
            </div>
            <p className="text-base font-bold text-white">
              REST API Server
            </p>
            <span className="text-[11px] font-mono text-zinc-500">
              Processes requests and handles business logic
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-1">
              <Database className="w-4 h-4 text-green-400" />
              <span className="text-xs font-mono text-zinc-400">
                Database (MongoDB)
              </span>
            </div>
            <p className="text-base font-bold text-white">
              Data Storage
            </p>
            <span className="text-[11px] font-mono text-zinc-500">
              Stores and retrieves application data securely
            </span>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden bg-[#0d0f15] border border-white/[0.1] shadow-2xl">

          <div className="p-4 bg-white/[0.02] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>API EXPLORER</span>
            </div>

            <div className="mobile-scroll-row flex w-full sm:w-auto flex-nowrap overflow-x-auto items-center gap-2 pb-1">
              <button
                onClick={() => handleTestApi('getProjects')}
                className={`shrink-0 px-3 py-2 sm:py-1 rounded-lg text-xs font-mono transition-all ${selectedEndpoint === 'getProjects'
                  ? 'bg-emerald-500 text-black font-bold'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white'
                  }`}
              >
                GET /api/projects
              </button>
              <button
                onClick={() => handleTestApi('getSkills')}
                className={`shrink-0 px-3 py-2 sm:py-1 rounded-lg text-xs font-mono transition-all ${selectedEndpoint === 'getSkills'
                  ? 'bg-emerald-500 text-black font-bold'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white'
                  }`}
              >
                GET /api/skills
              </button>
              <button
                onClick={() => handleTestApi('contact')}
                className={`shrink-0 px-3 py-2 sm:py-1 rounded-lg text-xs font-mono transition-all ${selectedEndpoint === 'contact'
                  ? 'bg-emerald-500 text-black font-bold'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white'
                  }`}
              >
                POST /api/contact
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[300px]">

            <div className="lg:col-span-4 p-5 border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-black/30 space-y-4">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Request Details
                </span>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                    <span className="text-zinc-400">Response Status:</span>
                    {responseHeaders['Status'] ? (
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                        {responseHeaders['Status']}
                      </span>
                    ) : (
                      <span className="text-zinc-500">Waiting...</span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                    <span className="text-zinc-400">Response Time:</span>
                    <span className="text-white font-bold">
                      {lastLatency ? `${lastLatency}ms` : '--'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Server Information
                </span>
                <div className="space-y-1 font-mono text-[11px] text-zinc-400 bg-black/60 p-3 rounded-xl border border-white/[0.04]">
                  {Object.keys(responseHeaders).length > 0 ? (
                    Object.entries(responseHeaders).map(([k, v]) => (
                      <div key={k} className="flex flex-wrap justify-between gap-x-2">
                        <span className="text-emerald-400">{k}:</span>
                        <span className="text-zinc-300">{v}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-zinc-600">Click an endpoint above to simulate a request.</div>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Tech Stack Used
                </span>
                <div className="space-y-1">
                  {['React.js (Frontend)', 'Node.js (Backend)', 'MongoDB (Database)'].map((tech, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px] font-mono p-1.5 rounded bg-white/[0.02]">
                      <span className="text-zinc-300">{tech}</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 p-5 bg-black/50 font-mono text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-zinc-400">JSON Response Data</span>
                  {loading && (
                    <span className="text-emerald-400 text-[11px] animate-pulse">
                      Fetching data...
                    </span>
                  )}
                </div>

                <pre className="p-4 rounded-xl bg-[#08090d] border border-white/[0.06] text-emerald-300/90 overflow-x-auto max-h-72 leading-relaxed">
                  {responseOutput || '// Select an endpoint above to see the JSON response'}
                </pre>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-500">
                <span>Format: REST API JSON</span>
                <span>Role: Full Stack Developer</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
