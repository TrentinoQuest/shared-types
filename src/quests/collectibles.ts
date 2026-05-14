import { Links } from '../common';

/**
 * Rarita' del collezionabile, mostrata al giocatore come indicatore di
 * difficolta'/prestigio della quest principale che lo ha sbloccato.
 */
export enum CollectibleRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  LEGENDARY = 'legendary',
}

/**
 * Collezionabile sbloccato dal completamento di una quest principale.
 * Viene aggiunto all'album personale del giocatore al momento del
 * completamento e mai successivamente rimosso.
 */
export interface Collectible {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rarity: CollectibleRarity;
  createdAt: string;
  _links?: Links;
}

/**
 * Voce dell'album personale del giocatore: il collezionabile e la data
 * in cui e' stato sbloccato. Restituito da GET /player/collection.
 */
export interface CollectibleEntry {
  collectible: Collectible;
  unlockedAt: string;
}
