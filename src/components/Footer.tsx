import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Cpu, Code2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#07080c] py-12 text-zinc-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-[#090a0f] rounded-[7px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                </div>
              </div>
              <span className="font-bold text-white text-base">CreatorOS AI</span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              The AI-Native Marketplace for brands and verified generative creators. From Brief → Best Creator → Campaign → Content.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Built for HacXLerate 2026 Challenge #2
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Marketplace</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/creators" className="hover:text-violet-400 transition-colors">Discover AI Creators</Link></li>
              <li><Link href="/campaigns" className="hover:text-violet-400 transition-colors">Campaign Briefs</Link></li>
              <li><Link href="/dashboard" className="hover:text-violet-400 transition-colors">Creator Studio</Link></li>
              <li><Link href="/admin/verification" className="hover:text-violet-400 transition-colors">Evidence Review Desk</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Supported AI Stacks</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-violet-400" /> Runway Gen-3 & Kling AI</li>
              <li className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-cyan-400" /> Flux.1 & Midjourney v6.1</li>
              <li className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-indigo-400" /> ComfyUI & Custom LoRAs</li>
              <li className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-emerald-400" /> ElevenLabs Voice Synthesis</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Trust & Compliance</h4>
            <p className="text-xs text-zinc-500 leading-relaxed mb-3">
              CreatorOS AI enforces transparent workflow documentation, source prompt checks, and clear commercial rights buyout terms under FTC and EU AI Act disclosure standards.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Evidence-Based Trust Architecture
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <div>
            © 2026 CreatorOS AI. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-400 cursor-pointer">Commercial Licensing Terms</span>
            <span className="hover:text-zinc-400 cursor-pointer">AI Disclosure Policy</span>
            <span className="hover:text-zinc-400 cursor-pointer">Privacy Framework</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
