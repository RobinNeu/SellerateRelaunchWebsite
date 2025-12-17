# Sellerate Website

Moderne Website-Architektur mit React, TypeScript und Vite.

## Projektstruktur

```
src/
├── components/          # Wiederverwendbare Komponenten
│   ├── AuroraBackground/
│   ├── Button/
│   ├── ChecklistSection/
│   ├── EvidenceSection/
│   ├── Footer/
│   ├── GlassPanel/
│   ├── Header/
│   ├── HeroSection/
│   ├── PipelineCalculator/
│   ├── ProcessSection/
│   ├── ProofSection/
│   ├── ResourcesSection/
│   ├── ShredderSection/
│   ├── SignalRadar/
│   └── SystemSection/
├── hooks/               # Custom React Hooks
│   ├── useMagneticButton.ts
│   ├── usePipelineCalculator.ts
│   ├── useScrollReveal.ts
│   └── useSignalFeed.ts
├── styles/              # Globale Styles
│   ├── aurora.css
│   ├── index.css
│   └── variables.css
├── App.tsx              # Haupt-App-Komponente
└── main.tsx             # Entry Point
```

## Installation

```bash
npm install
```

## Entwicklung

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Features

- **Komponenten-basiert**: Wiederverwendbare React-Komponenten
- **TypeScript**: Vollständige Type-Safety
- **Moderne Architektur**: Vite für schnelle Entwicklung
- **Custom Hooks**: Wiederverwendbare Logik
- **Modulares CSS**: Getrennte Stylesheets pro Komponente
- **Responsive Design**: Mobile-first Ansatz

## Komponenten

### UI-Komponenten
- `Button` - Wiederverwendbare Button-Komponente mit Varianten
- `GlassPanel` - Glassmorphism-Panel-Komponente

### Sections
- `HeroSection` - Hero-Bereich mit Headline und Visual
- `ShredderSection` - Interaktive Bullshit-Übersetzer-Section
- `SystemSection` - Bento-Grid mit System-Features
- `ProcessSection` - Scroll-Reveal Prozess-Schritte
- `EvidenceSection` - Case Study Section
- `ProofSection` - Proof-Points Section
- `ResourcesSection` - Blog/Ressourcen Grid
- `ChecklistSection` - Interaktive Checklist mit CTA

### Spezial-Komponenten
- `PipelineCalculator` - Interaktiver Pipeline-Rechner
- `SignalRadar` - Live Signal Feed
- `AuroraBackground` - Animierter Hintergrund

## Hooks

- `usePipelineCalculator` - Pipeline-Berechnungslogik
- `useSignalFeed` - Live Signal Feed Management
- `useMagneticButton` - Magnetischer Button-Effekt
- `useScrollReveal` - Scroll-basierte Animationen

