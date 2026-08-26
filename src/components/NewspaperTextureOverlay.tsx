import React from 'react';

export const NewspaperTextureOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Master High-Resolution Vintage Broadsheet Newspaper Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{
          backgroundImage: `url('/clean_broadsheet_bg.jpg')`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 2. Vintage Newsprint Collage Background Layer (Darker) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-multiply opacity-60 filter brightness-90 contrast-110"
        style={{
          backgroundImage: `url('/vintage_newsprint_collage.jpg')`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 3. Darkened Vignette & Shading Tint Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(200, 180, 150, 0.3) 0%, rgba(120, 95, 65, 0.45) 60%, rgba(20, 15, 8, 0.75) 100%)',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  );
};

