import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Heart, 
  Music, 
  Mail, 
  Volume2, 
  VolumeX,
  Compass,
  ChevronDown
} from "lucide-react";
import { InvitationData } from "../types";

interface InvitationCardProps {
  key?: string;
  data: InvitationData;
  onOpenRSVP: () => void;
  onOpenDedication: () => void;
}

export default function InvitationCard({ data, onOpenRSVP, onOpenDedication }: InvitationCardProps) {
  // Audio state for background instrumental song
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // State for Maps dropdown selector
  const [showMapsDropdown, setShowMapsDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize romantic background music
  useEffect(() => {
    // Elegant wedding instrumental piano (Canon in D piano melody)
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.35;

    // Close dropdown on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowMapsDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Audio playback delayed until user interaction:", err));
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-[#FAF6F0] pb-24 pt-8 px-4 select-none overflow-x-hidden">
      
      {/* Background Frame Borders simulating premium cotton paper card */}
      <div className="absolute inset-2 md:inset-4 border border-[#c5a880]/30 rounded-xl pointer-events-none z-0" />
      <div className="absolute inset-3 md:inset-6 border border-[#c5a880]/15 rounded-lg pointer-events-none z-0" />

      {/* Floating Music and Admin control overlay at top right corner */}
      <div className="fixed top-4 left-4 z-40 flex items-center gap-2">
        <button 
          onClick={toggleMusic}
          className={`p-2.5 rounded-full flex items-center justify-center border transition-all cursor-pointer shadow-md active:scale-95 ${
            isMusicPlaying 
              ? "bg-[#c5a880] text-white border-[#c5a880]" 
              : "bg-white/80 backdrop-blur-md text-[#8c8275] border-[#c5a880]/30 hover:border-[#c5a880]"
          }`}
          title={isMusicPlaying ? "Silenciar música" : "Escuchar melodía"}
        >
          {isMusicPlaying ? (
            <Volume2 className="w-4 h-4 animate-bounce" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>
        {isMusicPlaying && (
          <span className="text-[10px] font-medium text-[#a98d63] tracking-widest uppercase bg-white/70 px-2 py-1 rounded-md border border-[#c5a880]/20 backdrop-blur-xs animate-pulse">
            Escuchando Melodía 🎶
          </span>
        )}
      </div>

      {/* Main card representation (faithful replica of the JC & Lady card) */}
      <div className="relative w-full max-w-[620px] bg-[#FAF7F2] text-[#2c2823] p-6 sm:p-10 md:p-12 rounded-2xl shadow-[0_20px_50px_rgba(197,168,128,0.25)] border-2 border-[#c5a880]/30 overflow-hidden z-10 my-4">
        
        {/* Double gold foil thin lines surrounding inside of paper */}
        <div className="absolute inset-3 border border-[#c5a880]/30 rounded-lg pointer-events-none" />
        <div className="absolute inset-4 border border-[#c5a880]/10 rounded-md pointer-events-none" />

        {/* Vintage elegant floral ornaments in corners (SVG drawings mimicking attached image's peachy roses) */}
        {/* Top-Left Rose corner */}
        <div className="absolute top-0 left-0 w-44 h-44 pointer-events-none opacity-85 select-none z-10">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Soft cream-peach gradients for petals */}
            <defs>
              <radialGradient id="rose-grad-1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff8f0" />
                <stop offset="60%" stopColor="#f7e9d7" />
                <stop offset="100%" stopColor="#e3caaa" />
              </radialGradient>
              <linearGradient id="leaf-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d2bf9f" />
                <stop offset="100%" stopColor="#968363" />
              </linearGradient>
            </defs>
            {/* Golden Leaves */}
            <path d="M30 75 C 60 70, 80 50, 95 25 C 80 50, 60 70, 30 75 Z" fill="url(#leaf-grad-1)" opacity="0.5" />
            <path d="M75 30 C 70 60, 50 80, 25 95 C 50 80, 70 60, 75 30 Z" fill="url(#leaf-grad-1)" opacity="0.5" />
            <path d="M90 90 C 120 70, 110 40, 75 55 C 110 40, 120 70, 90 90 Z" fill="url(#leaf-grad-1)" opacity="0.4" />
            
            {/* Main Rose petals circle structure */}
            <circle cx="45" cy="45" r="32" fill="url(#rose-grad-1)" stroke="#c5a880" strokeWidth="0.6" />
            <circle cx="45" cy="45" r="24" fill="url(#rose-grad-1)" stroke="#c5a880" strokeWidth="0.5" />
            <circle cx="45" cy="45" r="16" fill="url(#rose-grad-1)" stroke="#c5a880" strokeWidth="0.4" />
            <path d="M 45 25 C 40 33, 50 33, 45 40 M 32 45 C 40 40, 40 50, 45 45" stroke="#a98d63" strokeWidth="0.5" fill="none" />
            
            {/* Smaller secondary rose */}
            <circle cx="95" cy="30" r="18" fill="url(#rose-grad-1)" stroke="#c5a880" strokeWidth="0.5" />
            <circle cx="30" cy="95" r="18" fill="url(#rose-grad-1)" stroke="#c5a880" strokeWidth="0.5" />
            
            {/* Elegant luxury vines */}
            <path d="M10 10 Q 110 15 155 75" stroke="#c5a880" strokeWidth="0.75" fill="none" />
            <path d="M10 10 Q 15 110 75 155" stroke="#c5a880" strokeWidth="0.75" fill="none" />
            <circle cx="120" cy="45" r="2" fill="#c5a880" />
            <circle cx="45" cy="120" r="2" fill="#c5a880" />
            <circle cx="135" cy="58" r="1.5" fill="#c5a880" />
            <circle cx="58" cy="135" r="1.5" fill="#c5a880" />
          </svg>
        </div>

        {/* Bottom-Right Rose corner */}
        <div className="absolute bottom-0 right-0 w-44 h-44 pointer-events-none opacity-85 select-none z-10 transform rotate-180">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M30 75 C 60 70, 80 50, 95 25 C 80 50, 60 70, 30 75 Z" fill="url(#leaf-grad-1)" opacity="0.5" />
            <path d="M75 30 C 70 60, 50 80, 25 95 C 50 80, 70 60, 75 30 Z" fill="url(#leaf-grad-1)" opacity="0.5" />
            <path d="M90 90 C 120 70, 110 40, 75 55 C 110 40, 120 70, 90 90 Z" fill="url(#leaf-grad-1)" opacity="0.4" />
            
            <circle cx="45" cy="45" r="32" fill="url(#rose-grad-1)" stroke="#c5a880" strokeWidth="0.6" />
            <circle cx="45" cy="45" r="24" fill="url(#rose-grad-1)" stroke="#c5a880" strokeWidth="0.5" />
            <circle cx="45" cy="45" r="16" fill="url(#rose-grad-1)" stroke="#c5a880" strokeWidth="0.4" />
            <path d="M 45 25 C 40 33, 50 33, 45 40 M 32 45 C 40 40, 40 50, 45 45" stroke="#a98d63" strokeWidth="0.5" fill="none" />
            
            <circle cx="95" cy="30" r="18" fill="url(#rose-grad-1)" stroke="#c5a880" strokeWidth="0.5" />
            <circle cx="30" cy="95" r="18" fill="url(#rose-grad-1)" stroke="#c5a880" strokeWidth="0.5" />
            
            <path d="M10 10 Q 110 15 155 75" stroke="#c5a880" strokeWidth="0.75" fill="none" />
            <path d="M10 10 Q 15 110 75 155" stroke="#c5a880" strokeWidth="0.75" fill="none" />
          </svg>
        </div>

        {/* Outer Fine Gold Corners Accent */}
        <div className="absolute top-5 left-5 w-8 h-8 border-t border-l border-[#c5a880]/60 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-5 right-5 w-8 h-8 border-t border-r border-[#c5a880]/60 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-5 left-5 w-8 h-8 border-b border-l border-[#c5a880]/60 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-5 right-5 w-8 h-8 border-b border-r border-[#c5a880]/60 rounded-br-sm pointer-events-none" />

        {/* Content Centered Stack */}
        <div className="flex flex-col items-center">
          
          {/* Header Monogram / Registry Crest Emblem precisely as in original image */}
          <div className="flex flex-col items-center mb-5 mt-2">
            <svg width="105" height="105" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Curved text path: "REGISTRO CIVIL" */}
              <path id="curve" d="M 20 60 A 40 40 0 0 1 100 60" fill="none" />
              <text className="font-serif text-[7.5px] uppercase tracking-[0.23em]" fill="#a98d63" fontWeight="bold">
                <textPath href="#curve" startOffset="50%" textAnchor="middle">
                  REGISTRO CIVIL
                </textPath>
              </text>

              {/* Double circles */}
              <circle cx="60" cy="60" r="44" stroke="#c5a880" strokeWidth="1.2" />
              <circle cx="60" cy="60" r="40" stroke="#c5a880" strokeWidth="0.5" strokeDasharray="2 2" />
              
              {/* Laurel wreath below the temple */}
              <path d="M32 72 Q42 90 60 90 Q78 90 88 72" stroke="#c5a880" strokeWidth="0.8" fill="none" />
              {/* Leaves on wreath */}
              <path d="M38 78 C36 82, 42 82, 44 80 M48 83 Q54 86 58 84 M72 84 Q66 86 62 83 M82 78 C84 82, 78 82, 76 80" stroke="#c5a880" strokeWidth="0.8" />

              {/* Small heart at bottom of crest */}
              <path d="M60 92 C59.5 90, 57 88, 60 86 C63 88, 60.5 90, 60 92 Z" fill="#c5a880" />

              {/* Registry Temple Building */}
              <rect x="44" y="48" width="32" height="3" fill="#c5a880" />
              <polygon points="60,36 40,48 80,48" fill="#c5a880" />
              {/* Pillars */}
              <rect x="46" y="51" width="3" height="16" fill="#c5a880" />
              <rect x="52" y="51" width="3" height="16" fill="#c5a880" />
              <rect x="65" y="51" width="3" height="16" fill="#c5a880" />
              <rect x="71" y="51" width="3" height="16" fill="#c5a880" />
              
              {/* Couple with child in the middle */}
              <circle cx="57" cy="55" r="2" fill="#c5a880" />
              <path d="M55 58 C55 57, 59 57, 59 58 L58 64 L56 64 Z" fill="#c5a880" />
              
              <circle cx="63" cy="56" r="1.8" fill="#c5a880" />
              <path d="M61 59 C61 58, 65 58, 65 59 L64 64 L62 64 Z" fill="#c5a880" />

              {/* Open book at the base */}
              <path d="M48 68 Q60 66 60 69 Q60 66 72 68 L70 71 Q60 69 60 72 Q60 69 50 71 Z" fill="#c5a880" />
            </svg>
          </div>

          {/* Subheading: "CON LA BENDICIÓN DE NUESTROS HIJOS," */}
          <span className="font-serif text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#a98d63] font-semibold text-center max-w-[90%] mb-3">
            CON LA BENDICIÓN DE NUESTROS HIJOS,
          </span>

          {/* Intro description */}
          <p className="font-serif text-xs md:text-sm text-[#8c8275] leading-relaxed text-center max-w-[440px] px-2 mb-6 italic">
            Tenemos el honor de invitarte a compartir con nosotros uno de los días más importantes de nuestras vidas.
          </p>

          {/* THE HERO HERO NAMES: JC & Lady */}
          <div className="flex flex-col items-center my-6">
            <h1 className="font-serif italic font-light text-7xl md:text-8xl text-[#c5a880] tracking-wide select-none filter drop-shadow-[0_2px_4px_rgba(197,168,128,0.15)] leading-none">
              {data.groomName}
            </h1>
            <span className="font-script text-4xl text-[#a98d63] my-1 font-light">&</span>
            <h1 className="font-serif italic font-light text-7xl md:text-8xl text-[#c5a880] tracking-wide select-none filter drop-shadow-[0_2px_4px_rgba(197,168,128,0.15)] leading-none">
              {data.brideName}
            </h1>
          </div>

          {/* Joint Statement */}
          <p className="font-serif text-xs md:text-sm text-[#8c8275] leading-relaxed text-center max-w-[460px] px-4 mb-8">
            Nos uniremos en matrimonio y nos encantaría contar con tu presencia en esta celebración tan especial.
          </p>

          {/* TWO COLUMNS OF CEREMONY & RECEPTION split by vertical line */}
          <div className="w-full border-t border-b border-[#c5a880]/30 py-8 my-4 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            
            {/* Splitter vertical center line with heart */}
            <div className="hidden md:block absolute top-0 bottom-0 left-[50%] -translate-x-[50%] w-[1px] bg-[#c5a880]/30" />
            <div className="hidden md:flex absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-6 h-6 rounded-full bg-[#FAF7F2] items-center justify-center border border-[#c5a880]/30 z-10">
              <Heart className="w-3 h-3 text-[#c5a880] fill-[#c5a880]" />
            </div>

            {/* Column 1: Ceremonia */}
            <div className="flex flex-col items-center text-center px-4">
              {/* Custom SVG Two Rings */}
              <div className="w-12 h-12 flex items-center justify-center mb-3">
                <svg width="42" height="32" viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="18" r="12" stroke="#c5a880" strokeWidth="2" />
                  <circle cx="16" cy="18" r="10" stroke="#c5a880" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
                  <circle cx="26" cy="14" r="12" stroke="#c5a880" strokeWidth="2" />
                  <circle cx="26" cy="14" r="10" stroke="#c5a880" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
                  <path d="M26 2 L28 4 L26 6 L24 4 Z" fill="#c5a880" /> {/* Small sparkling diamond */}
                  <circle cx="16" cy="18" r="2" fill="#c5a880" className="animate-pulse" />
                </svg>
              </div>
              <h3 className="font-serif text-sm tracking-[0.2em] font-bold text-[#c5a880] uppercase mb-4">
                CEREMONIA
              </h3>
              
              <div className="space-y-2.5 text-xs text-[#2c2823]">
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#a98d63]" />
                  <span className="font-medium">Fecha: 04 / 09 / 2026</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#a98d63]" />
                  <span className="font-medium">Hora: 11:30 AM</span>
                </div>
                <div className="flex items-start justify-center gap-2 max-w-[220px] mx-auto text-[#8c8275]">
                  <MapPin className="w-3.5 h-3.5 text-[#a98d63] shrink-0 mt-0.5" />
                  <span className="text-center font-serif font-bold text-[11px] text-[#2c2823]">
                    Lugar: REGISTRO CIVIL <span className="block font-medium text-[#8c8275] mt-0.5">(CHONE)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2: Recepción */}
            <div className="flex flex-col items-center text-center px-4">
              {/* Custom SVG Clinking Glasses */}
              <div className="w-12 h-12 flex items-center justify-center mb-3">
                <svg width="42" height="36" viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Left Glass */}
                  <path d="M14 26 L18 26 L16 32 M12 32 L20 32" stroke="#c5a880" strokeWidth="1.5" />
                  <path d="M12 10 L18 10 L20 22 C20 25, 12 25, 12 22 Z" fill="#c5a880" fillOpacity="0.15" stroke="#c5a880" strokeWidth="1.5" />
                  <line x1="14" y1="14" x2="18" y2="14" stroke="#c5a880" strokeWidth="1" />
                  {/* Right Glass */}
                  <path d="M28 26 L24 26 L26 32 M30 32 L22 32" stroke="#c5a880" strokeWidth="1.5" />
                  <path d="M30 10 L24 10 L22 22 C22 25, 30 25, 30 22 Z" fill="#c5a880" fillOpacity="0.15" stroke="#c5a880" strokeWidth="1.5" />
                  <line x1="28" y1="14" x2="24" y2="14" stroke="#c5a880" strokeWidth="1" />
                  {/* Sparks */}
                  <circle cx="21" cy="5" r="1.5" fill="#c5a880" />
                  <path d="M21 7 L21 11 M19 9 L23 9" stroke="#c5a880" strokeWidth="0.8" />
                </svg>
              </div>
              <h3 className="font-serif text-sm tracking-[0.2em] font-bold text-[#c5a880] uppercase mb-4">
                RECEPCIÓN
              </h3>

              <div className="space-y-2.5 text-xs text-[#2c2823]">
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#a98d63]" />
                  <span className="font-medium">Fecha: 05 / 09 / 2026</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#a98d63]" />
                  <span className="font-medium">Hora: 19:00 PM</span>
                </div>
                <div className="flex items-start justify-center gap-2 max-w-[240px] mx-auto text-[#8c8275]">
                  <MapPin className="w-3.5 h-3.5 text-[#a98d63] shrink-0 mt-0.5" />
                  <span className="text-center font-serif font-bold text-[11px] text-[#2c2823] uppercase">
                    Lugar: &ldquo;MANU FORTI&rdquo; <span className="block font-medium text-[#8c8275] lowercase mt-0.5 text-[10px]">EVENTOS Y RECEPCIONES</span>
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* TWO COLUMNS OF FOOTER: BANK ACCOUNT & REGALO SOBRES */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-4 border-t border-[#c5a880]/15">
            
            {/* Left Box: Número de Cuenta */}
            <div className="p-4 rounded-xl border border-[#c5a880]/15 bg-[#efece6]/20 flex flex-col justify-between text-left">
              <div>
                <span className="font-serif text-[11px] uppercase tracking-[0.15em] font-bold text-[#c5a880] block mb-2">
                  🏦 NÚMERO DE CUENTA
                </span>
                <p className="text-[10px] text-[#8c8275] leading-relaxed mb-4">
                  Si deseas apoyarnos con un obsequio, lo puedes hacer a través de la siguiente cuenta bancaria:
                </p>
                <div className="space-y-1.5 text-xs text-[#2c2823] bg-white p-3 rounded-lg border border-[#c5a880]/10 font-sans shadow-2xs">
                  <p><span className="font-semibold text-[#8c8275]">Banco:</span> Banco Pichincha</p>
                  <p><span className="font-semibold text-[#8c8275]">Titular:</span> Lady Valencia Solorzano</p>
                  <p className="flex items-center justify-between"><span className="font-semibold text-[#8c8275]">Número:</span> <span className="font-mono font-bold text-xs tracking-wider select-all">2200691056</span></p>
                </div>
              </div>
            </div>

            {/* Right Box: Tu Presencia es Nuestro Mejor Regalo */}
            <div className="p-4 rounded-xl border border-[#c5a880]/20 bg-[#FAF7F2] relative flex flex-col justify-between text-center items-center">
              {/* Thin double border simulating the boxed text inside original invitation */}
              <div className="absolute inset-1.5 border border-[#c5a880]/15 rounded-lg pointer-events-none" />
              
              <div className="py-2.5 px-2">
                <Heart className="w-4 h-4 text-red-400 fill-red-400 mx-auto mb-2" />
                <span className="font-serif text-[11px] uppercase tracking-[0.12em] font-bold text-[#a98d63] block mb-2 leading-tight">
                  TU PRESENCIA ES NUESTRO MEJOR REGALO
                </span>
                <p className="text-[10.5px] text-[#8c8275] leading-relaxed max-w-[220px] mx-auto mb-3">
                  Si deseas tener un detalle con nosotros, puedes hacerlo a través de sobres anónimos.
                </p>
                
                {/* Micro envelope icon */}
                <div className="w-7 h-7 rounded-full bg-[#c5a880]/10 text-[#c5a880] flex items-center justify-center mx-auto">
                  <Mail className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

          </div>

          {/* Sincere footnote sentence */}
          <div className="mt-10 text-center space-y-1 z-10">
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#a98d63] font-bold">
              ¡GRACIAS POR SER PARTE DE NUESTRA HISTORIA!
            </p>
            <p className="font-serif italic text-xs text-[#8c8275]">Con mucho cariño,</p>
            <p className="font-script text-3xl text-[#c5a880] tracking-wider mt-1">{data.groomName} & {data.brideName}</p>
          </div>

        </div>
      </div>

      {/* THREE ACTION BUTTONS: CONFIRMAR, CÓMO LLEGAR (SELECTOR), DEDICATORIA */}
      <div className="relative w-full max-w-[580px] mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 px-4 z-30">
        
        {/* Button 1: RSVP */}
        <button
          id="btn-rsvp"
          onClick={onOpenRSVP}
          className="flex-1 px-5 py-4 rounded-full bg-[#c5a880] text-white hover:bg-[#a98d63] active:scale-95 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-[0_10px_20px_rgba(197,168,128,0.25)] flex items-center justify-center gap-2 cursor-pointer border border-transparent"
        >
          <Heart className="w-3.5 h-3.5 fill-white" /> Confirmar Asistencia
        </button>

        {/* Button 2: Cómo llegar (Dynamic Dropdown for the two locations) */}
        <div ref={dropdownRef} className="flex-1 relative">
          <button
            onClick={() => setShowMapsDropdown(!showMapsDropdown)}
            className="w-full px-5 py-4 rounded-full bg-[#2c2823] text-white hover:bg-[#3d3831] active:scale-95 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-[0_8px_16px_rgba(44,40,35,0.15)] flex items-center justify-center gap-2 cursor-pointer border border-transparent"
          >
            <Compass className="w-3.5 h-3.5" /> Cómo llegar <ChevronDown className={`w-3 h-3 transition-transform ${showMapsDropdown ? "rotate-180" : ""}`} />
          </button>

          {/* Elegant Dropdown Card */}
          <AnimatePresence>
            {showMapsDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: -8, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full left-0 right-0 bg-white rounded-xl shadow-2xl border border-[#c5a880]/30 p-2 z-50 flex flex-col gap-1 text-left min-w-[220px]"
              >
                <div className="px-3 py-1.5 border-b border-[#c5a880]/10 mb-1">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-[#a98d63] block">Selecciona Ubicación</span>
                </div>
                <a
                  href={data.ceremony.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setShowMapsDropdown(false)}
                  className="px-3 py-2 rounded-lg hover:bg-[#efece6]/40 text-xs text-[#2c2823] flex items-center gap-2 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#c5a880]" /> 
                  <div>
                    <span className="font-semibold block text-[11px]">1. Ceremonia (Registro Civil)</span>
                    <span className="text-[10px] text-[#8c8275] block">Viernes, 04 Sept</span>
                  </div>
                </a>
                <a
                  href={data.banquet.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setShowMapsDropdown(false)}
                  className="px-3 py-2 rounded-lg hover:bg-[#efece6]/40 text-xs text-[#2c2823] flex items-center gap-2 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                  <div>
                    <span className="font-semibold block text-[11px]">2. Recepción (Manu Forti)</span>
                    <span className="text-[10px] text-[#8c8275] block">Sábado, 05 Sept</span>
                  </div>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Button 3: Dedication Message */}
        <button
          id="btn-dedication"
          onClick={onOpenDedication}
          className="flex-1 px-5 py-4 rounded-full bg-white text-[#2c2823] hover:bg-[#efece6]/20 active:scale-95 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-[0_4px_15px_rgba(44,40,35,0.06)] flex items-center justify-center gap-2 cursor-pointer border border-[#c5a880]"
        >
          ✍️ Dejar Dedicatoria
        </button>

      </div>
    </div>
  );
}
