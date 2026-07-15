import React, { useState } from "react";
import { motion } from "motion/react";
import { X, Check, MessageSquare, Plus, Minus } from "lucide-react";
import { RSVP } from "../types";

interface RSVPModalProps {
  onClose: () => void;
  whatsappNumber: string;
  onSaveRSVP: (rsvp: RSVP) => void;
}

export default function RSVPModal({ onClose, whatsappNumber, onSaveRSVP }: RSVPModalProps) {
  const [guestName, setGuestName] = useState("");
  const [confirmed, setConfirmed] = useState<boolean>(true);
  const [adultsCount, setAdultsCount] = useState(1);
  const [kidsCount, setKidsCount] = useState(0);
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      alert("Por favor, introduce tu nombre completo.");
      return;
    }

    setIsSubmitting(true);

    const newRsvp: RSVP = {
      id: Math.random().toString(36).substr(2, 9),
      guestName,
      confirmed,
      adultsCount: confirmed ? adultsCount : 0,
      kidsCount: confirmed ? kidsCount : 0,
      menuType: "Estándar",
      needsBus: false,
      comments: comments.trim() ? comments : undefined,
      date: new Date().toISOString(),
    };

    // Save locally
    onSaveRSVP(newRsvp);

    // Format WhatsApp message
    const formattedPhone = whatsappNumber.replace(/\+/g, "").replace(/\s/g, "");
    
    let messageText = `¡Hola! 👋 Confirmación de asistencia para vuestra Boda 💍\n\n`;
    messageText += `*Nombre:* ${guestName}\n`;
    messageText += `*Estado:* ${confirmed ? "✅ SÍ asistiré" : "❌ No podré asistir"}\n`;
    
    if (confirmed) {
      messageText += `*Adultos:* ${adultsCount}\n`;
      if (kidsCount > 0) messageText += `*Niños:* ${kidsCount}\n`;
    }

    if (comments.trim()) {
      messageText += `*Observaciones/Alergias:* ${comments}\n`;
    }

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(messageText)}`;

    // Show success, then trigger redirect
    setTimeout(() => {
      setSuccessMessage(true);
      setIsSubmitting(false);

      // Open WhatsApp
      window.open(whatsappUrl, "_blank");
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-[#2c2823]/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-[#FAF7F2] rounded-2xl w-full max-w-[500px] overflow-hidden shadow-2xl border-2 border-[#c5a880]/40 relative flex flex-col max-h-[90vh]"
      >
        {/* Header decoration with thin double border look resembling the card */}
        <div className="bg-[#FAF7F2] py-5 px-6 border-b-2 border-[#c5a880]/30 flex justify-between items-center shrink-0">
          <div>
            <span className="font-serif text-[10px] uppercase tracking-[0.15em] text-[#a98d63] block font-bold">Confirmación</span>
            <h3 className="font-serif text-lg font-bold text-[#2c2823] tracking-wide">Confirmar Asistencia</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#efece6]/60 text-[#8c8275] hover:text-[#2c2823] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content scroll container */}
        <div className="overflow-y-auto p-6 flex-1">
          {successMessage ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8 flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#c5a880]/20 text-[#c5a880] flex items-center justify-center mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#2c2823] mb-2">¡Asistencia Guardada!</h4>
              <p className="text-sm text-[#8c8275] mb-6 leading-relaxed">
                Hemos registrado tu confirmación de forma privada en el libro de firmas del evento. Ahora te redirigiremos a WhatsApp para enviar el mensaje de confirmación directa a los novios.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#c5a880] text-white text-xs uppercase font-bold tracking-widest hover:bg-[#a98d63] transition-all cursor-pointer shadow-md"
              >
                Cerrar Ventana
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name field */}
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#a98d63] mb-1.5">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Ej. Juan Carlos Pérez y Familia"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c5a880]/30 bg-white text-[#2c2823] placeholder-[#8c8275]/50 text-sm focus:outline-hidden focus:ring-1 focus:ring-[#c5a880] focus:border-[#c5a880] transition-all"
                />
              </div>

              {/* Attendance toggle */}
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#a98d63] mb-2">
                  ¿Podrás asistir?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConfirmed(true)}
                    className={`py-3 px-4 rounded-xl border text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      confirmed
                        ? "bg-[#c5a880] text-white border-transparent shadow-md"
                        : "bg-white text-[#8c8275] border-[#c5a880]/30 hover:bg-[#efece6]/30"
                    }`}
                  >
                    <Check className="w-4 h-4" /> Sí, asistiré
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmed(false)}
                    className={`py-3 px-4 rounded-xl border text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      !confirmed
                        ? "bg-[#2c2823] text-white border-transparent shadow-md"
                        : "bg-white text-[#8c8275] border-[#c5a880]/30 hover:bg-[#efece6]/30"
                    }`}
                  >
                    <X className="w-4 h-4" /> No podré asistir
                  </button>
                </div>
              </div>

              {confirmed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4 pt-1"
                >
                  {/* Headcount selector */}
                  <div className="bg-[#efece6]/30 border border-[#c5a880]/20 p-4 rounded-xl space-y-3">
                    <span className="block text-xs uppercase font-bold tracking-wider text-[#a98d63] mb-1">
                      Número de Asistentes
                    </span>
                    
                    <div className="flex justify-between items-center py-1">
                      <span className="text-xs font-semibold text-[#2c2823]">Adultos</span>
                      <div className="flex items-center gap-3 bg-white border border-[#c5a880]/30 rounded-lg p-1.5">
                        <button
                          type="button"
                          onClick={() => setAdultsCount(prev => Math.max(1, prev - 1))}
                          className="w-6 h-6 rounded-md hover:bg-[#efece6] flex items-center justify-center text-[#8c8275] cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-semibold text-xs min-w-4 text-center">{adultsCount}</span>
                        <button
                          type="button"
                          onClick={() => setAdultsCount(prev => prev + 1)}
                          className="w-6 h-6 rounded-md hover:bg-[#efece6] flex items-center justify-center text-[#8c8275] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-1 border-t border-[#c5a880]/10">
                      <span className="text-xs font-semibold text-[#2c2823]">Niños</span>
                      <div className="flex items-center gap-3 bg-white border border-[#c5a880]/30 rounded-lg p-1.5">
                        <button
                          type="button"
                          onClick={() => setKidsCount(prev => Math.max(0, prev - 1))}
                          className="w-6 h-6 rounded-md hover:bg-[#efece6] flex items-center justify-center text-[#8c8275] cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-semibold text-xs min-w-4 text-center">{kidsCount}</span>
                        <button
                          type="button"
                          onClick={() => setKidsCount(prev => prev + 1)}
                          className="w-6 h-6 rounded-md hover:bg-[#efece6] flex items-center justify-center text-[#8c8275] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Special dietary requirements or messages */}
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#a98d63] mb-1.5 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" /> Mensaje, Alergias u Observaciones
                </label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Ej. Intolerancia a los frutos secos, necesito silla de ruedas, ¡muchas felicidades chicos!..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c5a880]/30 bg-white text-[#2c2823] placeholder-[#8c8275]/50 text-sm focus:outline-hidden focus:ring-1 focus:ring-[#c5a880] focus:border-[#c5a880] transition-all resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="pt-2 border-t border-[#c5a880]/15 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-[#c5a880]/30 text-xs font-bold text-[#8c8275] uppercase tracking-wider hover:bg-[#efece6] transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-full bg-[#c5a880] text-white hover:bg-[#a98d63] disabled:bg-[#d8d3c9] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-md"
                >
                  {isSubmitting ? "Guardando..." : "Confirmar y Enviar"}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
