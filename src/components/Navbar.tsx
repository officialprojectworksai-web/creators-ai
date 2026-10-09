'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { UserRole } from '@/types/marketplace';
import { 
  Sparkles, 
  Users, 
  Briefcase, 
  ShieldAlert, 
  LayoutDashboard, 
  ChevronDown, 
  Check, 
  PlusCircle,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  onOpenAIBrief?: () => void;
}

export function Navbar({ onOpenAIBrief }: NavbarProps) {
  const pathname = usePathname();
  const { user, role, switchRole } = useAuth();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const roles: { key: UserRole; label: string; desc: string; badge: string }[] = [
    { key: 'creator', label: 'AI Creator', desc: 'Aria Vance (Cinematic AI Director)', badge: 'Creator View' },
    { key: 'brand', label: 'Brand Executive', desc: 'Lumina Haute Wear (Streetwear)', badge: 'Brand View' },
    { key: 'agency', label: 'Agency Partner', desc: 'Aetherium Agency (Creative Director)', badge: 'Agency View' },
    { key: 'admin', label: 'Verification Admin', desc: 'Reviewer & Auditor Desk', badge: 'Admin View' },
  ];

  const currentRoleInfo = roles.find((r) => r.key === role) || roles[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#090a0f]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#0d101d] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-violet-400 group-hover:text-cyan-300 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-violet-200 transition-colors">
                  Creator<span className="text-violet-400">OS</span>
                </span>
                <span className="text-[10px] uppercase font-mono font-semibold px-1.5 py-0.5 rounded bg-violet-950/80 text-violet-300 border border-violet-800/60">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 hidden sm:inline -mt-1">
                From Brief → Best Creator → Campaign
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/creators"
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                pathname.startsWith('/creators')
                  ? 'bg-white/10 text-white shadow-inner'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Explore Creators
            </Link>
            <Link
              href="/campaigns"
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                pathname.startsWith('/campaigns')
                  ? 'bg-white/10 text-white shadow-inner'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Campaign Briefs
            </Link>
            <Link
              href="/dashboard"
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                pathname.startsWith('/dashboard')
                  ? 'bg-white/10 text-white shadow-inner'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/verification"
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                pathname.startsWith('/admin')
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-zinc-400 hover:text-amber-300 hover:bg-amber-500/10'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              Review Desk
            </Link>
          </nav>
        </div>

        {/* Right Actions: AI Brief Button & Role Switcher */}
        <div className="hidden md:flex items-center gap-3">
          {onOpenAIBrief && (
            <button
              onClick={onOpenAIBrief}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:opacity-95 shadow-md shadow-violet-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
              AI Brief Builder
            </button>
          )}

          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-zinc-200 transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{currentRoleInfo.badge}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {isRoleDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 rounded-xl glass-dropdown shadow-2xl p-2 z-50 border border-white/15 animate-fade-in"
                onMouseLeave={() => setIsRoleDropdownOpen(false)}
              >
                <div className="px-3 py-2 border-b border-white/10 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Test Personas (Instant Switch)
                </div>
                <div className="py-1 space-y-1">
                  {roles.map((r) => {
                    const isSelected = r.key === role;
                    return (
                      <button
                        key={r.key}
                        onClick={() => {
                          switchRole(r.key);
                          setIsRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-xs flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-violet-600/25 text-violet-200 border border-violet-500/30'
                            : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-white">{r.label}</div>
                          <div className="text-[11px] text-zinc-400">{r.desc}</div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-violet-400 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar Link */}
          {user && (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 pl-2 border-l border-white/10 group"
              title={`Logged in as ${user.display_name}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatar_url}
                alt={user.display_name}
                className="w-8 h-8 rounded-full object-cover border border-violet-500/40 group-hover:border-cyan-400 transition-colors"
              />
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          {onOpenAIBrief && (
            <button
              onClick={onOpenAIBrief}
              className="p-2 rounded-lg bg-violet-600/20 text-violet-300 border border-violet-500/30 text-xs"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0c0f1d] px-4 pt-3 pb-5 space-y-3">
          <nav className="flex flex-col space-y-1">
            <Link
              href="/creators"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-200 hover:bg-white/5"
            >
              Explore Creators
            </Link>
            <Link
              href="/campaigns"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-200 hover:bg-white/5"
            >
              Campaign Briefs
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-200 hover:bg-white/5"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/verification"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-amber-400 hover:bg-amber-500/10"
            >
              Review Desk
            </Link>
          </nav>

          <div className="pt-3 border-t border-white/10">
            <div className="text-xs text-zinc-400 mb-2 font-medium">Switch Persona:</div>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => (
                <button
                  key={r.key}
                  onClick={() => {
                    switchRole(r.key);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs text-left ${
                    r.key === role ? 'bg-violet-600 text-white font-medium' : 'bg-white/5 text-zinc-300'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
