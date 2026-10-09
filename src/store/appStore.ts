import { create } from 'zustand';
import liveMarketData from '../data/liveMarketData.json';
import predictionsData from '../data/predictions.json';
import type { DailyPrice, Prediction } from '../types';

interface AppState {
  priceCache: Record<string, DailyPrice[]>;
  predictions: Prediction[];
  watchlist: string[];
}

export const useAppStore = create<AppState>()(() => ({
  priceCache: liveMarketData as Record<string, DailyPrice[]>,
  predictions: predictionsData as Prediction[],
  watchlist: ['SPY', 'QQQ', 'AAPL', 'TSLA', 'MSFT', 'AMZN', 'GOOGL', 'NVDA'],
}));
