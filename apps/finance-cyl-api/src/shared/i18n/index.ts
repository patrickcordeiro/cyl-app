import i18nService from './i18nService';
import { TranslateOptions } from './translations';

export function $t(
  key: string,
  { language, dictionary }: TranslateOptions,
  options?: Record<string, string>
): string {
  const translateFunction = i18nService.i18n.getFixedT(language);
  let translatedString = translateFunction(key, options);

  const terms = translatedString.match(/\$\([^)]*\)/g);

  terms?.forEach(term => {
    const sanitizedTerm = term.substring(2, term.length - 1);
    const translatedTerm = dictionary[sanitizedTerm] || sanitizedTerm;
    translatedString = translatedString.replace(term, translatedTerm);
  });

  return translatedString;
}

export { default as translations } from './translations';
export { default as i18nService } from './i18nService';
export type { TranslateResource } from './translations';
export type { TranslateOptions } from './translations';
