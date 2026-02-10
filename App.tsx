
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { ChatInterface } from './components/ChatInterface';
import { SystemHealthCard } from './components/SystemHealthCard';
import { VaultCard } from './components/VaultCard';
import { BeneficiaryCard } from './components/BeneficiaryCard';
import { SecurityCard } from './components/SecurityCard';
import { Footer } from './components/Footer';
import { ChatMessage, TabId, VaultItem } from './types';
import {
  OWNER,
  INITIAL_AI_MESSAGE,
  LOCAL_STORAGE_CHAT_KEY,
  LOCAL_STORAGE_BENEFICIARY_KEY,
} from './constants';
import { generateGeminiResponse } from './services/geminiService';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('dash');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    const savedChats = localStorage.getItem(LOCAL_STORAGE_CHAT_KEY);
    return savedChats ? JSON.parse(savedChats) : [{ text: INITIAL_AI_MESSAGE, type: 'ai' }];
  });
  const [vaultItems, setVaultItems] = useState<VaultItem[]>(() => [
    { id: '1', name: 'RADOS AGI Kernel v5.0', tag: 'Patented', tagColor: 'accent-gold', borderColor: 'accent-gold' },
    { id: '2', name: 'Predictive Life-Stability Algorithm', tag: 'Trade Secret' },
  ]);
  const [beneficiaryName, setBeneficiaryName] = useState<string>(
    localStorage.getItem(LOCAL_STORAGE_BENEFICIARY_KEY) || ''
  );
  const [apiKeySelected, setApiKeySelected] = useState<boolean>(true); // Assume true initially

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setApiKeySelected(hasKey);
      } else {
        console.warn("window.aistudio.hasSelectedApiKey is not available. API key selection UI may not function.");
      }
    };
    checkApiKey();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CHAT_KEY, JSON.stringify(chatHistory.slice(-20))); // Keep last 20 messages
  }, [chatHistory]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_BENEFICIARY_KEY, beneficiaryName);
  }, [beneficiaryName]);

  const addChatMessage = useCallback((message: ChatMessage) => {
    setChatHistory((prevHistory) => [...prevHistory, message]);
  }, []);

  const handleChatSubmit = useCallback(async (query: string) => {
    addChatMessage({ text: query, type: 'user' });

    // Add a loading message
    const loaderMessage: ChatMessage = { text: 'Consulting Sonar High-Speed Uplink...', type: 'ai' };
    addChatMessage(loaderMessage);

    try {
      if (!apiKeySelected && window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
        await window.aistudio.openSelectKey();
        setApiKeySelected(true); // Optimistically assume key is selected
        // Re-attempt after key selection
      }

      const systemInstruction = `You are the RADOS AGI Production Engine for ${OWNER}. You are precise, professional, and high-tech.`;
      const responseText = await generateGeminiResponse(chatHistory, query, systemInstruction);

      setChatHistory((prevHistory) => {
        // Remove the loader message
        const updatedHistory = prevHistory.filter(msg => msg !== loaderMessage);
        return [...updatedHistory, { text: responseText, type: 'ai', isPremium: true }];
      });
    } catch (error) {
      console.error('Chat error:', error);
      setChatHistory((prevHistory) => {
        // Remove the loader message
        const updatedHistory = prevHistory.filter(msg => msg !== loaderMessage);
        let errorMessage = 'System Error: Uplink Interrupted.';
        if (error instanceof Error && error.message.includes('Requested entity was not found.')) {
          errorMessage += ' Please select a valid API Key for Gemini. You need a paid GCP project.';
          setApiKeySelected(false); // Key is definitely not selected or invalid
        } else if (error instanceof Error) {
          errorMessage += ` ${error.message}`;
        }
        return [...updatedHistory, { text: errorMessage, type: 'ai', isPremium: false }];
      });
    }
  }, [addChatMessage, chatHistory, apiKeySelected]); // Include apiKeySelected in dependency array

  const addAsset = useCallback((name: string) => {
    if (name) {
      setVaultItems((prevItems) => [
        ...prevItems,
        { id: String(prevItems.length + 1), name: name, tag: 'Active Protection' },
      ]);
    }
  }, []);

  const saveLegal = useCallback((name: string) => {
    if (name) {
      setBeneficiaryName(name);
      alert('Legal Beneficiary Protocols Updated for: ' + name);
    }
  }, []);

  const wipeData = useCallback(() => {
    if (confirm('CRITICAL: Wipe all local history and legal logs?')) {
      localStorage.clear();
      window.location.reload();
    }
  }, []);

  const requestApiKey = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      setApiKeySelected(true); // Optimistically assume selection was successful
    } else {
      alert("API Key selection is not available in this environment.");
    }
  };

  return (
    <>
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-y-auto p-4 md:p-5">
        {!apiKeySelected && (
          <div className="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-center">
            <p className="text-error-red mb-2">
              Gemini API Key not selected or invalid. Please select an API key to enable full functionality.
            </p>
            <button
              onClick={requestApiKey}
              className="bg-accent-blue hover:opacity-90 text-white font-semibold py-2 px-4 rounded-md"
            >
              Select Gemini API Key
            </button>
            <p className="text-xs text-text-muted mt-2">
              Requires a paid GCP project. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline">Billing info</a>
            </p>
          </div>
        )}
        <div id="dash" className={`${activeTab === 'dash' ? 'block' : 'hidden'} animate-fadeIn`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2">
              <ChatInterface chatHistory={chatHistory} onChatSubmit={handleChatSubmit} />
            </div>
            <SystemHealthCard />
          </div>
        </div>

        <div id="vault" className={`${activeTab === 'vault' ? 'block' : 'hidden'} animate-fadeIn`}>
          <VaultCard vaultItems={vaultItems} onAddAsset={addAsset} />
        </div>

        <div id="legal" className={`${activeTab === 'legal' ? 'block' : 'hidden'} animate-fadeIn`}>
          <BeneficiaryCard beneficiaryName={beneficiaryName} onSaveLegal={saveLegal} />
        </div>

        <div id="settings" className={`${activeTab === 'settings' ? 'block' : 'hidden'} animate-fadeIn`}>
          <SecurityCard onRefreshSession={() => window.location.reload()} onWipeData={wipeData} />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default App;
