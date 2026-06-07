/**
 * Modulo gamification: tipi condivisi per daily quests, leghe,
 * kudos, lore quiz, valli, co-op e mercato coupon.
 */

export enum LeagueTier {
  PORFIDO = 'porfido',
  MARMO = 'marmo',
  ARENARIA = 'arenaria',
  GRANITO = 'granito',
  DOLOMITI = 'dolomiti',
}

export enum DailyQuestType {
  WALK_2KM = 'walk_2km',
  FIND_SECONDARY = 'find_secondary',
  REACH_ALTITUDE = 'reach_altitude',
  LORE_QUIZ = 'lore_quiz',
  FLIP_COLLECTIBLES = 'flip_collectibles',
  SEND_KUDOS = 'send_kudos',
}

export enum DailyQuestContext {
  IN_TRENTINO = 'in_trentino',
  OUT_OF_REGION = 'out_of_region',
  ANY = 'any',
}

export enum CoopChallengeType {
  WALK_50KM = 'walk_50km',
  COMPLETE_10 = 'complete_10_quests',
  UNLOCK_5_RARE = 'unlock_5_rare',
}

export interface DailyQuestItem {
  type: DailyQuestType;
  title: string;
  description: string;
  xpReward: number;
  coinsReward: number;
  completed: boolean;
  completedAt: string | null;
}

export interface DailyQuestAssignmentView {
  date: string;
  quests: DailyQuestItem[];
}

export interface LoreQuestionView {
  id: string;
  text: string;
  options: string[];
  category: string;
  alreadyAnswered: boolean;
  result?: {
    correct: boolean;
    correctOptionIndex: number;
    explanation: string;
  };
}

export interface LoreAnswerResponse {
  correct: boolean;
  correctOptionIndex: number;
  explanation: string;
  coinsAwarded: number;
  mapFragment: { questName: string; hint: string } | null;
}

export interface LeagueMemberView {
  rank: number;
  playerId: string;
  username: string;
  weeklyXp: number;
  isCurrentPlayer: boolean;
  isFriend: boolean;
}

export interface LeagueCurrentView {
  season: { weekStart: string; weekEnd: string };
  tier: LeagueTier;
  groupId: string;
  rank: number;
  weeklyXp: number;
  leaderboard: LeagueMemberView[];
}

export interface LeagueHistoryEntry {
  seasonId: string;
  weekStart: string;
  weekEnd: string;
  tier: LeagueTier;
  rank: number | null;
  promoted: boolean;
  relegated: boolean;
}

export interface ValleyProgressItem {
  valleyId: string;
  name: string;
  completedCount: number;
  totalCount: number;
  percentage: number;
  entered: boolean;
}

export interface KudosRequest {
  toPlayerId: string;
  activityType: string;
  activityId: string;
  emoji: 'beer' | 'highfive' | 'star';
}

export interface FeedActivityItem {
  type: 'quest_completion' | 'collectible_unlock';
  playerId: string;
  username: string;
  questName?: string;
  collectibleName?: string;
  collectibleRarity?: string;
  timestamp: string;
  activityId: string;
  kudosCount: number;
  myKudos: boolean;
}

export interface CoopChallengeView {
  id: string;
  initiatorId: string;
  partnerId: string;
  type: CoopChallengeType;
  title: string;
  description: string;
  targetValue: number;
  initiatorProgress: number;
  partnerProgress: number;
  totalPercentage: number;
  status: 'active' | 'completed' | 'expired';
  startedAt: string;
  expiresAt: string;
  rewardCollectibleId: string | null;
}

export interface CouponView {
  id: string;
  offerId: string;
  offerTitle: string;
  businessName: string;
  token: string;
  pointsCost: number;
  status: 'active' | 'redeemed' | 'expired';
  purchasedAt: string;
  expiresAt: string;
  redeemedAt: string | null;
}

export interface CompleteDailyQuestResponse {
  xpAwarded: number;
  coinsAwarded: number;
  totalXp: number;
  totalPoints: number;
}

export interface ValleyProgressResponse {
  data: ValleyProgressItem[];
}

export interface CreateCoopChallengeRequest {
  partnerId: string;
  type: CoopChallengeType;
}

export interface AddProgressRequest {
  value: number;
}

export interface MapFragment {
  questName: string;
  hint: string;
}
