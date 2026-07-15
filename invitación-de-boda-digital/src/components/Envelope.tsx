import { useState } from "react";
import { motion } from "motion/react";
import { MailOpen } from "lucide-react";

interface EnvelopeProps {
  key?: string;
  onOpenComplete: () => void;
  brideName: string;
  groomName: string;
}

export default function Envelope({ onOpenComplete, brideName, groomName }: EnvelopeProps) {
  const [isOpenTriggered, setIsOpenTriggered] = useState(false);
  const [isFlapOpened, setIsFlapOpened] = useState(false);
  const [isCardEmerging, setIsCardEmerging] = useState(false);

  const handleOpen = () => {
    if (isOpenTriggered) return;
    setIsOpenTriggered(true);

    // Sequence of opening animation:
    // 1. Open the top flap (starts immediately, takes 1s)
    setTimeout(() => {
      setIsFlapOpened(true);
    }, 400);

    // 2. Slide card up (starts after flap is open)
    setTimeout(() => {
      setIsCardEmerging(true);
    }, 1400);

    // 3. Complete transition and show full interactive card
    setTimeout(() => {
      onOpenComplete();
    }, 2800);
  };

  // Get first letters of bride & groom
  const initialBride = brideName.charAt(0);
  const initialGroom = groomName.charAt(0);

  return (
    <div id="envelope-wrapper" className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-[#FAF6F0] overflow-hidden select-none">
      {/* Elegance Frame */}
      <div className="absolute inset-4 md:inset-8 border border-[#c5a880]/30 rounded-xl pointer-events-none z-0" />
      <div className="absolute inset-5 md:inset-10 border border-[#c5a880]/15 rounded-lg pointer-events-none z-0" />

      {/* Decorative Top Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center mb-10 z-10"
      >
        <span className="font-serif tracking-[0.25em] text-xs uppercase text-[#a98d63] block mb-2">Nuestra Invitación</span>
        <h1 className="font-luxury text-5xl md:text-6xl text-[#2c2823] mt-2 mb-1">{brideName} & {groomName}</h1>
        <p className="font-serif text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#8c8275] mt-1">Estás cordialmente invitado</p>
      </motion.div>

      {/* 3D Envelope Stage */}
      <div className="relative w-full max-w-[420px] aspect-[4/3] flex items-center justify-center z-10" style={{ perspective: "1200px" }}>
        
        {/* Shadow under the floating envelope */}
        <motion.div
          animate={{
            scale: isOpenTriggered ? 0.95 : [0.95, 1.05, 0.95],
            opacity: isOpenTriggered ? 0.3 : [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-4 left-10 right-10 h-6 bg-[#2c2823]/10 rounded-[50%] blur-md z-0"
        />

        {/* Outer Envelope Container with soft floating action */}
        <motion.div
          animate={isOpenTriggered ? {
            y: [0, -10, 20],
            scale: [1, 1.02, 0.9],
            opacity: [1, 1, 0],
          } : {
            y: [0, -8, 0],
          }}
          transition={isOpenTriggered ? {
            duration: 2.8,
            times: [0, 0.4, 1],
            ease: "easeInOut",
          } : {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onClick={handleOpen}
          className="relative w-full h-full bg-[#efece6] rounded-lg shadow-2xl border border-[#c5a880]/20 cursor-pointer overflow-visible flex items-center justify-center"
        >
          {/* Inner envelope liner (revealed when flap opens) */}
          <div className="absolute inset-0 bg-[#d8d3c9] rounded-lg overflow-hidden z-1">
            {/* Elegant luxury diagonal gold stripes inside envelope */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,#c5a880_25%,transparent_25%,transparent_50%,#c5a880_50%,#c5a880_75%,transparent_75%,transparent)]" style={{ backgroundSize: "30px 30px" }} />
          </div>

          {/* THE LETTER CARD (emerging upward) */}
          <motion.div
            initial={{ y: 0, scale: 0.93, opacity: 1 }}
            animate={isCardEmerging ? {
              y: -180,
              scale: 1.05,
              rotate: -2,
              boxShadow: "0 20px 40px rgba(44,40,35,0.15)",
            } : { y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-4 bottom-4 left-4 right-4 bg-[#fbfaf7] rounded-md border-2 border-[#c5a880]/30 p-6 flex flex-col justify-between z-2 shadow-inner"
          >
            {/* Card contents seen slightly */}
            <div className="border border-[#c5a880]/15 rounded h-full flex flex-col items-center justify-center p-2 text-center pointer-events-none">
              <div className="w-8 h-[1px] bg-[#c5a880]/40 mb-3" />
              <p className="font-luxury text-3xl text-[#c5a880]">{initialBride}{initialGroom}</p>
              <div className="w-8 h-[1px] bg-[#c5a880]/40 mt-3" />
            </div>
          </motion.div>

          {/* FRONT BODY OF ENVELOPE (covers the card bottom half) */}
          {/* Designed as left and right flaps folding in, plus a bottom pocket */}
          <div className="absolute inset-0 z-3 pointer-events-none overflow-hidden rounded-lg">
            {/* Bottom triangular pocket flap */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[60%] bg-[#eae4d9] border-t border-[#c5a880]/20 shadow-[-5px_-5px_15px_rgba(44,40,35,0.03)]"
              style={{
                clipPath: "polygon(0 100%, 100% 100%, 50% 25%)"
              }}
            />
            {/* Left side triangle */}
            <div 
              className="absolute top-0 bottom-0 left-0 w-[55%] bg-[#efeae0]"
              style={{
                clipPath: "polygon(0 0, 0 100%, 100% 50%)"
              }}
            />
            {/* Right side triangle */}
            <div 
              className="absolute top-0 bottom-0 right-0 w-[55%] bg-[#efeae0] shadow-[5px_-5px_15px_rgba(44,40,35,0.03)]"
              style={{
                clipPath: "polygon(100% 0, 100% 100%, 0 50%)"
              }}
            />
            {/* Subtle shadow overlay to give 3D depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2c2823]/5 via-transparent to-[#2c2823]/3 opacity-30" />
          </div>

          {/* ENVELOPE FLAP (Top flap) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={isOpenTriggered ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute top-0 left-0 right-0 h-[50%] bg-[#ebdcc9] border-b border-[#c5a880]/10 origin-top shadow-[0_10px_15px_rgba(44,40,35,0.08)]"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              zIndex: isFlapOpened ? 1 : 4,
              backfaceVisibility: "hidden",
            }}
          />

          {/* WAX SEAL (Holds the flap) */}
          <motion.div
            animate={isOpenTriggered ? {
              scale: [1, 1.2, 0],
              opacity: [1, 1, 0],
              rotate: [0, -15, 30],
            } : {
              scale: [1, 1.04, 1],
            }}
            transition={isOpenTriggered ? {
              duration: 0.8,
              ease: "easeInOut",
            } : {
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[48%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] via-[#c5a880] to-[#aa8335] shadow-[0_8px_20px_rgba(197,168,128,0.4)] flex items-center justify-center border border-[#fbfaf7]/40 z-5 cursor-pointer select-none active:scale-95 transition-all duration-150"
          >
            {/* Intricate golden pattern ring inside seal */}
            <div className="absolute inset-1.5 rounded-full border border-[#fbfaf7]/20 flex items-center justify-center bg-[#c5a880] bg-opacity-10 backdrop-blur-xs">
              <span className="font-luxury text-3xl text-[#fbfaf7] tracking-widest drop-shadow-[0_2px_2px_rgba(44,40,35,0.4)]">
                {initialBride}&{initialGroom}
              </span>
            </div>
            {/* Small gold ribbon hanging out */}
            <div className="absolute top-[90%] left-[30%] w-2 h-6 bg-[#a98d63] rounded-b-sm border-r border-[#8c7a5f]/40 shadow-sm transform -rotate-12 pointer-events-none" />
            <div className="absolute top-[90%] left-[55%] w-2.5 h-5 bg-[#c5a880] rounded-b-sm border-r border-[#8c7a5f]/40 shadow-sm transform rotate-12 pointer-events-none" />
          </motion.div>

        </motion.div>
      </div>

      {/* Guide Helper Action Call */}
      <motion.div
        animate={isOpenTriggered ? { opacity: 0, y: 15 } : { opacity: [0.7, 1, 0.7] }}
        transition={isOpenTriggered ? { duration: 0.5 } : { duration: 2, repeat: Infinity }}
        className="mt-12 text-center z-10 cursor-pointer flex flex-col items-center gap-2"
        onClick={handleOpen}
      >
        <MailOpen className="w-6 h-6 text-[#c5a880] animate-bounce" />
        <span className="font-serif tracking-[0.2em] text-xs uppercase text-[#a98d63] transition-colors duration-300 hover:text-[#2c2823]">
          Pulsa para abrir tu invitación
        </span>
      </motion.div>
    </div>
  );
}
