import { CollectibleRarity } from './collectibles';

export interface CreateCollectibleRequest {
  name: string;
  description: string;
  imageUrl: string;
  rarity: CollectibleRarity;
  lore?: string | null;
  audioGuideUrl?: string | null;
  coordinates?: { lat: number; lng: number } | null;
}

export interface UpdateCollectibleRequest {
  name?: string;
  description?: string;
  imageUrl?: string;
  rarity?: CollectibleRarity;
  lore?: string | null;
  audioGuideUrl?: string | null;
  coordinates?: { lat: number; lng: number } | null;
}
