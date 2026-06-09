import { QuestType } from '../quests';

/**
 * Granularita' temporale per le aggregazioni delle serie storiche.
 */
export enum AnalyticsGranularity {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

/**
 * Riepilogo dei contatori globali del sistema.
 *
 * Esposto come "dashboard overview" iniziale per dare un colpo d'occhio
 * sullo stato di Trentino Quest: utenti, quest, completamenti, attivita
 * affiliate, collezionabili. Le quest sono spaccate per tipo per
 * evidenziare il bilanciamento tra primary (con QR) e secondary
 * (con check-in).
 */
export interface AnalyticsSummary {
  totalPlayers: number;
  totalActiveQuests: number;
  totalActivePrimaryQuests: number;
  totalActiveSecondaryQuests: number;
  totalCompletions: number;
  totalApprovedBusinesses: number;
  totalCollectibles: number;
  pendingPlacements: number;
}

/**
 * Singolo punto della serie temporale dei completamenti.
 */
export interface CompletionsOverTimePoint {
  /** Data di inizio del periodo aggregato (ISO 8601). */
  date: string;
  count: number;
}

/**
 * Risposta dell'endpoint completions-over-time.
 *
 * Restituisce la serie temporale dei completamenti aggregata per
 * granularita' richiesta (day/week/month). Include esplicitamente
 * l'intervallo applicato per facilitare il debug e il rendering nel
 * frontend.
 */
export interface CompletionsOverTimeResponse {
  granularity: AnalyticsGranularity;
  from: string;
  to: string;
  data: CompletionsOverTimePoint[];
}

/**
 * Singola riga della classifica delle quest piu' completate.
 */
export interface TopQuestEntry {
  questId: string;
  name: string;
  type: QuestType;
  completionCount: number;
}

/**
 * Singola quest attiva mai completata da nessun giocatore.
 *
 * Esposta lato admin come segnale di "zona ignorata" (RF39 del D1): le
 * quest qui elencate sono ancora attive ma non hanno ricevuto traffico,
 * potenzialmente perche' posizionate male o poco appetibili.
 */
export interface NeverCompletedQuestEntry {
  questId: string;
  name: string;
  type: QuestType;
  createdAt: string;
}

/**
 * Singolo punto della heatmap dei completamenti.
 *
 * Le coordinate corrispondono alla posizione GPS del giocatore al
 * momento del completamento (non alla posizione della quest stessa),
 * cosi' da rappresentare effettivamente i flussi turistici.
 */
export interface CompletionsHeatmapPoint {
  lat: number;
  lng: number;
  completedAt: string;
}

/**
 * Risposta dell'endpoint heatmap.
 */
export interface CompletionsHeatmapResponse {
  from: string;
  to: string;
  points: CompletionsHeatmapPoint[];
}

/**
 * Singola riga della classifica giocatori.
 */
export interface LeaderboardEntry {
  playerId: string;
  username: string;
  /** Valuta posseduta (informativa: la classifica NON ordina su questo). */
  totalPoints: number;
  /** XP totali: criterio di ordinamento della classifica. */
  xp: number;
  /** Livello corrente derivato dagli XP. */
  level: number;
}

/**
 * Filtri opzionali per gli endpoint con range temporale.
 */
export interface AnalyticsRangeQuery {
  from?: string;
  to?: string;
}

/**
 * Filtri specifici per la serie temporale dei completamenti.
 */
export interface CompletionsOverTimeQuery extends AnalyticsRangeQuery {
  granularity?: AnalyticsGranularity;
}
