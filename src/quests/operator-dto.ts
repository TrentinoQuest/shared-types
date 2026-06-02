import { GeoPoint } from '../common';
import { PlacementStatus } from './placement-status';
import { PrimaryQuest } from './quests';

/**
 * Payload per il piazzamento fisico di un QR code da parte
 * dell'operatore (RF40 del Deliverable D1).
 *
 * L'operatore si reca sul posto, piazza il QR e l'app mobile registra
 * automaticamente la posizione GPS corrente. Il backend genera il
 * qrToken univoco e imposta placementStatus a PLACED.
 *
 * Il campo fix opzionale trasporta i metadati di qualita' del rilevamento
 * GPS per la validazione anti-cheat, coerente con check-in e scan.
 */
export interface PlaceQuestRequest {
  exactPosition: GeoPoint;
  fix?: {
    accuracy: number;
    clientTimestamp: number;
  };
}

/**
 * Payload per l'aggiornamento della posizione di un QR gia' piazzato
 * (RF41 del Deliverable D1), ad esempio in caso di spostamento fisico.
 */
export interface UpdateQuestPositionRequest {
  exactPosition: GeoPoint;
  fix?: {
    accuracy: number;
    clientTimestamp: number;
  };
}

/**
 * Payload per la segnalazione di un QR mancante o danneggiato
 * (RF44 del Deliverable D1).
 */
export interface ReportQuestIssueRequest {
  note?: string;
}

/**
 * Filtri per la lista delle quest principali lato operatore.
 *
 * L'operatore filtra le quest per stato di piazzamento per organizzare
 * il lavoro: quelle da piazzare (RF42), quelle gia' piazzate per
 * manutenzione (RF43), quelle segnalate (RF45).
 */
export interface ListOperatorQuestsQuery {
  placementStatus?: PlacementStatus;
  limit?: number;
  offset?: number;
}

/**
 * Vista di una quest principale per l'operatore.
 *
 * Diversamente dalla vista giocatore, espone i dati operativi del QR
 * (placementStatus, exactPosition) di cui l'operatore ha bisogno per
 * il proprio lavoro. exactPosition e' null finche' il QR non e' piazzato.
 */
export interface OperatorQuestView extends PrimaryQuest {
  placementStatus: PlacementStatus;
  exactPosition: GeoPoint | null;
  qrToken: string | null;
}

/**
 * Response paginata per la lista operatore.
 */
export interface ListOperatorQuestsResponse {
  data: OperatorQuestView[];
  total: number;
  limit: number;
  offset: number;
}
