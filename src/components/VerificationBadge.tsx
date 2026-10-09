'use client';

import React from 'react';
import { VerificationStatus } from '@/types/marketplace';
import { ShieldCheck, Clock, FileCheck, AlertCircle } from 'lucide-react';

interface VerificationBadgeProps {
  status: VerificationStatus;
  label?: string | null;
  size?: 'sm' | 'md';
  showTooltip?: boolean;
}

export function VerificationBadge({ status, label, size = 'sm', showTooltip = true }: VerificationBadgeProps) {
  if (status === 'verified') {
    return (
      <span 
        title={showTooltip ? "Verified by Admin: Production workflow, model weights, or commercial source audited." : undefined}
        className={`inline-flex items-center gap-1 font-medium rounded-full badge-verified ${
          size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
        }`}
      >
        <ShieldCheck className={size === 'sm' ? 'w-3.5 h-3.5 text-emerald-400' : 'w-4 h-4 text-emerald-400'} />
        <span>{label || 'Verified by Admin'}</span>
      </span>
    );
  }

  if (status === 'under_review') {
    return (
      <span 
        title={showTooltip ? "Evidence Submitted: Currently under secondary review." : undefined}
        className={`inline-flex items-center gap-1 font-medium rounded-full badge-review ${
          size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
        }`}
      >
        <Clock className={size === 'sm' ? 'w-3.5 h-3.5 text-amber-400' : 'w-4 h-4 text-amber-400'} />
        <span>{label || 'Under Review'}</span>
      </span>
    );
  }

  if (status === 'submitted') {
    return (
      <span 
        title={showTooltip ? "Evidence Link Submitted: Pending auditor verification." : undefined}
        className={`inline-flex items-center gap-1 font-medium rounded-full badge-submitted ${
          size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
        }`}
      >
        <FileCheck className={size === 'sm' ? 'w-3.5 h-3.5 text-indigo-400' : 'w-4 h-4 text-indigo-400'} />
        <span>{label || 'Evidence Submitted'}</span>
      </span>
    );
  }

  return (
    <span 
      title={showTooltip ? "Self-reported profile data. No formal evidence link submitted yet." : undefined}
      className={`inline-flex items-center gap-1 font-normal text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 rounded-full ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      }`}
    >
      <AlertCircle className={size === 'sm' ? 'w-3 h-3 text-zinc-500' : 'w-3.5 h-3.5 text-zinc-500'} />
      <span>Self-Reported</span>
    </span>
  );
}
