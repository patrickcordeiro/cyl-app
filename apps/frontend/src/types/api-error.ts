export interface ApiError extends Error {
  message: string;
  cause?: unknown;
  details?: string[];
}
