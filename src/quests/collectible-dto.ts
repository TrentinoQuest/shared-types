import { CollectibleRarity } from './collectibles';

export interface CreateCollectibleRequest {
  name: string;
  description: string;
  imageUrl: string;
  rarity: CollectibleRarity;
}

export interface UpdateCollectibleRequest {
  name?: string;
  description?: string;
  imageUrl?: string;
  rarity?: CollectibleRarity;
}
