
import React from 'react';
import { OWNER, SUCCESS_COLOR_HEX, BORDER_COLOR_HEX, ERROR_RED_HEX, ERROR_BG_HEX } from '../constants';

interface SecurityCardProps {
  onRefreshSession: () => void;
  onWipeData: () => void;
}

export const SecurityCard: React.FC<SecurityCardProps> = ({ onRefreshSession, onWipeData }) => {
  return (
    <div className="bg-panel-bg border border-border-primary rounded-xl p-5 backdrop-blur-md">
      <h3 className="text-xl font-semibold">Security Architecture</h3>
      <div className="mt-4 text-base">
        <p>Owner: <strong>{OWNER}</strong></p>
        <p>Status: <span style={{ color: SUCCESS_COLOR_HEX }}>Biometric Verified</span></p>
        <hr className="my-4 border-t border-border-primary" style={{ borderColor: BORDER_COLOR_HEX }} />
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="flex-1 bg-border-primary hover:bg-slate-700 text-text-primary py-2 px-4 rounded-lg font-semibold"
            onClick={onRefreshSession}
            style={{ backgroundColor: BORDER_COLOR_HEX }}
          >
            Refresh Session
          </button>
          <button
            className="flex-1 bg-error-bg hover:bg-red-900 text-error-red py-2 px-4 rounded-lg font-semibold"
            onClick={onWipeData}
            style={{ backgroundColor: ERROR_BG_HEX, color: ERROR_RED_HEX }}
          >
            Factory Reset
          </button>
        </div>
      </div>
    </div>
  );
};
