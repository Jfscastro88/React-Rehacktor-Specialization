import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './src/locales/en/translation.json';
import it from './src/locales/it/translation.json';

i18n
.use(initReactI18next)
.init({
    resources: {
        en: { translation: en },
        it: { translation: it }
    },
    lng: 'en',           
    fallbackLng: 'it',   
    interpolation: { escapeValue: false }
});

export default i18n;