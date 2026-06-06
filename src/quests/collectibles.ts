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
 * Stato del collezionabile, usato per indicare se e' ancora possibile
 * sbloccarlo o se e' stato rimosso da una quest principale. Un collezionabile
 * ARCHIVED non puo' piu' essere sbloccato, ma rimane visibile nell'album del
 * giocatore se era gia' stato sbloccato in passato.
 */
export enum CollectibleStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
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
  status: CollectibleStatus;
  lore: string | null;
  coordinates: { lat: number; lng: number } | null;
}

/**
 * Voce dell'album personale del giocatore: il collezionabile e la data
 * in cui e' stato sbloccato. Restituito da GET /player/collection.
 */
export interface CollectibleEntry {
  collectible: Collectible;
  unlockedAt: string;
}
