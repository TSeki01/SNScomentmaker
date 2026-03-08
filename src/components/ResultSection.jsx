import React, { useState } from 'react';
import { Copy, Check, Image as ImageIcon, MessageSquare } from 'lucide-react';

export default function ResultSection({ results, t }) {
    const platforms = Object.keys(results);
    const [activeTab, setActiveTab] = useState(platforms[0] || '');
    const [copiedText, setCopiedText] = useState(false);
    const [copiedPrompt, setCopiedPrompt] = useState(false);

    if (platforms.length === 0) return null;

    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text);
        if (type === 'text') {
            setCopiedText(true);
            setTimeout(() => setCopiedText(false), 2000);
        } else {
            setCopiedPrompt(true);
            setTimeout(() => setCopiedPrompt(false), 2000);
        }
    };

    const activeResult = results[activeTab];

    return (
        <section className="results-section">
            <div className="tabs">
                {platforms.map(platform => (
                    <button
                        key={platform}
                        className={`tab-btn ${activeTab === platform ? 'active' : ''}`}
                        onClick={() => setActiveTab(platform)}
                    >
                        {platform}
                    </button>
                ))}
            </div>

            {activeResult && (
                <div className="result-card glass-panel">
                    <div className="result-block">
                        <div className="block-header">
                            <h3 className="block-title">
                                <MessageSquare size={18} className="inline-icon" />
                                {t.postContent}
                            </h3>
                            <button
                                className="icon-btn"
                                onClick={() => handleCopy(activeResult.text, 'text')}
                                title="Copy text"
                            >
                                {copiedText ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                            </button>
                        </div>
                        <div className="content-box text-box">
                            {activeResult.text}
                        </div>
                    </div>

                    <div className="result-block">
                        <div className="block-header">
                            <h3 className="block-title">
                                <ImageIcon size={18} className="inline-icon" />
                                {t.imagePrompt}
                            </h3>
                            <button
                                className="icon-btn"
                                onClick={() => handleCopy(activeResult.imagePrompt, 'prompt')}
                                title="Copy prompt"
                            >
                                {copiedPrompt ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                            </button>
                        </div>
                        <div className="content-box prompt-box">
                            {activeResult.imagePrompt}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
