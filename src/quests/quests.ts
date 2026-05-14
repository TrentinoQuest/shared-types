import { GeoPoint, Links } from '../common';

/**
 * Tipi di quest supportati dal sistema.
 * Mappa la distinzione del Deliverable D1 tra quest principali
 * (con QR code nascosto) e quest secondarie (con check-in geolocalizzato).
 */
export enum QuestType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

/**
 * Stato del ciclo di vita di una quest.
 * - active: visibile e completabile dai giocatori
 * - inactive: creata o sospesa, non disponibile
 * - archived: rimossa permanentemente ma conservata a fini storici
 */
export enum QuestStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived',
}

/**
 * Rappresentazione base di una quest restituita dall'API.
 * I tipi specifici (PrimaryQuest, SecondaryQuest) la estendono con
 * i campi propri del tipo.
 */
export interface Quest {
  id: string;
  name: string;
  description: string;
  type: QuestType;
  status: QuestStatus;
  basePoints: number;
  createdAt: string;
  _links?: Links;
}

/**
 * Quest principale: il giocatore vede sulla mappa una zona di ricerca
 * approssimativa entro cui e' nascosto un QR code fisico. La posizione
 * esatta del QR e' segreta lato server.
 *
 * Al completamento (scansione QR + validazione GPS) sblocca un
 * collezionabile oltre ai punti.
 */
export interface PrimaryQuest extends Quest {
  type: QuestType.PRIMARY;
  searchArea: GeoPoint;
  searchRadiusMeters: number;
  collectibleId: string | null;
}

/**
 * Quest secondaria: il giocatore deve raggiungere una posizione pubblica
 * nota (es. ingresso di un museo) entro il raggio di check-in definito.
 * Non sblocca collezionabili.
 */
export interface SecondaryQuest extends Quest {
  type: QuestType.SECONDARY;
  position: GeoPoint;
  checkInRadiusMeters: number;
}

/**
 * Unione discriminata di tutti i tipi di quest.
 * Il campo type agisce da discriminator: TypeScript inferisce
 * automaticamente il tipo specifico in base a quest.type.
 */
export type AnyQuest = PrimaryQuest | SecondaryQuest;
