import React, { useState, useEffect } from 'react';
import { TRIUNE_LOGO, TECHNEAT_LOGO, DIGITAL_CARD_PORTRAIT } from '../data/portfolioData';

/* ─────────────────────────────────────────────
   Card data
───────────────────────────────────────────── */
interface CardData {
  id: string;
  company: string;
  companyDisplayName: string;
  companySubtitle: string;
  role: string;
  roleTag: string;
  tagline: string;
  bio: string;
  logo: string;
  accentColor: string;
  accentBg: string;
  borderColor: string;
  badgeBg: string;
  badgeTextColor: string;
  linkedinUrl: string;
  whatsappNumber: string;
  email: string;
  website: string;
  vcardData: string;
}

const CARDS: CardData[] = [
  {
    id: 'triune',
    company: 'Triune Business Ventures',
    companyDisplayName: 'TBV',
    companySubtitle: 'Pvt. Ltd. — A Conglomerate Company',
    role: 'Chief Executive Officer',
    roleTag: 'CEO',
    tagline: 'Building businesses that move markets.',
    bio: 'Avina Lloyd leads Triune Business Ventures as Group CEO, orchestrating cross-sector enterprise growth across real estate, healthcare, trade, and CSR — forging partnerships that open lasting opportunities.',
    logo: TRIUNE_LOGO,
    accentColor: '#b3884d',
    accentBg: 'from-[#f9f3ea] via-[#fdf8f0] to-[#fbf9f6]',
    borderColor: 'border-[#c5a059]/40',
    badgeBg: '#141312',
    badgeTextColor: '#c5a059',
    linkedinUrl: 'https://www.linkedin.com/in/avina-lloyd/',
    whatsappNumber: '+91 80500 05569',
    email: 'avina.lloyd@triunebusiness.com',
    website: 'https://www.triunebusinessventures.com/',
    vcardData: `BEGIN:VCARD\nVERSION:3.0\nFN:Avina Lloyd\nN:Lloyd;Avina;;;\nORG:Triune Business Ventures Pvt. Ltd.\nTITLE:Chief Executive Officer (CEO)\nTEL;TYPE=CELL:+918050005569\nEMAIL;TYPE=WORK:avina.lloyd@triunebusiness.com\nURL:https://www.linkedin.com/in/avina-lloyd/\nNOTE:CEO at Triune Business Ventures.\nEND:VCARD`,
  },
  {
    id: 'techneat',
    company: 'Techneat Info Solutions',
    companyDisplayName: 'Techneat',
    companySubtitle: 'Technology & IT Services',
    role: 'Chief Financial Officer',
    roleTag: 'CFO',
    tagline: 'Driving technology-led financial excellence.',
    bio: 'As CFO of Techneat Info Solutions, Avina Lloyd steers financial strategy, governance, and operational efficiency — applying Six Sigma precision and two decades of enterprise leadership to build sustainable tech-enabled value.',
    logo: TECHNEAT_LOGO,
    accentColor: '#1473a5',
    accentBg: 'from-[#eaf4fb] via-[#f0f7fc] to-[#fbf9f6]',
    borderColor: 'border-[#1473a5]/30',
    badgeBg: '#1473a5',
    badgeTextColor: '#ffffff',
    linkedinUrl: 'https://www.linkedin.com/in/avina-lloyd/',
    whatsappNumber: '+91 80500 05569',
    email: 'Avina@techneatsolutions.com',
    website: 'https://techneatsolutions.com/',
    vcardData: `BEGIN:VCARD\nVERSION:3.0\nFN:Avina Lloyd\nN:Lloyd;Avina;;;\nORG:Techneat Info Solutions\nTITLE:Chief Financial Officer (CFO)\nTEL;TYPE=CELL:+918050005569\nEMAIL;TYPE=WORK:Avina@techneatsolutions.com\nURL:https://www.linkedin.com/in/avina-lloyd/\nNOTE:CFO at Techneat Info Solutions.\nEND:VCARD`,
  },
];

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function downloadVCard(card: CardData) {
  const blob = new Blob([card.vcardData], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Avina-Lloyd-${card.roleTag}.vcf`;
  a.click();
  URL.revokeObjectURL(url);
}

function shareCard(card: CardData) {
  if (navigator.share) {
    navigator.share({
      title: `${card.role} — Avina Lloyd`,
      text: `${card.bio}\n\nReach me: ${card.email}`,
      url: `${window.location.origin}${window.location.pathname}#cards`,
    });
  }
}

/* ─────────────────────────────────────────────
   Mobile Card Page — single-screen card layout
   Everything fits in one viewport. No scroll.
───────────────────────────────────────────── */
interface MobileCardPageProps {
  card: CardData;
  activeCard: number;
  onSwitchCard: (index: number) => void;
}

const MobileCardPage: React.FC<MobileCardPageProps> = ({ card, activeCard, onSwitchCard }) => {
  const [saved, setSaved] = useState(false);
  const [isBioExpanded, setIsBioExpanded] = useState(false);

  const handleSave = () => {
    downloadVCard(card);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const isGold = card.accentColor === '#b3884d';

  return (
    <div
      className="flex flex-col min-h-[100svh] px-3 pb-0 md:hidden"
      style={{
        background: '#f5f4f2',
      }}
    >
      {/* ── Main card ── */}
      <div
        className="rounded-none overflow-hidden flex flex-col flex-1 min-h-0"
        style={{
          background: '#ffffff',
          flex: 1,
        }}
      >
        {/* ── PORTRAIT — contain the transparent portrait so the full bust stays visible ── */}
        <div
          className="relative flex-shrink-0 flex justify-center overflow-hidden"
          style={{
            height: 'clamp(205px, 29svh, 260px)',
            background: card.id === 'triune'
              ? 'radial-gradient(circle, rgba(179,136,77,0.2) 1.5px, transparent 2px) 0 0 / 18px 18px, radial-gradient(ellipse at 78% 20%, rgba(179,136,77,0.2), transparent 42%), linear-gradient(145deg, #f5ebd9 0%, #fffaf1 52%, #e9dcc5 100%)'
              : 'radial-gradient(circle, rgba(20,115,165,0.2) 1.5px, transparent 2px) 0 0 / 18px 18px, radial-gradient(ellipse at 78% 20%, rgba(20,115,165,0.18), transparent 42%), linear-gradient(145deg, #e6f2f8 0%, #f8fcff 52%, #d5e8f2 100%)',
          }}
        >
          <img
            src={DIGITAL_CARD_PORTRAIT}
            alt="Avina Lloyd"
            className="h-full w-full object-contain object-bottom pt-3"
          />
        </div>

        {/* Raised identity panel overlaps the portrait without rounding the overall card. */}
        <div
          className="relative z-10 -mt-8 mx-4 flex flex-col items-center overflow-hidden border border-white/80 bg-white/65 px-4 pt-2 pb-2 backdrop-blur-2xl shadow-[0_10px_30px_rgba(20,19,18,0.12)] rounded-md"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.88), rgba(255,255,255,0.58))',
            boxShadow: '0 10px 30px rgba(20,19,18,0.12), inset 0 1px 0 rgba(255,255,255,0.95)',
          }}
        >
          <span aria-hidden="true" className="pointer-events-none absolute -top-8 left-1/4 h-16 w-32 rounded-full bg-white/70 blur-2xl" />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-10 right-0 h-20 w-24 rounded-full blur-2xl" style={{ background: `${card.accentColor}18` }} />
          <div
            className="relative z-10 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-[0_4px_12px_rgba(20,19,18,0.08)]"
          >
            <img src={card.logo} alt={card.company} className="h-7 w-7 object-contain" />
          </div>
          <div className="relative z-10 font-serif-luxury text-[22px] leading-none tracking-tight text-[#141312] mt-1.5">Avina Lloyd</div>
          <div className="relative z-10 font-body text-[12px] text-[#6d6963] mt-1">{card.role}</div>
          <a
            href={card.website}
            target="_blank"
            rel="noreferrer"
            className="relative z-10 font-body text-[12px] text-[#a19b93] italic underline underline-offset-2 mt-1"
          >
            {card.companyDisplayName} ↗
          </a>
          <span
            className="relative z-10 mt-2 font-mono-code text-[9px] uppercase tracking-[0.12em] font-bold px-3 py-1 rounded-full"
            style={{ background: card.badgeBg, color: card.badgeTextColor }}
          >
            {card.roleTag}
          </span>
        </div>

        {/* Company switcher pills sit inside the card body below the portrait. */}
        <div className="flex justify-center gap-2 px-4 pt-3">
          {CARDS.map((option, index) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onSwitchCard(index)}
              aria-label={`Switch to ${option.companyDisplayName} card`}
              aria-pressed={activeCard === index}
              className="min-w-[92px] rounded-full border px-4 py-2 font-mono-code text-[9px] font-bold uppercase tracking-wide transition-colors"
              style={{
                color: activeCard === index ? '#ffffff' : '#68645e',
                background: activeCard === index ? option.accentColor : '#ffffff',
                borderColor: activeCard === index ? option.accentColor : '#e6e2dd',
              }}
            >
              {option.companyDisplayName}
            </button>
          ))}
        </div>

        {/* ── BIO ── */}
        <div className="px-4 pt-3">
          <p
            className={`font-body text-[12px] text-[#55524e] leading-[1.45] ${isBioExpanded ? '' : 'line-clamp-3'}`}
          >
            {card.bio}
          </p>
          <button
            type="button"
            onClick={() => setIsBioExpanded((expanded) => !expanded)}
            className="mt-1 font-body text-[11px] font-semibold underline underline-offset-2"
            style={{ color: card.accentColor }}
            aria-expanded={isBioExpanded}
          >
            {isBioExpanded ? 'Show less' : 'Read more'}
          </button>
        </div>

        {/* ── DIVIDER ── */}
        <div className="mx-4 mt-2 border-t border-[#ede8e0]" />

        {/* ── CONTACT ROWS ── */}
        <div className="px-4 pt-2 flex flex-col gap-1.5">
          <a
            href={`mailto:${card.email}?subject=Executive%20Inquiry%20—%20Avina%20Lloyd`}
            className="flex items-center gap-2.5 active:opacity-70"
          >
            <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: '#f1c40f24' }}>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#d9a900" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l9 7 9-7M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-body text-[12.5px] text-[#141312]">{card.email}</span>
          </a>
          <a
            href={`https://wa.me/${card.whatsappNumber.replace(/\D/g, '')}?text=Hi%20Avina%2C%20I%20found%20your%20digital%20card%20and%20would%20like%20to%20connect.`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 active:opacity-70"
          >
            <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: '#22c55e16' }}>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span className="font-body text-[12.5px] text-[#141312]">{card.whatsappNumber}</span>
          </a>
        </div>

        {/* ── DIVIDER ── */}
        <div className="mx-4 mt-2 border-t border-[#ede8e0]" />

        {/* ── SOCIAL ROW ── */}
        <div className="px-4 pt-2 pb-0 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-body text-[12px] text-[#78746d]">Connect with me</span>
            {/* LinkedIn */}
            <a href={card.linkedinUrl} target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-full bg-[#f2f2f2] flex items-center justify-center active:scale-90 transition-transform">
              <svg className="w-3.5 h-3.5 text-[#0a66c2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <button
              onClick={() => shareCard(card)}
              aria-label="Share card"
              className="w-8 h-8 rounded-full flex items-center justify-center active:scale-90 transition-all"
              style={{ background: `${card.accentColor}16`, color: card.accentColor }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <span className="font-body text-[9px] text-[#8b867f]">Share card</span>
          </div>
        </div>

        {/* ── CTA BUTTONS — pinned at bottom ── */}
        <div className="px-4 pt-3 pb-5 flex items-center gap-2.5 mt-auto">
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-[#e8e5e1] bg-white font-body text-[12px] text-[#68645e] active:scale-[0.97] transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {saved
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
            </svg>
            {saved ? 'Saved' : 'Save Contact'}
          </button>
          <button
            onClick={() => { window.location.hash = ''; window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-body text-[12px] font-semibold active:scale-[0.97] transition-all"
            style={{
              background: `linear-gradient(135deg, ${card.accentColor} 0%, ${card.accentColor}cc 100%)`,
              color: isGold ? '#fff8ec' : 'white',
              boxShadow: `0 4px 18px ${card.accentColor}44`,
            }}
          >
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Full Business Card Component (desktop)
───────────────────────────────────────────── */
interface BusinessCardProps {
  card: CardData;
  isActive: boolean;
  activeCard: number;
  onSwitchCard: (index: number) => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ card, isActive, activeCard, onSwitchCard }) => {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    downloadVCard(card);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(card.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className={`transition-all duration-500 ${
        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute'
      }`}
    >
      <div
        className={`relative w-full max-w-[420px] mx-auto rounded-none overflow-hidden border-0 shadow-none bg-gradient-to-br ${card.accentBg}`}
        style={{ minHeight: 560 }}
      >
        {/* Top shimmer stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={{ background: `linear-gradient(90deg, ${card.accentColor}66, ${card.accentColor}, ${card.accentColor}66)` }}
        />

        <div className="relative z-10 px-7 pt-8 pb-7 flex flex-col gap-5">
          {/* Card Header — Company Logo */}
          <div className="flex justify-end">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/60 shadow-sm max-w-[160px] flex items-center justify-center">
              <img src={card.logo} alt={card.company} className="w-full h-auto max-h-8 object-contain" />
            </div>
          </div>

          {/* Portrait + Identity */}
          <div className="flex items-end gap-5">
            <div className="flex flex-shrink-0 flex-col items-center gap-1.5">
              <div
                className="w-24 h-24 overflow-hidden"
              >
                <img src={DIGITAL_CARD_PORTRAIT} alt="Avina Lloyd" className="w-full h-full object-contain object-bottom" />
              </div>
              <span
                className="font-mono-code text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold"
                style={{ background: card.badgeBg, color: card.badgeTextColor }}
              >
                {card.roleTag}
              </span>
            </div>

            <div className="flex-1 min-w-0 pb-1">
              <h2 className="font-serif-luxury text-[26px] leading-none text-[#141312] font-normal tracking-tight mb-1.5">
                Avina Lloyd
              </h2>
              <div
                className="font-mono-code text-[11px] uppercase tracking-widest font-semibold mb-1"
                style={{ color: card.accentColor }}
              >
                {card.role}
              </div>
              <a href={card.website} target="_blank" rel="noreferrer" className="font-body text-[13px] text-[#55524e] leading-snug underline underline-offset-2">
                {card.company}
              </a>
              <div className="font-mono-code text-[10px] text-[#78746d] leading-snug mt-0.5">{card.companySubtitle}</div>
            </div>
          </div>

          <div className="flex justify-center gap-2">
            {CARDS.map((option, index) => (
              <button
                key={option.id}
                type="button"
                onClick={() => onSwitchCard(index)}
                aria-label={`Switch to ${option.companyDisplayName} card`}
                aria-pressed={activeCard === index}
                className="rounded-full border px-4 py-2 font-mono-code text-[9px] font-bold uppercase tracking-wide transition-colors"
                style={{
                  color: activeCard === index ? '#ffffff' : '#68645e',
                  background: activeCard === index ? option.accentColor : '#ffffff',
                  borderColor: activeCard === index ? option.accentColor : '#e6e2dd',
                }}
              >
                {option.companyDisplayName}
              </button>
            ))}
          </div>

          {/* Tagline */}
          <div className="px-4 py-3 rounded-xl border-l-4 bg-white/50" style={{ borderColor: card.accentColor }}>
            <p className="font-body text-[14px] text-[#141312] leading-snug font-medium italic">
              "{card.tagline}"
            </p>
          </div>

          {/* Short Bio */}
          <p className="font-body text-[13px] text-[#55524e] leading-relaxed">{card.bio}</p>

          {/* Divider */}
          <div className="border-t border-[#cfc4c5]/40" />

          {/* Contact Actions */}
          <div>
            <span className="font-mono-code text-[10px] text-[#78746d] uppercase tracking-[0.22em] font-semibold block mb-3">
              Reach me through
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={`mailto:${card.email}?subject=Executive%20Inquiry%20%E2%80%94%20Avina%20Lloyd%20(${card.roleTag})`}
                className="flex items-center gap-2.5 px-4 py-3 bg-[#141312] text-[#c5a059] rounded-xl font-mono-code text-[11px] uppercase tracking-wider font-semibold hover:bg-[#22211e] active:scale-95 transition-all shadow-sm"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Email</span>
              </a>

              <a
                href={`https://wa.me/${card.whatsappNumber.replace(/\D/g, '')}?text=Hi%20Avina%2C%20I%20found%20your%20digital%20card%20and%20would%20like%20to%20connect.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-4 py-3 bg-[#22c55e] text-white rounded-xl font-mono-code text-[11px] uppercase tracking-wider font-semibold hover:bg-[#16a34a] active:scale-95 transition-all shadow-sm"
              >
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>WhatsApp</span>
              </a>

              <a
                href={card.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-4 py-3 bg-[#0a66c2] text-white rounded-xl font-mono-code text-[11px] uppercase tracking-wider font-semibold hover:bg-[#085fad] active:scale-95 transition-all shadow-sm"
              >
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              <button
                onClick={handleSave}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl font-mono-code text-[11px] uppercase tracking-wider font-semibold active:scale-95 transition-all shadow-sm border"
                style={{
                  background: saved ? '#22c55e' : 'white',
                  color: saved ? 'white' : card.accentColor,
                  borderColor: saved ? '#22c55e' : card.accentColor + '50',
                }}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {saved ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  )}
                </svg>
                <span>{saved ? 'Saved!' : 'Save Contact'}</span>
              </button>
            </div>

            <button
              onClick={handleCopyEmail}
              className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#cfc4c5]/50 bg-white/60 hover:bg-white transition-all"
            >
              <span className="font-mono-code text-[11px] text-[#55524e]">{card.email}</span>
              <span
                className="font-mono-code text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ background: copied ? '#22c55e20' : card.accentColor + '15', color: copied ? '#16a34a' : card.accentColor }}
              >
                {copied ? '✓ Copied' : 'Copy'}
              </span>
            </button>
          </div>
        </div>

        {/* Bottom brand watermark */}
        <div className="relative z-10 px-7 py-3 border-t border-[#cfc4c5]/25 flex items-center justify-between">
          <span className="font-mono-code text-[9px] text-[#78746d] uppercase tracking-widest">
            Digital Business Card
          </span>
          <button
            onClick={() => shareCard(card)}
            className="font-mono-code text-[9px] uppercase tracking-wider flex items-center gap-1 hover:opacity-70 transition-opacity"
            style={{ color: card.accentColor }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share Card
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Export
   • Mobile (<768px)  → MobileCardPage (full card view)
   • Desktop (≥768px) → Full DigitalCardsView
───────────────────────────────────────────── */
export const DigitalCardsView: React.FC = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Compact card is part of the normal site flow on mobile. A resize to desktop
  // immediately switches to the full cards page.
  if (isMobile) {
    return (
      <div>
        <MobileCardPage
          card={CARDS[activeCard]}
          activeCard={activeCard}
          onSwitchCard={setActiveCard}
        />
      </div>
    );
  }

  // Full cards page on desktop
  return (
    <div className="pt-8 md:pt-12 pb-12 md:pb-16 animate-fadeIn">
      <div className="max-w-[640px] mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b3884d]" />
            <span className="font-mono-code text-[11px] text-[#b3884d] uppercase tracking-[0.25em] font-semibold">
              Digital Business Cards
            </span>
          </div>
          <h1 className="font-serif-luxury text-[32px] sm:text-[40px] text-[#141312] font-normal leading-tight tracking-tight mb-3">
            Avina Lloyd
          </h1>
          <p className="font-body text-[15px] text-[#55524e] leading-relaxed max-w-sm mx-auto">
            Tap a card below to switch between business identities, then use the actions to connect.
          </p>
        </div>

        {/* Cards Carousel */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-[420px]" style={{ minHeight: 620 }}>
            {CARDS.map((card, i) => (
              <div
                key={card.id}
                className={`transition-all duration-500 ${
                  activeCard === i
                    ? 'relative opacity-100 translate-y-0'
                    : 'absolute inset-0 opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <BusinessCard
                  card={card}
                  isActive={activeCard === i}
                  activeCard={activeCard}
                  onSwitchCard={setActiveCard}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {CARDS.map((card, i) => (
            <button
              key={card.id}
              onClick={() => setActiveCard(i)}
              className="transition-all duration-300"
              aria-label={`View ${card.company} card`}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  activeCard === i ? 'w-6 h-2' : 'w-2 h-2'
                }`}
                style={{ background: activeCard === i ? card.accentColor : '#cfc4c5' }}
              />
            </button>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => { window.location.hash = ''; window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="px-6 py-3 rounded-xl bg-[#141312] text-[#c5a059] font-mono-code text-[10px] uppercase tracking-widest font-semibold hover:bg-[#22211e] transition-colors"
          >
            Back to Home
          </button>
        </div>

        {/* Bottom Note */}
        <div className="mt-10 p-5 bg-[#f4f0ea]/60 rounded-2xl border border-[#cfc4c5]/30 text-center">
          <span className="font-mono-code text-[10px] text-[#78746d] uppercase tracking-widest block mb-1.5 font-semibold">
            ◆ Advisory Availability
          </span>
          <p className="font-body text-[13px] text-[#55524e] leading-relaxed">
            Open for board advisory, executive partnerships, COO mandates, and cross-border trade initiatives.
          </p>
          <a
            href="mailto:avina.lloyd@triunebusiness.com?subject=Executive%20Inquiry%20%E2%80%94%20Avina%20Lloyd"
            className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-[#141312] text-[#c5a059] font-mono-code text-[11px] uppercase tracking-widest rounded-xl hover:bg-[#22211e] active:scale-95 transition-all font-semibold shadow-sm"
          >
            <span>Email Avina Lloyd</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};
