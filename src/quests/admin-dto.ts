import { GeoPoint } from '../common';
import { QuestType, QuestStatus, AnyQuest } from './quests';

/**
 * Payload per la creazione di una quest secondaria via admin.
 *
 * L'admin imposta nome, descrizione, punti base, posizione di check-in
 * e raggio. Lo status di default e' INACTIVE: la quest viene poi attivata
 * esplicitamente quando pronta.
 */
export interface CreateSecondaryQuestRequest {
  type: QuestType.SECONDARY;
  name: string;
  description: string;
  basePoints: number;
  position: GeoPoint;
  checkInRadiusMeters: number;
}

/**
 * Payload per la creazione di una quest principale via admin.
 *
 * L'admin imposta solo i parametri "concettuali" della quest: nome,
 * descrizione, punti, area di ricerca approssimativa, raggio della zona
 * di ricerca, ed eventualmente il collezionabile associato.
 *
 * NON inserisce exactPosition, qrToken, validationRadiusMeters: questi
 * campi vengono popolati dall'Operatore Manutenzione al momento del
 * piazzamento fisico del QR code.
 */
export interface CreatePrimaryQuestRequest {
  type: QuestType.PRIMARY;
  name: string;
  description: string;
  basePoints: number;
  searchArea: GeoPoint;
  searchRadiusMeters: number;
  collectibleId?: string | null;
}

/**
 * Unione dei due payload di creazione quest.
 *
 * Il campo type agisce da discriminator: il backend distingue il tipo di
 * payload in base al suo valore e applica la validazione specifica.
 */
export type CreateQuestRequest = CreateSecondaryQuestRequest | CreatePrimaryQuestRequest;

/**
 * Payload per l'aggiornamento di una quest esistente.
 *
 * Tutti i campi sono opzionali: l'admin invia solo quelli che vuole
 * modificare. Il tipo della quest NON e' modificabile dopo la creazione:
 * trasformare una primary in secondary o viceversa richiederebbe
 * invariably la cancellazione e ricreazione.
 */
export interface UpdateQuestRequest {
  name?: string;
  description?: string;
  basePoints?: number;
  searchArea?: GeoPoint;
  searchRadiusMeters?: number;
  collectibleId?: string | null;
  position?: GeoPoint;
  checkInRadiusMeters?: number;
}

/**
 * Query parameter per GET /admin/quests.
 *
 * Supporta filtraggio per tipo e status, oltre alla paginazione standard
 * offset/limit. Per la visualizzazione nel pannello admin lo status di
 * default include anche le quest INACTIVE e ARCHIVED, a differenza
 * dell'endpoint pubblico /quests che mostra solo le ACTIVE.
 */
export interface ListAdminQuestsQuery {
  type?: QuestType;
  status?: QuestStatus;
  limit?: number;
  offset?: number;
}

/**
 * Response paginata per la lista admin delle quest.
 */
export interface ListAdminQuestsResponse {
  data: AnyQuest[];
  total: number;
  limit: number;
  offset: number;
}
