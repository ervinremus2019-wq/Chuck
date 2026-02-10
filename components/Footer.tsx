
import React from 'react';
import { OWNER, MUTED_TEXT_COLOR_HEX } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="py-4 text-xs text-center border-t border-border-primary bg-bg-primary/70" style={{ color: MUTED_TEXT_COLOR_HEX }}>
      © 2026 {OWNER} • RADOS Engine • Production Grade • GDPR Verified
    </footer>
  );
};
