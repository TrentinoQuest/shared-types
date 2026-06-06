/**
 * Voce nella classifica sociale tra amici.
 * Restituita da GET /social/leaderboard.
 */
export interface SocialLeaderboardEntry {
  rank: number;
  playerId: string;
  username: string;
  /** Completamenti ponderati: primary × 2, secondary × 1 */
  socialScore: number;
  questCompletions: number;
  isCurrentPlayer: boolean;
}
