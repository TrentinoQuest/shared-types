export * from './social';

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
 * Misurazione GPS con metadati di qualita'.
 *
 * Estende GeoPoint aggiungendo le informazioni necessarie alla
 * validazione lato server di un fix GPS: la precisione del fix e
 * il momento in cui e' stato acquisito dal client.
 *
 * Utilizzato come metadato accessorio nelle richieste di check-in
 * (UC-30) e scansione QR (UC-22) per permettere al backend di
 * rifiutare misurazioni inaffidabili:
 *
 *  - accuracy troppo alta: il fix e' troppo impreciso per
 *    affermare con onesta' che il giocatore si trova nel raggio
 *    di validazione di una quest (tipicamente 5-20 metri).
 *  - clientTimestamp troppo vecchio: il fix risale a troppo
 *    tempo fa, il giocatore potrebbe essersi spostato o si
 *    tratta di un tentativo di replay attack.
 *
 * Le soglie di accettazione sono configurate via env nel backend
 * (GEO_MAX_ACCURACY_METERS, GEO_MAX_FIX_AGE_SECONDS).
 */
export interface GeoFix extends GeoPoint {
  /**
   * Raggio di incertezza orizzontale in metri, a 1 sigma
   * (68% di confidenza). Valori tipici: 5-20m outdoor con cielo
   * libero, 50-200m indoor o in valle stretta.
   */
  accuracy: number;

  /**
   * Timestamp di acquisizione del fix sul client, in millisecondi
   * dall'epoch Unix (compatibile con Date.now()).
   * Il backend lo confronta con il proprio orologio per rifiutare
   * fix troppo vecchi.
   */
  clientTimestamp: number;
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
