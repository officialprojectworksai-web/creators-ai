'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { VerificationBadge } from '@/components/VerificationBadge';
import { useAuth } from '@/context/auth-context';
import { MarketplaceService } from '@/lib/data/marketplace-service';
import { VerificationClaim } from '@/types/marketplace';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  FileCode2, 
  Sparkles, 
  AlertTriangle,
  Send,
  Users
} from 'lucide-react';
import Link from 'next/link';

export default function VerificationAdminPage() {
  const { user, role } = useAuth();
  const [claims, setClaims] = useState<VerificationClaim[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<VerificationClaim | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    MarketplaceService.getVerificationClaims().then(setClaims);
  }, []);

  const handleAuditDecision = async (status: 'verified' | 'rejected' | 'under_review') => {
    if (!selectedClaim) return;
    setIsProcessing(true);

    const updated = await MarketplaceService.updateVerificationClaimStatus(
      selectedClaim.id,
      status,
      reviewNotes || (status === 'verified' ? 'Verified by admin: Code inspected and verified.' : 'Requires additional reproducibility proof.'),
      user?.id || '00000000-0000-0000-0000-000000000099'
    );

    if (updated) {
      const allUpdated = await MarketplaceService.getVerificationClaims();
      setClaims(allUpdated);
      setSelectedClaim(null);
      setReviewNotes('');
      setNotification(`Claim "${updated.claim_title}" marked as ${status.toUpperCase()}!`);
      if (status === 'verified') {
        try { confetti({ particleCount: 70, spread: 60 }); } catch (e) {}
      }
      setTimeout(() => setNotification(null), 4000);
    }
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="p-6 rounded-3xl bg-[#111420]/90 border border-amber-500/30 shadow-2xl relative overflow-hidden mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700/60 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>CreatorOS Trust & Verification Desk</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Evidence Audit & Credential Verification Portal
              </h1>
              <p className="text-xs text-zinc-400 max-w-xl">
                Inspect submitted ComfyUI node graphs, LoRA checkpoint hashes, and commercial client attribution proofs.
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-right">
              <div className="text-zinc-500 uppercase font-mono text-[10px]">Logged Auditor</div>
              <div className="font-bold text-white">{user?.display_name || 'Admin Reviewer'}</div>
            </div>
          </div>
        </div>

        {notification && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Claims Queue (7 cols) */}
          <section className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="font-bold text-white text-sm">Submitted Evidence Claims Queue ({claims.length})</span>
              <span>Click a claim to audit</span>
            </div>

            <div className="space-y-3">
              {claims.map((claim) => {
                const isSelected = selectedClaim?.id === claim.id;
                return (
                  <div
                    key={claim.id}
                    onClick={() => {
                      setSelectedClaim(claim);
                      setReviewNotes(claim.review_notes || '');
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-amber-950/25 border-amber-500/60 shadow-lg shadow-amber-950/30'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-sm text-white">{claim.claim_title}</div>
                        <div className="text-[11px] text-zinc-400 flex items-center gap-2 mt-0.5">
                          <span>Creator: <strong className="text-violet-300">{claim.creator?.display_name || 'Creator'}</strong></span>
                          <span>•</span>
                          <span className="capitalize">{claim.claim_type.replace('_', ' ')}</span>
                        </div>
                      </div>
                      <VerificationBadge status={claim.status} label={claim.badge_label} size="sm" />
                    </div>

                    <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                      {claim.claim_description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                      <a
                        href={claim.evidence_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-cyan-400 hover:underline flex items-center gap-1 font-mono text-[10px]"
                      >
                        <span>Inspect Evidence ({claim.evidence_url})</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Audit Action Panel (5 cols) */}
          <section className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-[#111420] border border-white/10 space-y-5 sticky top-24">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-amber-400" />
                Evidence Inspection Desk
              </h3>

              {selectedClaim ? (
                <div className="space-y-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                    <span className="text-[10px] uppercase font-mono text-zinc-500">Claim Title</span>
                    <div className="font-bold text-white text-sm">{selectedClaim.claim_title}</div>
                    <div className="text-zinc-400">
                      Submitted by: <strong className="text-violet-300">{selectedClaim.creator?.display_name}</strong>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Evidence URL</span>
                    <a
                      href={selectedClaim.evidence_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-zinc-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono block break-all hover:bg-zinc-800 transition-colors"
                    >
                      {selectedClaim.evidence_url} ↗
                    </a>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-500 block mb-1">Detailed Description</span>
                    <p className="p-3 rounded-lg bg-white/5 text-zinc-300 leading-relaxed">
                      {selectedClaim.claim_description}
                    </p>
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Auditor Signoff Notes</label>
                    <textarea
                      rows={3}
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder="e.g. Verified ComfyUI node graph on test environment; output seed matches published 4K video frame 100%."
                      className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Audit Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => handleAuditDecision('verified')}
                      disabled={isProcessing}
                      className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approve as Verified
                    </button>

                    <button
                      onClick={() => handleAuditDecision('rejected')}
                      disabled={isProcessing}
                      className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject Claim
                    </button>
                  </div>

                  <button
                    onClick={() => handleAuditDecision('under_review')}
                    disabled={isProcessing}
                    className="w-full py-2 rounded-xl text-xs font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-950/70 border border-amber-500/30 flex items-center justify-center gap-1.5"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    Mark Under Secondary Review
                  </button>
                </div>
              ) : (
                <div className="p-8 text-center text-zinc-500 text-xs rounded-xl bg-white/[0.02] border border-white/5">
                  Select an evidence claim from the list on the left to inspect files and record an audit decision.
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
