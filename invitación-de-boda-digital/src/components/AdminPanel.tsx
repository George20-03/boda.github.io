import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  X, 
  Users, 
  Heart, 
  Bus, 
  Utensils, 
  Trash2, 
  Download, 
  Copy, 
  Check, 
  Search, 
  Lock,
  Calendar
} from "lucide-react";
import { RSVP, Dedication } from "../types";

interface AdminPanelProps {
  onClose: () => void;
  rsvps: RSVP[];
  dedications: Dedication[];
  onDeleteRSVP: (id: string) => void;
  onDeleteDedication: (id: string) => void;
}

export default function AdminPanel({ 
  onClose, 
  rsvps, 
  dedications, 
  onDeleteRSVP, 
  onDeleteDedication 
}: AdminPanelProps) {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"rsvps" | "dedications">("rsvps");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedText, setCopiedText] = useState(false);

  // Authentication logic (Simple PIN 1234)
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234") {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Código PIN incorrecto. Inténtalo de nuevo.");
      setPin("");
    }
  };

  // Calculations for RSVPs
  const confirmedRSVPs = rsvps.filter(r => r.confirmed);
  const declinedRSVPs = rsvps.filter(r => !r.confirmed);

  const totalAdults = confirmedRSVPs.reduce((sum, r) => sum + r.adultsCount, 0);
  const totalKids = confirmedRSVPs.reduce((sum, r) => sum + r.kidsCount, 0);
  const totalGuests = totalAdults + totalKids;

  const totalBusSeats = confirmedRSVPs.reduce((sum, r) => sum + (r.needsBus ? r.adultsCount + r.kidsCount : 0), 0);

  // Menu types tally
  const menuBreakdown = confirmedRSVPs.reduce((acc, r) => {
    const key = r.menuType || "Estándar";
    const total = r.adultsCount + r.kidsCount;
    acc[key] = (acc[key] || 0) + total;
    return acc;
  }, {} as Record<string, number>);

  // Filtering list based on search query
  const filteredRSVPs = rsvps.filter(r => 
    r.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.comments && r.comments.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredDedications = dedications.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Export to CSV helper
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Nombre,Asiste,Adultos,Ninos,Menu,Autobus,Comentarios,Fecha\n";
    
    rsvps.forEach(r => {
      const row = [
        `"${r.guestName.replace(/"/g, '""')}"`,
        r.confirmed ? "SI" : "NO",
        r.adultsCount,
        r.kidsCount,
        `"${r.menuType}"`,
        r.needsBus ? "SI" : "NO",
        `"${(r.comments || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
        new Date(r.date).toLocaleDateString()
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Boda_Invitaciones_Respuestas_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy raw summary text
  const handleCopySummary = () => {
    let summary = `📋 RESUMEN DE INVITADOS (BODA SOFÍA & ALEJANDRO)\n`;
    summary += `-----------------------------------------------\n`;
    summary += `✅ Total Confirmados: ${totalGuests} personas (${totalAdults} adultos, ${totalKids} niños)\n`;
    summary += `❌ No Asistirán: ${declinedRSVPs.length} respuestas\n`;
    summary += `🚌 Autobús de Traslado: ${totalBusSeats} plazas necesitadas\n\n`;
    summary += `🍽️ TIPOS DE MENÚS CONFIRMADOS:\n`;
    Object.entries(menuBreakdown).forEach(([menu, count]) => {
      summary += ` - ${menu}: ${count} cubiertos\n`;
    });
    summary += `\n👤 LISTADO GENERAL DE RESPUESTAS:\n`;
    rsvps.forEach((r, idx) => {
      summary += `${idx + 1}. ${r.guestName} - ${r.confirmed ? `SI (${r.adultsCount + r.kidsCount}p)` : "NO"}${r.needsBus ? " (Bus)" : ""}\n`;
    });

    navigator.clipboard.writeText(summary);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-[#2c2823]/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#FAF7F2] rounded-2xl w-full max-w-[850px] h-[85vh] overflow-hidden shadow-2xl border-2 border-[#c5a880]/40 flex flex-col"
      >
        
        {/* Top bar header */}
        <div className="bg-[#FAF7F2] px-6 py-4 border-b-2 border-[#c5a880]/30 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#c5a880]/15 text-[#a98d63] flex items-center justify-center border border-[#c5a880]/30">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-[10px] uppercase tracking-[0.15em] text-[#a98d63] block font-bold">Exclusivo Novios</span>
              <h3 className="font-serif text-base font-bold text-[#2c2823] tracking-wide">Panel de Administración</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#efece6]/60 text-[#8c8275] hover:text-[#2c2823] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AUTHENTICATION GATE */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-sm mx-auto">
            <Lock className="w-12 h-12 text-[#c5a880] mb-4" />
            <h4 className="font-serif text-lg font-bold text-[#2c2823] mb-2">Panel Protegido</h4>
            <p className="text-xs text-[#8c8275] mb-6 leading-relaxed">
              Introduce el código de seguridad para acceder a los datos privados de asistencia y dedicatorias de tus invitados.
            </p>
            
            <form onSubmit={handleAuthSubmit} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  required
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Introduce PIN (Ej. 1234)"
                  className="w-full px-4 py-3 rounded-xl border border-[#c5a880]/30 bg-white text-center text-lg tracking-widest text-[#2c2823] focus:outline-hidden focus:ring-1 focus:ring-[#c5a880] focus:border-[#c5a880] placeholder-xs font-semibold"
                />
                {errorMsg && (
                  <p className="text-[11px] text-red-500 font-semibold mt-1.5">{errorMsg}</p>
                )}
              </div>
              <p className="text-[10px] text-[#8c8275] italic">Sugerencia para testeo: el PIN de seguridad es <span className="font-mono font-bold bg-[#efece6] px-1 py-0.5 rounded text-[#2c2823]">1234</span></p>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#c5a880] text-white hover:bg-[#a98d63] font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md active:scale-95"
              >
                Acceder al Panel
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN CONTENT */
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            
            {/* Statistics Widgets Summary Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 bg-[#efece6]/30 border-b border-[#c5a880]/15 shrink-0">
              <div className="bg-white p-3 rounded-xl border border-[#c5a880]/15 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#c5a880]/10 text-[#c5a880] flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8c8275] block">Confirmados</span>
                  <span className="text-lg font-bold text-[#2c2823]">{totalGuests} <span className="text-[10px] font-normal text-[#8c8275]">({totalAdults}A / {totalKids}N)</span></span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#c5a880]/15 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#2c2823]/5 text-[#2c2823] flex items-center justify-center shrink-0">
                  <X className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8c8275] block">Rechazados</span>
                  <span className="text-lg font-bold text-[#2c2823]">{declinedRSVPs.length} <span className="text-[10px] font-normal text-[#8c8275]">respuestas</span></span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#c5a880]/15 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#c5a880]/10 text-[#a98d63] flex items-center justify-center shrink-0 border border-[#c5a880]/20">
                  <Bus className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8c8275] block">Plazas Bus</span>
                  <span className="text-lg font-bold text-[#2c2823]">{totalBusSeats} <span className="text-[10px] font-normal text-[#8c8275]">plazas</span></span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-[#c5a880]/15 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#c5a880]/10 text-[#a98d63] flex items-center justify-center shrink-0 border border-[#c5a880]/20">
                  <Utensils className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="text-[10px] uppercase font-bold text-[#8c8275] block">Dietas Especiales</span>
                  <span className="text-xs font-bold text-[#2c2823] truncate block">
                    {Object.entries(menuBreakdown)
                      .filter(([k]) => k !== "Estándar")
                      .map(([k, v]) => `${k}:${v}`)
                      .join(", ") || "Ninguna"}
                  </span>
                </div>
              </div>
            </div>

            {/* Filter and Action Bar */}
            <div className="px-6 py-3 border-b border-[#c5a880]/15 bg-[#FAF7F2] flex flex-col sm:flex-row gap-3 justify-between items-center shrink-0">
              {/* Tab Selector */}
              <div className="flex gap-2 p-1 bg-[#efece6] rounded-xl self-start sm:self-auto shrink-0">
                <button
                  onClick={() => setActiveTab("rsvps")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "rsvps"
                      ? "bg-[#c5a880] text-white shadow-xs"
                      : "text-[#8c8275] hover:text-[#2c2823]"
                  }`}
                >
                  Asistencias ({rsvps.length})
                </button>
                <button
                  onClick={() => setActiveTab("dedications")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "dedications"
                      ? "bg-[#c5a880] text-white shadow-xs"
                      : "text-[#8c8275] hover:text-[#2c2823]"
                  }`}
                >
                  Libro Firmas ({dedications.length})
                </button>
              </div>

              {/* Live search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-[#8c8275] absolute left-3 top-[50%] -translate-y-[50%] pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar invitado..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-[#c5a880]/30 bg-[#efece6]/20 text-xs text-[#2c2823] placeholder-[#8c8275]/50 focus:outline-hidden focus:ring-1 focus:ring-[#c5a880] transition-all"
                />
              </div>

              {/* Command Action Buttons */}
              {activeTab === "rsvps" && (
                <div className="flex gap-2 w-full sm:w-auto self-end sm:self-auto shrink-0">
                  <button
                    onClick={handleCopySummary}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#c5a880] text-xs font-bold text-[#a98d63] hover:bg-[#efece6] transition-all cursor-pointer"
                    title="Copiar resumen para WhatsApp"
                  >
                    {copiedText ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" /> Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copiar Resumen
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleExportCSV}
                    disabled={rsvps.length === 0}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#c5a880] text-white text-xs font-bold hover:bg-[#a98d63] disabled:opacity-50 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Descargar CSV
                  </button>
                </div>
              )}
            </div>

            {/* Main content body lists */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#FAF7F2]">
              {activeTab === "rsvps" ? (
                /* RSVPs LIST / TABLE */
                filteredRSVPs.length === 0 ? (
                  <div className="text-center py-12 text-[#8c8275]">
                    <Users className="w-8 h-8 text-[#c5a880]/40 mx-auto mb-2" />
                    <p className="text-sm font-semibold">No se encontraron confirmaciones.</p>
                    <p className="text-xs mt-1">Los datos aparecerán tan pronto como los invitados respondan la invitación.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Render table-like cards for beautiful mobile and desktop support */}
                    {filteredRSVPs.map((rsvp) => (
                      <div 
                        key={rsvp.id} 
                        className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs transition-all ${
                          rsvp.confirmed 
                            ? "bg-[#efece6]/30 border-[#c5a880]/30" 
                            : "bg-[#2c2823]/5 border-dashed border-[#2c2823]/15 opacity-70"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                              rsvp.confirmed 
                                ? "bg-[#c5a880]/15 text-[#a98d63] border-[#c5a880]/25" 
                                : "bg-[#2c2823]/10 text-[#8c8275] border-[#2c2823]/20"
                            }`}>
                              {rsvp.confirmed ? "Asistirá" : "No Asistirá"}
                            </span>
                            <span className="font-serif font-bold text-sm text-[#2c2823]">{rsvp.guestName}</span>
                          </div>
                          
                          {rsvp.confirmed && (
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#8c8275] items-center pt-0.5">
                              <span className="font-medium text-[#2c2823]">
                                Personas: {rsvp.adultsCount + rsvp.kidsCount} ({rsvp.adultsCount}A / {rsvp.kidsCount}N)
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Utensils className="w-3.5 h-3.5 text-[#c5a880]" /> Menú: {rsvp.menuType}
                              </span>
                              <span className="flex items-center gap-1">
                                <Bus className="w-3.5 h-3.5 text-blue-500" /> Autobús: {rsvp.needsBus ? "Sí" : "No"}
                              </span>
                            </div>
                          )}

                          {rsvp.comments && (
                            <p className="text-xs italic text-[#8c8275] bg-white border border-[#c5a880]/10 p-2 rounded-lg mt-1 max-w-[550px] leading-relaxed">
                              &ldquo;{rsvp.comments}&rdquo;
                            </p>
                          )}
                        </div>

                        {/* Action buttons on item */}
                        <div className="flex items-center justify-end border-t sm:border-t-0 pt-2 sm:pt-0 gap-2 shrink-0">
                          <span className="text-[10px] text-[#8c8275] flex items-center gap-1 mr-2">
                            <Calendar className="w-3 h-3" /> {new Date(rsvp.date).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => {
                              if (confirm(`¿Estás seguro de que deseas eliminar la respuesta de ${rsvp.guestName}?`)) {
                                onDeleteRSVP(rsvp.id);
                              }
                            }}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Eliminar respuesta"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* DEDICATIONS LIST */
                filteredDedications.length === 0 ? (
                  <div className="text-center py-12 text-[#8c8275]">
                    <Heart className="w-8 h-8 text-[#c5a880]/40 mx-auto mb-2" />
                    <p className="text-sm font-semibold">No se encontraron dedicatorias de firmas.</p>
                    <p className="text-xs mt-1">Los invitados podrán escribir bonitos deseos una vez abran la invitación.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredDedications.map((dec) => (
                      <div 
                        key={dec.id} 
                        className="bg-white p-4 rounded-xl border border-[#c5a880]/20 shadow-xs flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5">
                            <Heart className="w-4 h-4 fill-[#c5a880] text-[#c5a880]" />
                            <span className="font-serif font-bold text-sm text-[#2c2823]">{dec.name}</span>
                          </div>
                          <p className="text-xs text-[#8c8275] italic leading-relaxed bg-[#efece6]/20 p-3 rounded-lg border border-[#c5a880]/10">
                            &ldquo;{dec.message}&rdquo;
                          </p>
                        </div>

                        <div className="flex justify-between items-center border-t border-[#c5a880]/10 pt-2 shrink-0">
                          <span className="text-[10px] text-[#8c8275] flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {new Date(dec.date).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => {
                              if (confirm(`¿Estás seguro de que deseas eliminar esta dedicatoria de ${dec.name}?`)) {
                                onDeleteDedication(dec.id);
                              }
                            }}
                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Eliminar dedicatoria"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>

          </div>
        )}

      </motion.div>
    </div>
  );
}
