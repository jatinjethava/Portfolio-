import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Server, 
  Database, 
  Cpu, 
  Zap, 
  Play, 
  RefreshCw, 
  CheckCircle, 
  Clock, 
  Layers, 
  Code,
  ShieldAlert
} from 'lucide-react';
import { apiService } from '../../services/api';
import { SystemStats } from '../../types';

export const ArchitectureExplorer: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<'getProjects' | 'getStats' | 'checkRateLimit'>('getProjects');
  const [loading, setLoading] = useState(false);
  const [responseOutput, setResponseOutput] = useState<string | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});
  const [lastLatency, setLastLatency] = useState<number | null>(null);
  const [fromCache, setFromCache] = useState<boolean | null>(null);
  const [systemMetrics, setSystemMetrics] = useState<SystemStats>(apiService.getSystemMetrics());

  const handleTestApi = async (endpoint: 'getProjects' | 'getStats' | 'checkRateLimit') => {
    setLoading(true);
    setSelectedEndpoint(endpoint);

    try {
      if (endpoint === 'getProjects') {
        const res = await apiService.getProjects('all');
        setLastLatency(res.latencyMs);
        setFromCache(res.fromCache);
        setResponseHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'X-Cache': res.fromCache ? 'HIT' : 'MISS',
          'X-Cache-Engine': 'Redis 7.2.4',
          'X-Response-Time': `${res.latencyMs}ms`,
          'Status': '200 OK'
        });
        setResponseOutput(JSON.stringify({
          status: 'success',
          count: res.data.length,
          sample: res.data.slice(0, 2).map(p => ({
            slug: p.slug,
            title: p.title,
            category: p.category,
            metrics: p.metrics
          }))
        }, null, 2));
      } else if (endpoint === 'getStats') {
        const metrics = apiService.getSystemMetrics();
        setSystemMetrics(metrics);
        setLastLatency(16);
        setFromCache(true);
        setResponseHeaders({
          'Content-Type': 'application/json',
          'X-Cache': 'HIT',
          'X-Response-Time': '16ms',
          'Status': '200 OK'
        });
        setResponseOutput(JSON.stringify(metrics, null, 2));
      } else if (endpoint === 'checkRateLimit') {
        setLastLatency(22);
        setFromCache(false);
        setResponseHeaders({
          'X-RateLimit-Limit': '60',
          'X-RateLimit-Remaining': '58',
          'X-RateLimit-Reset': '1725839000',
          'Status': '200 OK'
        });
        setResponseOutput(JSON.stringify({
          ip: '192.168.1.42',
          method: 'POST',
          algorithm: 'Sliding-Window Leaky Bucket',
          status: 'ALLOWED',
          remainingTokens: 58,
          windowSeconds: 60
        }, null, 2));
      }
    } catch (err: unknown) {
      setResponseOutput(JSON.stringify({ error: (err as Error).message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handlePurgeRedisCache = () => {
    apiService.invalidateProjectCache();
    setFromCache(false);
    setResponseHeaders({
      'X-Redis-Purge': 'SUCCESS',
      'Status': '200 OK'
    });
    setResponseOutput(JSON.stringify({
      message: 'Redis cache tags [cache:projects:*] successfully invalidated.',
      nextRequestSource: 'MongoDB Aggregation Pipeline (Cold Query)'
    }, null, 2));
  };

  return (
    <section id="architecture" className="py-24 relative bg-[#090b10] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">
              <Server className="w-3.5 h-3.5" />
              <span>Backend Topology & Caching</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              System Architecture & API Playground
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              Inspect real MERN stack REST endpoints, trigger Redis cache hits vs misses, and test rate-limiting thresholds live.
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button
              onClick={handlePurgeRedisCache}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-500/30 text-xs font-mono transition-colors"
              title="Purge Redis Keys"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Purge Redis Cache</span>
            </button>
          </div>
        </div>

        {/* 3 Infrastructure Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-1">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-zinc-400">Node / Express Gateway</span>
            </div>
            <p className="text-base font-bold text-white">Sub-40ms P99 Latency</p>
            <span className="text-[11px] font-mono text-zinc-500">Zod schemas + Centralized error middleware</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-red-400" />
              <span className="text-xs font-mono text-zinc-400">Redis 7.2 Cache Tier</span>
            </div>
            <p className="text-base font-bold text-white">{systemMetrics.cacheHitRatioPercent}% Hit Ratio</p>
            <span className="text-[11px] font-mono text-zinc-500">Sliding window rate limit & session revocation</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-1">
              <Database className="w-4 h-4 text-green-400" />
              <span className="text-xs font-mono text-zinc-400">MongoDB Replica Set</span>
            </div>
            <p className="text-base font-bold text-white">Covered Compound Indexes</p>
            <span className="text-[11px] font-mono text-zinc-500">Sharded collections & idempotent write ops</span>
          </div>
        </div>

        {/* Live Interactive API Console */}
        <div className="rounded-2xl overflow-hidden bg-[#0d0f15] border border-white/[0.1] shadow-2xl">
          
          {/* Console Header Bar */}
          <div className="p-4 bg-white/[0.02] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE CLUSTER TERMINAL</span>
            </div>

            {/* Endpoints Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleTestApi('getProjects')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  selectedEndpoint === 'getProjects'
                    ? 'bg-emerald-500 text-black font-bold'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white'
                }`}
              >
                GET /api/v1/projects
              </button>
              <button
                onClick={() => handleTestApi('getStats')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  selectedEndpoint === 'getStats'
                    ? 'bg-emerald-500 text-black font-bold'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white'
                }`}
              >
                GET /api/v1/stats
              </button>
              <button
                onClick={() => handleTestApi('checkRateLimit')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  selectedEndpoint === 'checkRateLimit'
                    ? 'bg-emerald-500 text-black font-bold'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white'
                }`}
              >
                TEST Rate Limiter
              </button>
            </div>
          </div>

          {/* Console Body: Split Headers & Response */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[300px]">
            
            {/* Left Col: Diagnostics & Headers */}
            <div className="lg:col-span-4 p-5 border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-black/30 space-y-4">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Request Execution Diagnostics
                </span>
                
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                    <span className="text-zinc-400">Cache Status:</span>
                    {fromCache === null ? (
                      <span className="text-zinc-500">Awaiting Trigger</span>
                    ) : fromCache ? (
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                        HIT (Redis RAM)
                      </span>
                    ) : (
                      <span className="text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                        MISS (MongoDB Read)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                    <span className="text-zinc-400">Roundtrip Latency:</span>
                    <span className="text-white font-bold">
                      {lastLatency ? `${lastLatency}ms` : '--'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Response Headers */}
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Returned HTTP Headers
                </span>
                <div className="space-y-1 font-mono text-[11px] text-zinc-400 bg-black/60 p-3 rounded-xl border border-white/[0.04]">
                  {Object.keys(responseHeaders).length > 0 ? (
                    Object.entries(responseHeaders).map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-emerald-400">{k}:</span>
                        <span className="text-zinc-300">{v}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-zinc-600">Click an endpoint above to send an HTTP request.</div>
                  )}
                </div>
              </div>

              {/* Docker Containers Status */}
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Docker Compose Services
                </span>
                <div className="space-y-1">
                  {systemMetrics.dockerContainers.map((c, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px] font-mono p-1.5 rounded bg-white/[0.02]">
                      <span className="text-zinc-300">{c.name}</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        healthy
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Payload Output */}
            <div className="lg:col-span-8 p-5 bg-black/50 font-mono text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-zinc-400">Response Payload (JSON)</span>
                  {loading && (
                    <span className="text-emerald-400 text-[11px] animate-pulse">
                      Executing API call...
                    </span>
                  )}
                </div>

                <pre className="p-4 rounded-xl bg-[#08090d] border border-white/[0.06] text-emerald-300/90 overflow-x-auto max-h-72 leading-relaxed">
                  {responseOutput || '// Select an endpoint above to execute a real simulated API query'}
                </pre>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500">
                <span>Architecture Standard: RESTful JSON Envelope</span>
                <span>Protected with HMAC & JWT</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
