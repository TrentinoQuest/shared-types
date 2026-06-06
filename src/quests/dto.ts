import { GeoPoint, GeoFix } from '../common';
import { AnyQuest } from './quests';
import { Collectible } from './collectibles';

/**
 * Payload della richiesta POST /quests/:id/check-in.
 *
 * Il giocatore invia la propria posizione GPS corrente. Il backend
 * verifica che rientri nel raggio di check-in della quest secondaria
 * specificata.
 */
export interface CheckInRequest {
  position: GeoPoint;
  fix?: Pick<GeoFix, 'accuracy' | 'clientTimestamp'>;
}

/**
 * Payload della response del check-in andato a buon fine.
 *
 * Contiene la rappresentazione del completamento appena creato, i punti
 * effettivamente assegnati (potenzialmente con moltiplicatore zona) e
 * il totale punti aggiornato del giocatore.
 */
export interface CheckInResponse {
  completion: Completion;
  pointsAwarded: number;
  totalPoints: number;
  distanceFromTargetMeters: number;
  gamification: GamificationResult;
}

/**
 * Payload della richiesta POST /quests/:id/scan.
 *
 * Il giocatore invia il token scansionato dal QR code e la propria
 * posizione GPS corrente. Il backend verifica entrambi: il token deve
 * corrispondere a quello registrato per la quest, e la posizione deve
 * rientrare nel raggio di validazione attorno alla posizione esatta
 * del QR.
 */
export interface ScanQrRequest {
  qrToken: string;
  position: GeoPoint;
  fix?: Pick<GeoFix, 'accuracy' | 'clientTimestamp'>;
}

/**
 * Payload della response della scansione QR andata a buon fine.
 *
 * Oltre ai dati comuni a un check-in, include il collezionabile
 * sbloccato (sempre presente per le quest principali).
 */
export interface ScanQrResponse {
  completion: Completion;
  pointsAwarded: number;
  totalPoints: number;
  collectible: Collectible;
  distanceFromTargetMeters: number;
  gamification: GamificationResult;
}

/**
 * Rappresentazione di un completamento di quest da parte di un giocatore.
 *
 * Reifica la relazione N:M tra Giocatore e Quest definita nel Deliverable
 * D2: ogni istanza tiene traccia di un completamento specifico, con i
 * punti effettivamente assegnati e la posizione del giocatore al momento.
 */
export interface Completion {
  id: string;
  questId: string;
  pointsAwarded: number;
  position: GeoPoint;
  completedAt: string;
}

/**
 * Voce nel feed dei completamenti del giocatore: il completamento e la
 * quest associata in versione denormalizzata, cosi' il client non deve
 * fare una richiesta separata per ottenere i dettagli della quest.
 */
export interface CompletionEntry {
  completion: Completion;
  quest: AnyQuest;
}

/**
 * Progressi del giocatore su una zona del territorio o sull'intera
 * regione. Utilizzato per le barre di avanzamento richieste dai
 * requisiti RF8 e RF9 del Deliverable D1.
 */
export interface ProgressSummary {
  totalQuests: number;
  completedQuests: number;
  percentage: number;
}

/**
 * Zona di prossimità categorica restituita da GET /quests/:id/proximity.
 * Non rivela mai la distanza in metri né le coordinate esatte.
 */
export type ProximityZone =
  | 'outside_area'
  | 'cold'
  | 'warm'
  | 'hot'
  | 'burning';

/** Response di GET /quests/:id/proximity */
export interface ProximityResponse {
  zone: ProximityZone;
}

/**
 * Informazioni sul risultato del completamento di una quest, per calcolare
 * i punti assegnati e aggiornare il profilo del giocatore (streak, livello,
 * scudi, ecc). Restituito dalle API di check-in e scansione QR.
 */
export interface GamificationResult {
  xpAwarded: number;
  coinsAwarded: number;
  streakMultiplier: number;
  currentStreak: number;
  longestStreak: number;
  newLevel: number | null;
  levelTitle: string;
  totalXp: number;
  shieldEarned: boolean;
  shieldConsumed: boolean;
  streakBroken: boolean;
}
