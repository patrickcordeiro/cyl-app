import { merge } from '@shared/utils/helpers';
import i18next, { InitOptions, Resource, i18n } from 'i18next';
import translations, { TranslateResource } from './translations';

export default abstract class i18nService {
  static i18n: i18n;

  static async init(resources: TranslateResource, options?: InitOptions) {
    this.i18n = i18next.createInstance();

    const mergedResources = merge<TranslateResource>(
      resources,
      translations
    ) as Resource;

    await this.i18n.init({
      lng: 'en-US',
      fallbackLng: 'en-US',
      debug: false,
      supportedLngs: ['en-US', 'en', 'pt-BR', 'pt', 'es-ES', 'es'],
      backend: true,
      load: 'languageOnly',
      ...options,
      resources: mergedResources,
    });
  }
}
