import { GeoPoint } from '../common';
import { BusinessApprovalStatus } from './business-approval-status';

/**
 * Categoria merceologica dell'Attivita Locale, mappata dagli esempi del
 * Deliverable D1 (ristorante, museo, agriturismo, rifugio).
 */
export enum BusinessType {
  RESTAURANT = 'restaurant',
  MUSEUM = 'museum',
  FARM_STAY = 'farm_stay',
  MOUNTAIN_HUT = 'mountain_hut',
  OTHER = 'other',
}

/**
 * Stato del ciclo di vita di un'offerta. Coerente con il soft-delete del
 * resto del sistema: un'offerta archiviata non e' piu' visibile ai
 * giocatori ma resta a fini storici.
 */
export enum OfferStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

/**
 * Profilo di un'Attivita Locale (utente con ruolo business).
 *
 * Estende i campi base dell'utente con i dati aziendali e lo stato di
 * approvazione dell'affiliazione.
 */
export interface Business {
  id: string;
  email: string;
  role: 'business';
  businessName: string;
  businessType: BusinessType;
  address: string;
  position: GeoPoint;
  approvalStatus: BusinessApprovalStatus;
  createdAt: string;
}

/**
 * Offerta pubblicata da un'Attivita Locale.
 *
 * Il campo pointsCost rappresenta il costo in punti per il riscatto da
 * parte del giocatore. Il flusso di riscatto vero e proprio (scansione
 * del QR personale del giocatore e scalo dei punti) e' previsto come
 * sviluppo futuro: qui l'offerta espone gia' il costo per predisporlo.
 */
export interface Offer {
  id: string;
  businessId: string;
  title: string;
  description: string;
  pointsCost: number;
  status: OfferStatus;
  createdAt: string;
}

/**
 * Vista di un'offerta arricchita con i dati dell'attivita che la pubblica,
 * usata lato giocatore per mostrare l'offerta con il nome dell'esercizio.
 */
export interface OfferWithBusiness extends Offer {
  businessName: string;
  businessType: BusinessType;
  businessAddress: string;
  businessPosition: GeoPoint;
}

/**
 * Payload di registrazione di una nuova Attivita Locale (RF28).
 * Crea un account con ruolo business in stato PENDING.
 */
export interface RegisterBusinessRequest {
  email: string;
  password: string;
  businessName: string;
  businessType: BusinessType;
  address: string;
  position: GeoPoint;
}

/**
 * Payload di aggiornamento del profilo aziendale.
 */
export interface UpdateBusinessProfileRequest {
  businessName?: string;
  businessType?: BusinessType;
  address?: string;
  position?: GeoPoint;
}

/**
 * Payload di creazione di un'offerta (RF29).
 */
export interface CreateOfferRequest {
  title: string;
  description: string;
  pointsCost: number;
}

/**
 * Payload di aggiornamento di un'offerta.
 */
export interface UpdateOfferRequest {
  title?: string;
  description?: string;
  pointsCost?: number;
}

/**
 * Filtri per la lista delle affiliazioni lato admin.
 */
export interface ListBusinessesQuery {
  approvalStatus?: BusinessApprovalStatus;
  limit?: number;
  offset?: number;
}

/**
 * Response paginata per la lista delle attivita lato admin.
 */
export interface ListBusinessesResponse {
  data: Business[];
  total: number;
  limit: number;
  offset: number;
}

/**
 * Payload per il rifiuto di un'affiliazione, con motivazione opzionale.
 */
export interface RejectBusinessRequest {
  reason?: string;
}
