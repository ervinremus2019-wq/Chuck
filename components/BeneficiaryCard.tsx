
import React, { useState, useEffect, useCallback } from 'react';
import { ACCENT_COLOR_HEX, BORDER_COLOR_HEX, MUTED_TEXT_COLOR_HEX } from '../constants';

interface BeneficiaryCardProps {
  beneficiaryName: string;
  onSaveLegal: (name: string) => void;
}

export const BeneficiaryCard: React.FC<BeneficiaryCardProps> = ({ beneficiaryName, onSaveLegal }) => {
  const [nameInput, setNameInput] = useState<string>(beneficiaryName);
  const [emailInput, setEmailInput] = useState<string>('');

  useEffect(() => {
    setNameInput(beneficiaryName);
  }, [beneficiaryName]);

  const handleSave = useCallback(() => {
    onSaveLegal(nameInput);
  }, [nameInput, onSaveLegal]);

  return (
    <div className="bg-panel-bg border border-border-primary rounded-xl p-5 backdrop-blur-md">
      <h3 className="text-xl font-semibold">Digital Beneficiary Designation</h3>
      <p className="text-sm mt-1 mb-5" style={{ color: MUTED_TEXT_COLOR_HEX }}>
        Specify who inherits control of the RADOS instance in case of emergency.
      </p>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          id="benName"
          placeholder="Beneficiary Full Name"
          className="p-3 bg-bg-primary border border-border-primary text-text-primary rounded-lg outline-none focus:ring-1 focus:ring-accent-blue"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          style={{borderColor: BORDER_COLOR_HEX, backgroundColor: '#000'}}
        />
        <input
          type="email"
          id="benEmail"
          placeholder="Verification Email"
          className="p-3 bg-bg-primary border border-border-primary text-text-primary rounded-lg outline-none focus:ring-1 focus:ring-accent-blue"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          style={{borderColor: BORDER_COLOR_HEX, backgroundColor: '#000'}}
        />
        <button
          onClick={handleSave}
          className="bg-accent-blue hover:opacity-90 text-white py-2 px-4 rounded-lg font-semibold"
          style={{backgroundColor: ACCENT_COLOR_HEX}}
        >
          Update Legal Protocols
        </button>
      </div>
    </div>
  );
};
