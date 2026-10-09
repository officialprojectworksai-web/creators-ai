'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { UserRole } from '@/types/marketplace';
import { createClient } from '@/lib/supabase/client';
import { Sparkles, ArrowRight, ShieldCheck, Mail, Lock, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('creator');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.warn('Supabase auth notice:', error.message);
        // Fallback gracefully to demo session
      }
    }

    await login(selectedRole, email);
    setIsLoading(false);
    router.push('/dashboard');
  };

  const handleQuickDemoLogin = async (role: UserRole) => {
    setIsLoading(true);
    await login(role);
    setIsLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#090a0f] p-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md rounded-3xl glass-dropdown border border-white/15 p-8 shadow-2xl space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400 p-[1px]">
              <div className="w-full h-full bg-[#0d101d] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-violet-400" />
              </div>
            </div>
            <span className="font-bold text-xl text-white">
              Creator<span className="text-violet-400">OS</span> AI
            </span>
          </Link>
          <h2 className="text-lg font-bold text-white pt-2">Sign in to your account</h2>
          <p className="text-xs text-zinc-400">Access your generative creator studio or campaign briefs</p>
        </div>

        {/* 1-Click Instant Persona Logins */}
        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
          <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider text-center">
            Instant Test Persona Login:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickDemoLogin('creator')}
              className="p-2 rounded-xl bg-white/5 hover:bg-violet-600 hover:text-white border border-white/10 text-zinc-300 text-xs font-semibold text-left transition-all"
            >
              🎨 AI Creator
            </button>
            <button
              onClick={() => handleQuickDemoLogin('brand')}
              className="p-2 rounded-xl bg-white/5 hover:bg-violet-600 hover:text-white border border-white/10 text-zinc-300 text-xs font-semibold text-left transition-all"
            >
              🏢 Brand Client
            </button>
            <button
              onClick={() => handleQuickDemoLogin('agency')}
              className="p-2 rounded-xl bg-white/5 hover:bg-violet-600 hover:text-white border border-white/10 text-zinc-300 text-xs font-semibold text-left transition-all"
            >
              ⚡ Agency Lead
            </button>
            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500 hover:text-black border border-amber-500/30 text-amber-300 text-xs font-semibold text-left transition-all"
            >
              🛡️ Auditor Desk
            </button>
          </div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-4 text-[10px] text-zinc-500 uppercase font-mono">Or with credentials</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* Traditional Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@creatoros.ai"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Account Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as any)}
              className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none"
            >
              <option value="creator">AI Creator / Director</option>
              <option value="brand">Brand Executive</option>
              <option value="agency">Agency Creative Director</option>
              <option value="admin">Trust & Verification Auditor</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2"
          >
            Sign In to Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-[11px] text-zinc-400">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-violet-400 hover:underline font-semibold">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
