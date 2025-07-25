import type { i18n } from 'i18next';
import i18next from 'i18next';
import { getSharedServerEnv } from 'servers/environment.server.ts';
import { i18nResources } from './i18n.resources.ts';
import { i18nConfig } from './i18n.ts';

const { NODE_ENV } = getSharedServerEnv();

let instance: i18n;

function getInstance() {
  // Build singleton instance on production but recreate it on dev
  if (!instance || NODE_ENV !== 'production') {
    instance = i18next.createInstance();
    instance.init({ ...i18nConfig, resources: i18nResources });
  }
  return instance;
}

export function getEmailI18n(locale: string) {
  return getInstance().getFixedT(locale, 'email');
}
