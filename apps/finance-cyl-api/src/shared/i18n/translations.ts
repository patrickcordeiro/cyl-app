import en from './en';
import es from './es';
import pt from './pt';

type Translations = { [key: string]: Translations | string };

interface TranslateContent {
  translation: Translations;
}

export interface TranslateOptions {
  language: string;
  dictionary: Record<string, string>;
}

type SupportedLanguages = 'es' | 'en' | 'pt';
type PartialRecord<K extends string | number | symbol, T> = { [P in K]?: T };
export type TranslateResource = PartialRecord<
  SupportedLanguages,
  TranslateContent
>;

const translations: TranslateResource = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
  pt: {
    translation: pt,
  },
};

export default translations;
