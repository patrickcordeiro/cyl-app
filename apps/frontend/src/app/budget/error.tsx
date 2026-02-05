'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <p className="mt-4 text-xl">Erro desconhecido ao carregar página. {error.message}</p>
      <button onClick={() => reset()}>Atualizar</button>
    </div>
  );
}
