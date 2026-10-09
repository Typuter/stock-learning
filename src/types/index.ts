// ─── Market Data ─────────────────────────────────────────────────────────────

export interface DailyPrice {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// ─── Predictions ────────────────────────────────────────────────────────────

export type Timeframe = '7d' | '14d' | '30d';

export interface Prediction {
  id: string;
  symbol: string;
  createdAt: string;
  timeframe: Timeframe;
  predictedRangeLow: number;
  predictedRangeHigh: number;
  confidenceLow: number;
  confidenceHigh: number;
  confidence: number;
  signal: 'long' | 'short' | 'hold';
  reasoning: string[];
  actualResult?: number;
  wasAccurate?: boolean;
}
