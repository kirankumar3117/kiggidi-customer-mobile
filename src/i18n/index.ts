import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './locales/en.json';
import te from './locales/te.json';
import hi from './locales/hi.json';

const LANGUAGE_STORE_KEY = '@app_language';

const resources = {
  en: { translation: en },
  te: { translation: te },
  hi: { translation: hi },
};

// Ensure default locale exists from the system
const systemLocale = Localization.getLocales()[0]?.languageCode || 'en';
const supportedLocales = ['en', 'te', 'hi'];
const defaultLocale = supportedLocales.includes(systemLocale) ? systemLocale : 'en';

// Async language detector
const languageDetector: any = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: (lang: string) => void) => {
    try {
      const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORE_KEY);
      if (storedLanguage) {
        return callback(storedLanguage);
      }
    } catch (e) {
      console.warn('Failed to fetch language from storage', e);
    }
    return callback(defaultLocale);
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORE_KEY, language);
    } catch (e) {
      console.warn('Failed to save language to storage', e);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4', // Required for React Native
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safeguards from XSS
    },
    react: {
      useSuspense: false, // Prevents issues with React Native suspended state
    },
  });

export default i18n;
