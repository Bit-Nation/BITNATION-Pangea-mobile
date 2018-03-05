import i18n from 'i18next';

const en = require('./translations/en');

i18n.init({
  fallbackLng: 'en',
  initImmediate: false,
  returnObjects: true,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: en,
    },
  },
});

i18n.ifExists = key => (i18n.exists(key) ? i18n.t(key) : '');

export default i18n;
