/**
 * Tipi di dominio comuni condivisi tra tutti i moduli del sistema.
 *
 * Questo modulo contiene definizioni trasversali utilizzate da più
 * componenti del backend e dei frontend (mobile-app, backoffice).
 */

/**
 * Ruoli supportati dal sistema.
 * Mappa la gerarchia di Utente nel Deliverable D2:
 * - player: Giocatore
 * - admin: Amministratore
 * - business: Attivita Locale
 * - maintenance: Operatore Manutenzione
 */
export enum UserRole {
  PLAYER = 'player',
  ADMIN = 'admin',
  BUSINESS = 'business',
  MAINTENANCE = 'maintenance',
}

/**
 * Coordinate geografiche puntuali nel sistema WGS84.
 * Utilizzate per posizioni di quest, attivita locali, check-in giocatore.
 */
export interface GeoPoint {
  lat: number;
  lng: number;
}

/**
 * Hyperlinks ad altre risorse correlate (connectedness REST).
 * Pattern HATEOAS leggero applicato alle response API.
 */
export interface Links {
  [rel: string]: {
    href: string;
  };
}

/**
 * Formato standard di errore restituito dall'API.
 * Tutti gli endpoint che falliscono ritornano una response conforme
 * a questa struttura, con il codice applicativo e un messaggio
 * leggibile dall'utente.
 */
export interface ErrorResponse {
  code: string;
  message: string;
  details?: unknown;
}

/**
 * Metadata standard per le response paginate.
 * Indica il totale di elementi disponibili e i parametri di paginazione
 * applicati alla query corrente.
 */
export interface PaginatedMeta {
  total: number;
  limit: number;
  offset: number;
}

/**
 * Wrapper standard per le response paginate.
 * Espone i dati richiesti e la metadata di paginazione associata.
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginatedMeta;
}
