'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { UserRole } from '@/types/marketplace';
import { createClient } from '@/lib/supabase/client';
import { Sparkles, ArrowRight, Mail, Lock, User, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('creator');
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
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#090a0f] p-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/15 blur-[120px] pointer-events-none rounded-full" />

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
          <h2 className="text-lg font-bold text-white pt-2">Join the AI Creator Marketplace</h2>
          <p className="text-xs text-zinc-400">Showcase workflows or hire vetted multimodal directors</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4 text-xs">
          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Full / Display Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aria Vance"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-violet-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-300 font-semibold mb-1">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
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
            <label className="block text-zinc-300 font-semibold mb-1">Primary Role</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole('creator')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  selectedRole === 'creator'
                    ? 'bg-violet-600/30 border-violet-500 text-white font-bold'
                    : 'bg-white/5 border-white/10 text-zinc-400'
                }`}
              >
                <div>🎨 AI Creator</div>
                <div className="text-[10px] text-zinc-400 font-normal">I produce AI content</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('brand')}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  selectedRole === 'brand'
                    ? 'bg-cyan-600/30 border-cyan-500 text-white font-bold'
                    : 'bg-white/5 border-white/10 text-zinc-400'
                }`}
              >
                <div>🏢 Brand / Agency</div>
                <div className="text-[10px] text-zinc-400 font-normal">I hire AI creators</div>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2"
          >
            Create CreatorOS Account
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-[11px] text-zinc-400">
          Already have an account?{' '}
          <Link href="/login" className="text-violet-400 hover:underline font-semibold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
