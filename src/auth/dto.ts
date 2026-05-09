import { AuthenticatedUser } from './users';

/**
 * Payload della richiesta POST /auth/register.
 *
 * Crea un nuovo Giocatore. La password viene inviata in chiaro su HTTPS
 * e hashata lato server prima della persistenza.
 */
export interface RegisterPlayerRequest {
  email: string;
  password: string;
  username: string;
}

/**
 * Payload della richiesta POST /auth/login.
 *
 * Autentica un utente esistente di qualsiasi ruolo.
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Payload della richiesta POST /auth/password-recovery.
 *
 * Avvia il flusso di recupero password per l'email specificata.
 * Il backend risponde sempre con successo per non rivelare quali
 * email sono registrate nel sistema.
 */
export interface PasswordRecoveryRequest {
  email: string;
}

/**
 * Payload della richiesta POST /auth/refresh.
 *
 * Permette di ottenere un nuovo access token (e un nuovo refresh token,
 * grazie al meccanismo di rotation) presentando il refresh token corrente.
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Payload della richiesta POST /auth/logout.
 *
 * Termina la sessione corrente revocando il refresh token specificato.
 * L'access token resta tecnicamente valido fino alla sua scadenza naturale
 * (15 minuti), ma senza il refresh token l'utente non può rinnovarlo,
 * quindi la sessione di fatto termina entro la finestra dell'access token.
 */
export interface LogoutRequest {
  refreshToken: string;
}

/**
 * Payload della response degli endpoint che emettono token nuovi:
 * POST /auth/register, POST /auth/login, POST /auth/refresh.
 *
 * Il client deve memorizzare entrambi i token in storage persistente:
 * - accessToken viene allegato come "Authorization: Bearer <token>" in
 *   tutte le richieste API successive
 * - refreshToken viene usato esclusivamente per chiamare /auth/refresh
 *   quando l'access token sta per scadere o ha gia ricevuto un 401
 *
 * I campi accessExpiresIn e refreshExpiresIn esprimono la durata residua
 * dei rispettivi token in formato compatto (es. "15m", "30d") per
 * permettere al client di pianificare il refresh proattivo.
 */
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  accessExpiresIn: string;
  refreshExpiresIn: string;
  user: AuthenticatedUser;
}

/**
 * Payload della response specifica dell'endpoint POST /auth/refresh.
 *
 * Strutturalmente identica ad AuthResponse ma senza il campo user, dato
 * che il refresh non altera l'identita dell'utente autenticato.
 */
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  accessExpiresIn: string;
  refreshExpiresIn: string;
}
