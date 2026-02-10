
import React from 'react';
import { ACCENT_COLOR_HEX, SUCCESS_COLOR_HEX, MUTED_TEXT_COLOR_HEX } from '../constants';

export const SystemHealthCard: React.FC = () => {
  return (
    <div className="bg-panel-bg border border-border-primary rounded-xl p-5 backdrop-blur-md">
      <h3 className="text-xl font-semibold">System Health</h3>
      <div className="mt-4">
        <label className="text-xs font-medium uppercase" style={{ color: MUTED_TEXT_COLOR_HEX }}>NEURAL LOAD</label>
        <div className="h-1.5 bg-gray-900 rounded-full mt-1 mb-4">
          <div className="w-[24%] h-full rounded-full" style={{ backgroundColor: ACCENT_COLOR_HEX }}></div>
        </div>

        <label className="text-xs font-medium uppercase" style={{ color: MUTED_TEXT_COLOR_HEX }}>ENCRYPTION STRENGTH</label>
        <div className="h-1.5 bg-gray-900 rounded-full mt-1 mb-4">
          <div className="w-[98%] h-full rounded-full" style={{ backgroundColor: SUCCESS_COLOR_HEX }}></div>
        </div>
      </div>
    </div>
  );
};
