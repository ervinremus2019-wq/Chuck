
import React from 'react';
import { VaultItem } from '../types';
import { PURPLE_COLOR_HEX, ACCENT_COLOR_HEX, BORDER_COLOR_HEX, GOLD_COLOR_HEX, MUTED_TEXT_COLOR_HEX } from '../constants';

interface VaultCardProps {
  vaultItems: VaultItem[];
  onAddAsset: (name: string) => void;
}

export const VaultCard: React.FC<VaultCardProps> = ({ vaultItems, onAddAsset }) => {
  const handleAddAssetClick = () => {
    const name = prompt('Enter Asset/Protection Name:');
    if (name) {
      onAddAsset(name);
    }
  };

  return (
    <div className="bg-panel-bg border border-border-primary rounded-xl p-5 backdrop-blur-md">
      <h3 className="text-xl font-semibold">Intellectual Property & Inventory</h3>
      <p className="text-sm mt-1 mb-5" style={{ color: MUTED_TEXT_COLOR_HEX }}>
        Secured under Radosavlevici Inventor Protections.
      </p>
      <div id="inventoryList">
        {vaultItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center py-3 border-b border-border-primary last:border-b-0">
            <span className="text-base">{item.name}</span>
            <span
              className="text-xs font-semibold px-2 py-1 rounded-md uppercase"
              style={{
                backgroundColor: BORDER_COLOR_HEX,
                color: item.tagColor ? (item.tagColor === 'accent-gold' ? GOLD_COLOR_HEX : ACCENT_COLOR_HEX) : MUTED_TEXT_COLOR_HEX,
                border: item.borderColor ? `1px solid ${item.borderColor === 'accent-gold' ? GOLD_COLOR_HEX : ACCENT_COLOR_HEX}` : 'none',
              }}
            >
              {item.tag}
            </span>
          </div>
        ))}
      </div>
      <button
        className="mt-5 bg-accent-purple hover:opacity-90 text-white py-2 px-4 rounded-lg text-sm font-semibold"
        onClick={handleAddAssetClick}
        style={{ backgroundColor: PURPLE_COLOR_HEX }}
      >
        + Register New Asset
      </button>
    </div>
  );
};
