import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingIndicator({ platforms, t }) {
    return (
        <div className="loading-container glass-panel">
            <div className="loader-spinner">
                <Loader2 size={40} className="spin-icon text-accent" />
            </div>
            <h3 className="loading-title">{t.thinking}</h3>
            <p className="loading-subtitle">
                Analyzing context and tailoring tone for {platforms.length} platform{platforms.length > 1 ? 's' : ''}...
            </p>

            <div className="loading-steps">
                {platforms.map((platform, index) => (
                    <div key={platform} className="loading-step" style={{ animationDelay: `${index * 150}ms` }}>
                        <div className="step-dot pulse"></div>
                        <span className="step-text">Generating {platform} content...</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
