
import React from 'react';
import { TabId } from '../types';
import { ACCENT_COLOR_HEX, MUTED_TEXT_COLOR_HEX, BORDER_COLOR_HEX } from '../constants';

interface TabsProps {
  activeTab: TabId;
  setActiveTab: (tabId: TabId) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: TabId; label: string }[] = [
    { id: 'dash', label: 'TERMINAL' },
    { id: 'vault', label: 'INVENTOR VAULT' },
    { id: 'legal', label: 'BENEFICIARY' },
    { id: 'settings', label: 'SECURITY' },
  ];

  return (
    <div className="sticky top-[73px] md:top-[85px] z-10 flex bg-black/40 border-b border-border-primary overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex-shrink-0 px-6 py-4 cursor-pointer text-sm transition-all duration-300 ${
            activeTab === tab.id
              ? 'text-accent-blue border-b-2 border-accent-blue bg-accent-blue/5'
              : 'text-text-muted border-b-2 border-transparent hover:border-text-muted/50'
          }`}
          onClick={() => setActiveTab(tab.id)}
          style={{
            color: activeTab === tab.id ? ACCENT_COLOR_HEX : MUTED_TEXT_COLOR_HEX,
            borderColor: activeTab === tab.id ? ACCENT_COLOR_HEX : 'transparent',
            backgroundColor: activeTab === tab.id ? 'rgba(59,130,246,0.05)' : 'transparent',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
