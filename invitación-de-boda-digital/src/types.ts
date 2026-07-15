/**
 * Types and interfaces for the interactive wedding invitation.
 */

export interface RSVP {
  id: string;
  guestName: string;
  confirmed: boolean;
  adultsCount: number;
  kidsCount: number;
  menuType: string;
  needsBus: boolean;
  comments?: string;
  date: string;
}

export interface Dedication {
  id: string;
  name: string;
  message: string;
  date: string;
}

export interface InvitationData {
  brideName: string;
  groomName: string;
  date: string; // e.g. "Sábado, 12 de Octubre de 2026"
  time: string; // e.g. "17:00 h"
  parentsBride: {
    father: string;
    mother: string;
  };
  parentsGroom: {
    father: string;
    mother: string;
  };
  ceremony: {
    place: string;
    address: string;
    time: string;
    mapsUrl: string;
  };
  banquet: {
    place: string;
    address: string;
    time: string;
    mapsUrl: string;
  };
  dressCode: string; // e.g. "Etiqueta / Formal"
  whatsappNumber: string; // Phone number for RSVP updates (e.g. "+34600112233")
}
