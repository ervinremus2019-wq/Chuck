
import React, { useState, useEffect } from 'react';
import { ACCENT_COLOR_HEX, SUCCESS_COLOR_HEX, MUTED_TEXT_COLOR_HEX } from '../constants';

export const Header: React.FC = () => {
  const [sysTime, setSysTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      setSysTime(new Date().toLocaleTimeString());
    };
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="sticky top-0 z-20 p-4 border-b border-border-primary backdrop-blur-md flex justify-between items-center bg-bg-primary/70">
      <div>
        <h2 className="tracking-wide text-2xl font-bold">
          RADOS <span style={{ color: ACCENT_COLOR_HEX }}>CORE</span>
        </h2>
        <p className="text-xs" style={{ color: MUTED_TEXT_COLOR_HEX }}>
          v5.0.26 PRODUCTION | ENCRYPTED TUNNEL ACTIVE
        </p>
      </div>
      <div className="text-right">
        <span className="font-mono text-lg">{sysTime}</span><br />
        <span className="text-xs" style={{ color: SUCCESS_COLOR_HEX }}>
          <span className="inline-block h-2 w-2 rounded-full mr-1 shadow-success-glow" style={{ background: SUCCESS_COLOR_HEX }}></span> UPLINK STABLE
        </span>
      </div>
    </header>
  );
};
