import esES from './translations/esES.js';
import enUS from './translations/enUS.js';
import ptBR from './translations/ptBR.js';
import { TranslationType } from './@types/TranslationType.js';

export type { TranslationKeys, NestedKeyOf } from './@types/TranslationKeys.js';
export type { TranslationType };

type TranslationsAvailable = {
  'pt-BR': TranslationType;
  'en-US': TranslationType;
  'es-ES': TranslationType;
};

const translations: TranslationsAvailable = {
  'pt-BR': ptBR,
  'en-US': enUS,
  'es-ES': esES,
};

export default translations;
