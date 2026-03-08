import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Header({ t }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <Sparkles className="logo-icon" size={28} />
          <h1>{t.title}</h1>
        </div>
        <p className="subtitle">{t.subtitle}</p>
        {t.description && <p className="description">{t.description}</p>}
      </div>
    </header>
  );
}
