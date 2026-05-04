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
 * Payload della response degli endpoint POST /auth/register e
 * POST /auth/login.
 *
 * Include il JWT da inviare nelle richieste successive nell'header
 * Authorization come "Bearer <token>" e l'utente autenticato.
 *
 * Il campo user è un'unione discriminata Player | Admin: il client puo
 * differenziare il comportamento in base a user.role grazie al type
 * narrowing automatico di TypeScript.
 */
export interface AuthResponse {
  token: string;
  expiresIn: string;
  user: AuthenticatedUser;
}
