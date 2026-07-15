import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Lock } from "lucide-react";
import Envelope from "./components/Envelope";
import InvitationCard from "./components/InvitationCard";
import RSVPModal from "./components/RSVPModal";
import DedicationModal from "./components/DedicationModal";
import AdminPanel from "./components/AdminPanel";
import { WEDDING_DATA } from "./data";
import { RSVP, Dedication } from "./types";

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [dedications, setDedications] = useState<Dedication[]>([]);
  
  // Modals visibility state
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [isDedicationOpen, setIsDedicationOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load persistent local data on mount
  useEffect(() => {
    const savedRSVPs = localStorage.getItem("wedding_rsvps");
    if (savedRSVPs) {
      try {
        setRsvps(JSON.parse(savedRSVPs));
      } catch (err) {
        console.error("Error parsing local RSVPs:", err);
      }
    }

    const savedDedications = localStorage.getItem("wedding_dedications");
    if (savedDedications) {
      try {
        setDedications(JSON.parse(savedDedications));
      } catch (err) {
        console.error("Error parsing local dedications:", err);
      }
    }
  }, []);

  // Save actions
  const handleSaveRSVP = (newRsvp: RSVP) => {
    const updated = [newRsvp, ...rsvps];
    setRsvps(updated);
    localStorage.setItem("wedding_rsvps", JSON.stringify(updated));
  };

  const handleSaveDedication = (newDedication: Dedication) => {
    const updated = [newDedication, ...dedications];
    setDedications(updated);
    localStorage.setItem("wedding_dedications", JSON.stringify(updated));
  };

  // Delete actions for Admin Panel
  const handleDeleteRSVP = (id: string) => {
    const updated = rsvps.filter(r => r.id !== id);
    setRsvps(updated);
    localStorage.setItem("wedding_rsvps", JSON.stringify(updated));
  };

  const handleDeleteDedication = (id: string) => {
    const updated = dedications.filter(d => d.id !== id);
    setDedications(updated);
    localStorage.setItem("wedding_dedications", JSON.stringify(updated));
  };

  return (
    <div id="main-app" className="relative min-h-screen bg-[#fbfaf7] text-[#2c2823] font-sans antialiased select-none">
      
      {/* Universal Hidden Secret Admin Access Key */}
      <button 
        onClick={() => setIsAdminOpen(true)}
        className="fixed top-4 right-4 z-40 p-2.5 rounded-full bg-white/40 hover:bg-white/95 text-[#c5a880] hover:text-[#2c2823] transition-all border border-[#c5a880]/20 hover:border-[#c5a880] cursor-pointer shadow-xs active:scale-95"
        title="Panel de Control (Novios) - PIN: 1234"
      >
        <Lock className="w-4 h-4" />
      </button>

      {/* Main View Router/Toggle with AnimatePresence */}
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <Envelope 
            key="envelope-stage"
            brideName={WEDDING_DATA.brideName}
            groomName={WEDDING_DATA.groomName}
            onOpenComplete={() => setIsOpened(true)}
          />
        ) : (
          <InvitationCard 
            key="invitation-stage"
            data={WEDDING_DATA}
            onOpenRSVP={() => setIsRSVPOpen(true)}
            onOpenDedication={() => setIsDedicationOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* MODALS */}
      <AnimatePresence>
        {isRSVPOpen && (
          <RSVPModal 
            onClose={() => setIsRSVPOpen(false)}
            whatsappNumber={WEDDING_DATA.whatsappNumber}
            onSaveRSVP={handleSaveRSVP}
          />
        )}

        {isDedicationOpen && (
          <DedicationModal 
            onClose={() => setIsDedicationOpen(false)}
            onSaveDedication={handleSaveDedication}
          />
        )}

        {isAdminOpen && (
          <AdminPanel 
            onClose={() => setIsAdminOpen(false)}
            rsvps={rsvps}
            dedications={dedications}
            onDeleteRSVP={handleDeleteRSVP}
            onDeleteDedication={handleDeleteDedication}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
