import React from 'react';
import { Type, CheckCircle2, Circle, Sparkles } from 'lucide-react';

const platformsList = [
    { id: 'blog', name: 'Blog', color: '#ff4d4f' },
    { id: 'x', name: 'X (Twitter)', color: '#0f1419' },
    { id: 'instagram', name: 'Instagram', color: '#e1306c' },
    { id: 'tiktok', name: 'TikTok', color: '#000000' },
    { id: 'facebook', name: 'Facebook', color: '#1877f2' }
];

export default function InputSection({
    inputValue,
    setInputValue,
    selectedPlatforms,
    togglePlatform,
    selectedLanguage,
    setSelectedLanguage,
    isGenerating,
    handleGenerate,
    t
}) {
    const languages = [
        { id: 'en', name: 'English', flag: '🇺🇸' },
        { id: 'tw', name: '繁體中文', flag: '🇹🇼' },
        { id: 'cn', name: '简体中文', flag: '🇨🇳' },
        { id: 'ja', name: '日本語', flag: '🇯🇵' },
        { id: 'ko', name: '한국어', flag: '🇰🇷' }
    ];

    return (
        <section className="glass-panel input-section">
            <div className="language-selection" style={{ marginBottom: '1.5rem' }}>
                <label className="label-text">{t.languageLabel}</label>
                <div className="platform-chips">
                    {languages.map(lang => {
                        const isSelected = selectedLanguage === lang.id;
                        return (
                            <button
                                key={lang.id}
                                className={`platform-chip ${isSelected ? 'selected' : ''}`}
                                onClick={() => setSelectedLanguage(lang.id)}
                                disabled={isGenerating}
                                style={{
                                    borderColor: isSelected ? 'var(--accent-red)' : 'var(--border-color)',
                                    backgroundColor: isSelected ? 'var(--accent-red-light)' : 'transparent',
                                    color: isSelected ? 'var(--accent-red)' : 'var(--text-secondary)'
                                }}
                            >
                                <span style={{ marginRight: '6px' }}>{lang.flag}</span>
                                {lang.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="input-group">
                <label className="label-text">
                    <Type size={16} className="inline-icon" />
                    {t.productLabel}
                </label>
                <textarea
                    className="input-field product-input"
                    placeholder={t.productPlaceholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    rows={4}
                    disabled={isGenerating}
                />
            </div>

            <div className="platform-selection">
                <label className="label-text">{t.platformLabel}</label>
                <div className="platform-chips">
                    {platformsList.map(platform => {
                        const isSelected = selectedPlatforms.includes(platform.id);
                        return (
                            <button
                                key={platform.id}
                                className={`platform-chip ${isSelected ? 'selected' : ''}`}
                                onClick={() => togglePlatform(platform.id)}
                                disabled={isGenerating}
                                style={{
                                    '--btn-theme-color': platform.color,
                                    borderColor: isSelected ? platform.color : 'var(--border-color)',
                                    backgroundColor: isSelected ? `${platform.color}15` : 'transparent',
                                    color: isSelected ? platform.color : 'var(--text-secondary)'
                                }}
                            >
                                {isSelected ? <CheckCircle2 size={16} className="platform-icon selected" /> : <Circle size={16} className="platform-icon" />}
                                {platform.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="action-row">
                <button
                    className="btn-primary generate-btn"
                    onClick={handleGenerate}
                    disabled={isGenerating || !inputValue.trim() || selectedPlatforms.length === 0}
                >
                    <Sparkles size={18} />
                    {isGenerating ? t.generatingBtn : t.generateBtn}
                </button>
            </div>
        </section>
    );
}
