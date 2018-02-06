import i18n from 'i18next';

const en = require('./translations/en');

i18n.init({
  fallbackLng: 'en',
  initImmediate: false,
  resources: {
    en: {
      translation: en,
    },
  },
});

export default i18n;
