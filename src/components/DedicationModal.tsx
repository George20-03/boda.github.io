import React, { useState } from "react";
import { motion } from "motion/react";
import { X, Check, Heart, MessageSquare } from "lucide-react";
import { Dedication } from "../types";

interface DedicationModalProps {
  onClose: () => void;
  onSaveDedication: (dedication: Dedication) => void;
}

export default function DedicationModal({ onClose, onSaveDedication }: DedicationModalProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      alert("Por favor, rellena todos los campos.");
      return;
    }

    setIsSubmitting(true);

    const newDedication: Dedication = {
      id: Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toISOString()
    };

    // Simulate saving delay
    setTimeout(() => {
      onSaveDedication(newDedication);
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-[#2c2823]/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-[#FAF7F2] rounded-2xl w-full max-w-[480px] overflow-hidden shadow-2xl border-2 border-[#c5a880]/40 relative flex flex-col"
      >
        {/* Header Decoration with gold boundary line */}
        <div className="bg-[#FAF7F2] py-5 px-6 border-b-2 border-[#c5a880]/30 flex justify-between items-center">
          <div>
            <span className="font-serif text-[10px] uppercase tracking-[0.15em] text-[#a98d63] block font-bold">Libro de Firmas</span>
            <h3 className="font-serif text-lg font-bold text-[#2c2823] tracking-wide">Dejar una Dedicatoria</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#efece6]/60 text-[#8c8275] hover:text-[#2c2823] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {showSuccess ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-6 flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#c5a880]/15 text-[#a98d63] flex items-center justify-center mb-4 border border-[#c5a880]/30">
                <Heart className="w-8 h-8 fill-[#a98d63] text-[#a98d63]" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#2c2823] mb-2">¡Muchas Gracias!</h4>
              <p className="text-sm text-[#8c8275] mb-6 leading-relaxed">
                Vuestra dedicatoria ha sido guardada en nuestro buzón privado con mucho cariño. Vuestras palabras significan muchísimo para nosotros en esta nueva etapa.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#c5a880] text-white text-xs uppercase font-bold tracking-widest hover:bg-[#a98d63] transition-all cursor-pointer shadow-md"
              >
                Volver a la Invitación
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#a98d63] mb-1.5">
                  Tu Nombre
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Familia Martínez o Juan y Elena"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c5a880]/30 bg-white text-[#2c2823] placeholder-[#8c8275]/50 text-sm focus:outline-hidden focus:ring-1 focus:ring-[#c5a880] focus:border-[#c5a880] transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#a98d63] mb-1.5 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" /> Mensaje de Felicitación / Dedicatoria
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe vuestros mejores deseos para los novios..."
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#c5a880]/30 bg-white text-[#2c2823] placeholder-[#8c8275]/50 text-sm focus:outline-hidden focus:ring-1 focus:ring-[#c5a880] focus:border-[#c5a880] transition-all resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="pt-2 border-t border-[#c5a880]/15 flex items-center justify-end gap-3">
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
                  className="px-6 py-2.5 rounded-full bg-[#c5a880] text-white hover:bg-[#a98d63] disabled:bg-[#d8d3c9] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
                >
                  <Heart className="w-3.5 h-3.5" /> {isSubmitting ? "Enviando..." : "Enviar Dedicatoria"}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
