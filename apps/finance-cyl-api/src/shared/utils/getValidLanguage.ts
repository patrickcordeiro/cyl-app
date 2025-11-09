import { RequestContextLanguageDto } from '@cyl-app/dto';
import { Request } from 'express';

const FALLBACK_LANGUAGE = 'pt-BR';

export function getLanguageFromRequest(request: Request) {
  const languageCookieName = '_language';
  // const languageCookieName = 'i18n-storage';
  const language = request.cookies?.[languageCookieName];

  return getValidLanguage(language);
}

export function getValidLanguage(
  language?: RequestContextLanguageDto
): RequestContextLanguageDto {
  if (!language) {
    return FALLBACK_LANGUAGE;
  }

  const keyLength = language.length;

  if (keyLength === 2) {
    return language;
  }

  if (keyLength !== 5 || language[2] !== '-') {
    return FALLBACK_LANGUAGE;
  }

  const [languageDescription, region] = language.split('-');

  return `${languageDescription}-${region.toUpperCase()}` as RequestContextLanguageDto;
}
