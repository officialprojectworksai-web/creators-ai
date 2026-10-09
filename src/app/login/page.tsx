'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { UserRole } from '@/types/marketplace';
import { createClient } from '@/lib/supabase/client';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Mail, 
  Lock, 
  Palette, 
  Building2, 
  CheckCircle2, 
  Zap,
  Users
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  // Separate portal mode: 'creator' | 'brand' | 'admin'
  const [activePortal, setActivePortal] = useState<'creator' | 'brand' | 'admin'>('creator');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const targetRole: UserRole = activePortal === 'brand' ? 'brand' : activePortal === 'admin' ? 'admin' : 'creator';

    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.warn('Supabase auth notice:', error.message);
      }
    }

    await login(targetRole, email);
    setIsLoading(false);
    
    if (activePortal === 'brand') {
      router.push('/dashboard/brand-profile');
    } else if (activePortal === 'admin') {
      router.push('/admin/verification');
    } else {
      router.push('/dashboard/profile');
    }
  };

  const handleQuickPersonaLogin = async (role: UserRole) => {
    setIsLoading(true);
    await login(role);
    setIsLoading(false);

    if (role === 'brand' || role === 'agency') {
      router.push('/dashboard/brand-profile');
    } else if (role === 'admin') {
      router.push('/admin/verification');
    } else {
      router.push('/dashboard/profile');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#090a0f] p-4 relative overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] blur-[140px] pointer-events-none rounded-full transition-colors duration-500 ${
        activePortal === 'creator'
          ? 'bg-violet-600/15'
          : activePortal === 'brand'
          ? 'bg-cyan-600/15'
          : 'bg-amber-600/15'
      }`} />

      <div className="w-full max-w-lg rounded-3xl glass-dropdown border border-white/15 p-8 shadow-2xl space-y-6 relative z-10 animate-fade-in">
        {/* Brand Header */}
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
          <h2 className="text-lg font-bold text-white pt-2">
            {activePortal === 'creator'
              ? 'AI Creator Studio Login'
              : activePortal === 'brand'
              ? 'Brand & Agency Portal Login'
              : 'Auditor & Verification Desk Login'}
          </h2>
          <p className="text-xs text-zinc-400">
            {activePortal === 'creator'
              ? 'Access your generative portfolio, ComfyUI workflows, and brand offers'
              : activePortal === 'brand'
              ? 'Manage campaign briefs, AI creator match scores, and licensing terms'
              : 'Inspect submitted evidence links and approve verification claims'}
          </p>
        </div>

        {/* SEPARATE PORTAL SWITCHER TABS */}
        <div className="grid grid-cols-3 p-1.5 rounded-2xl bg-black/60 border border-white/10 gap-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActivePortal('creator')}
            className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activePortal === 'creator'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>AI Creator</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePortal('brand')}
            className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activePortal === 'brand'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Brand / Agency</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePortal('admin')}
            className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activePortal === 'admin'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/30 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Review Desk</span>
          </button>
        </div>

        {/* 1-CLICK QUICK PERSONA TEST SIGN-IN */}
        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider text-center">
            Instant Test Persona Sign-In ({activePortal.toUpperCase()} Portal):
          </div>

          {activePortal === 'creator' && (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickPersonaLogin('creator')}
                className="p-2.5 rounded-xl bg-violet-950/40 hover:bg-violet-600 border border-violet-700/40 text-left transition-all text-xs group"
              >
                <div className="font-bold text-violet-200 group-hover:text-white">Aria Vance</div>
                <div className="text-[10px] text-zinc-400 group-hover:text-violet-100">Cinematic AI Director (4.98★)</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickPersonaLogin('creator')}
                className="p-2.5 rounded-xl bg-violet-950/40 hover:bg-violet-600 border border-violet-700/40 text-left transition-all text-xs group"
              >
                <div className="font-bold text-violet-200 group-hover:text-white">Kenji Sato</div>
                <div className="text-[10px] text-zinc-400 group-hover:text-violet-100">Fashion AI Specialist (4.95★)</div>
              </button>
            </div>
          )}

          {activePortal === 'brand' && (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickPersonaLogin('brand')}
                className="p-2.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-600 border border-cyan-700/40 text-left transition-all text-xs group"
              >
                <div className="font-bold text-cyan-200 group-hover:text-white">Lumina Haute Wear</div>
                <div className="text-[10px] text-zinc-400 group-hover:text-cyan-100">Luxury Streetwear Brand</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickPersonaLogin('agency')}
                className="p-2.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-600 border border-cyan-700/40 text-left transition-all text-xs group"
              >
                <div className="font-bold text-cyan-200 group-hover:text-white">Aetherium Agency</div>
                <div className="text-[10px] text-zinc-400 group-hover:text-cyan-100">Creative Agency Lead</div>
              </button>
            </div>
          )}

          {activePortal === 'admin' && (
            <button
              type="button"
              onClick={() => handleQuickPersonaLogin('admin')}
              className="w-full p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500 hover:text-black border border-amber-500/30 text-left transition-all text-xs group"
            >
              <div className="font-bold text-amber-300 group-hover:text-black">CreatorOS Trust Auditor</div>
              <div className="text-[10px] text-zinc-400 group-hover:text-black/80">Full Verification & Evidence Audit Access</div>
            </button>
          )}
        </div>

        <div className="relative flex py-0.5 items-center">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-4 text-[10px] text-zinc-500 uppercase font-mono">Or with email credentials</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-zinc-300 font-semibold mb-1">
              {activePortal === 'creator' ? 'Creator Email' : activePortal === 'brand' ? 'Company / Brand Email' : 'Auditor Email'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={activePortal === 'creator' ? 'creator@diffusion.studio' : 'marketing@brand.com'}
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

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl text-xs font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all ${
              activePortal === 'creator'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-95 shadow-violet-500/25'
                : activePortal === 'brand'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:opacity-95 shadow-cyan-500/25'
                : 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/25'
            }`}
          >
            <span>Sign In to {activePortal === 'creator' ? 'Creator Studio' : activePortal === 'brand' ? 'Brand Workspace' : 'Auditor Desk'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-[11px] text-zinc-400 pt-1">
          Don&apos;t have an account?{' '}
          <Link href={`/signup?role=${activePortal}`} className="text-violet-400 hover:underline font-semibold">
            Create {activePortal === 'creator' ? 'Creator' : 'Brand'} Account
          </Link>
        </div>
      </div>
    </div>
  );
}
