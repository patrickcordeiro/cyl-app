import type { ApiError } from '@/types/api-error';

export const fetchWrapper = {
  async get<T>(url: string, options: { headers?: Record<string, string> } = {}): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      method: 'GET',
      headers,
      // cache: 'no-store',
    });

    if (!response.ok) {
      const responseError = await response.json();

      const error = new Error(
        responseError?.message || `Erro HTTP ${response.status}`
      ) as ApiError & {
        status?: number;
        cause?: unknown;
        details?: string[];
      };

      error.message = responseError.message ?? `Erro HTTP ${response.status}`;
      error.cause = responseError?.cause ?? null;
      error.details = responseError?.details ?? [];

      throw error;
    }

    return response.json() as Promise<T>;
  },

  async post<T>(
    url: string,
    body: unknown,
    options: { headers?: Record<string, string> } = {}
  ): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const responseError = await response.json();

      const error = new Error(
        responseError?.message || `Erro HTTP ${response.status}`
      ) as ApiError & {
        status?: number;
        cause?: unknown;
        details?: string[];
      };

      error.message = responseError.message ?? `Erro HTTP ${response.status}`;
      error.cause = responseError?.cause ?? null;
      error.details = responseError?.details ?? [];

      throw error;
    }

    return response.json() as Promise<T>;
  },

  async put<T>(
    url: string,
    body: unknown,
    options: { headers?: Record<string, string> } = {}
  ): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const responseError = await response.json();

      const error = new Error(
        responseError?.message || `Erro HTTP ${response.status}`
      ) as ApiError & {
        status?: number;
        cause?: unknown;
        details?: string[];
      };

      error.message = responseError.message ?? `Erro HTTP ${response.status}`;
      error.cause = responseError?.cause ?? null;
      error.details = responseError?.details ?? [];

      throw error;
    }

    return response.json() as Promise<T>;
  },

  async delete<T>(url: string, options: { headers?: Record<string, string> } = {}): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      const responseError = await response.json();

      const error = new Error(
        responseError?.message || `Erro HTTP ${response.status}`
      ) as ApiError & {
        status?: number;
        cause?: unknown;
        details?: string[];
      };

      error.message = responseError.message ?? `Erro HTTP ${response.status}`;
      error.cause = responseError?.cause ?? null;
      error.details = responseError?.details ?? [];

      throw error;
    }

    // Para DELETE, se não houver conteúdo, retorna void
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  },

  async patch<T>(
    url: string,
    body: unknown,
    options: { headers?: Record<string, string> } = {}
  ): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const responseError = await response.json();

      const error = new Error(
        responseError?.message || `Erro HTTP ${response.status}`
      ) as ApiError & {
        status?: number;
        cause?: unknown;
        details?: string[];
      };

      error.message = responseError.message ?? `Erro HTTP ${response.status}`;
      error.cause = responseError?.cause ?? null;
      error.details = responseError?.details ?? [];

      throw error;
    }

    return response.json() as Promise<T>;
  },
};
