import { Links, UserRole } from '../common';

/**
 * Rappresentazione base di un utente del sistema.
 *
 * Mappa la classe astratta Utente del Deliverable D2: contiene gli attributi
 * comuni a tutti i tipi di utente. I tipi specifici di ruolo (Player, Admin)
 * estendono questa interfaccia aggiungendo i propri campi.
 *
 * Esposta tramite API in tutte le response che ritornano un utente.
 * Il campo password non è mai presente: viene serializzato fuori prima
 * della response per garantire che non venga mai inviato al client.
 */
export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
  _links?: Links;
}

/**
 * Estensione di User per il ruolo Giocatore.
 *
 * Mappa la classe Giocatore del Deliverable D2 con i suoi attributi
 * specifici: username pubblico, punti totali accumulati, data di
 * registrazione.
 */
export interface Player extends User {
  role: UserRole.PLAYER;
  username: string;
  totalPoints: number;
  registrationDate: string;
  xp: number;
  level: number;
  levelTitle: string;
  currentStreak: number;
  longestStreak: number;
  streakShieldActive: boolean;
  xpToNextLevel: number | null;
  coins: number;
  onboardingCompleted: boolean;
  currentLeagueTier: string;
  oauthProvider: 'google' | 'apple' | null;
}

/**
 * Estensione di User per il ruolo Amministratore.
 *
 * Mappa la classe Amministratore del Deliverable D2 con i suoi attributi
 * specifici: nome e cognome.
 */
export interface Admin extends User {
  role: UserRole.ADMIN;
  firstName: string;
  lastName: string;
}

/**
 * Estensione di User per il ruolo Manutentore.
 *
 * Mappa la classe Manutentore del Deliverable D2 con i suoi attributi
 * specifici: nome e cognome.
 */
export interface Maintenance extends User {
  firstName: string;
  lastName: string;
}

/**
 * Dati di progressione del giocatore esposti nel profilo.
 *
 * Subset dei campi gamification di Player usato dai componenti UI
 * che mostrano barre di avanzamento, livello e streak.
 */
export interface PlayerProgression {
  xp: number;
  level: number;
  levelTitle: string;
  currentStreak: number;
  longestStreak: number;
  streakShieldActive: boolean;
  xpToNextLevel: number | null;
}

/**
 * Unione discriminata di tutti i tipi di utente del modulo auth.
 *
 * Il campo role agisce da discriminator: TypeScript inferisce automaticamente
 * il tipo specifico (Player o Admin) in base al valore di role nei contesti
 * dove viene usato il narrowing.
 */
export type AuthenticatedUser = Player | Admin;
