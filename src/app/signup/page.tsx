'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { UserRole } from '@/types/marketplace';
import { createClient } from '@/lib/supabase/client';
import { 
  Sparkles, 
  ArrowRight, 
  Mail, 
  Lock, 
  User, 
  Palette, 
  Building2, 
  CheckCircle2, 
  DollarSign, 
  Cpu 
} from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [selectedRole, setSelectedRole] = useState<'creator' | 'brand'>('creator');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [budget, setBudget] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
            role: selectedRole,
          },
        },
      });
      if (error) console.warn('Supabase sign up notice:', error.message);
    }

    await login(selectedRole, email);
    setIsLoading(false);

    if (selectedRole === 'brand') {
      router.push('/dashboard/brand-profile');
    } else {
      router.push('/dashboard/profile');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#090a0f] p-4 relative overflow-hidden">
      <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] blur-[140px] pointer-events-none rounded-full transition-colors duration-500 ${
        selectedRole === 'creator' ? 'bg-violet-600/15' : 'bg-cyan-600/15'
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
            Create Your {selectedRole === 'creator' ? 'AI Creator' : 'Brand & Agency'} Account
          </h2>
          <p className="text-xs text-zinc-400">
            {selectedRole === 'creator'
              ? 'Showcase ComfyUI pipelines, get verified, and receive brand offers'
              : 'Generate AI briefs, discover verified creators, and hire multimodal talent'}
          </p>
        </div>

        {/* ROLE SELECTION TABS */}
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-black/60 border border-white/10 gap-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setSelectedRole('creator')}
            className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              selectedRole === 'creator'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Join as AI Creator</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('brand')}
            className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              selectedRole === 'brand'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Join as Brand / Agency</span>
          </button>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-zinc-300 font-semibold mb-1">
              {selectedRole === 'creator' ? 'Creator / Display Name' : 'Company / Brand Name'}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={selectedRole === 'creator' ? 'Aria Vance' : 'Lumina Haute Wear'}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-300 font-semibold mb-1">
              {selectedRole === 'creator' ? 'Personal / Studio Email' : 'Work Email Address'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={selectedRole === 'creator' ? 'creator@diffusion.studio' : 'contact@lumina.luxury'}
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

          {selectedRole === 'creator' ? (
            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Primary AI Tools & Stack</label>
              <div className="relative">
                <Cpu className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder="e.g. Midjourney v6.1, Runway Gen-3, ComfyUI, Flux.1"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Estimated Monthly Campaign Budget ($ USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. 15000"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl text-xs font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all ${
              selectedRole === 'creator'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-95 shadow-violet-500/25'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:opacity-95 shadow-cyan-500/25'
            }`}
          >
            <span>Create {selectedRole === 'creator' ? 'Creator Studio' : 'Brand Workspace'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-[11px] text-zinc-400">
          Already have an account?{' '}
          <Link href="/login" className="text-violet-400 hover:underline font-semibold">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
