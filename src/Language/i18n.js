import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          header: {
            appName: "Weather App",
            celciusAlert: "You've switched to Celcius mode",
            FarenheitAlert: "You've switched to Farenheit mode",
            nav: {
              home: 'Home',
              favorites: 'Favorites'
            }
          },
          home: {
            likeBtn: {
              likedText: "You've added this location to your favorites",
              unLikedText: "You've remove this location from favorites",
            }
          },
          favorites: {
            title: 'My Favorites Places',
            noPlaces: "You haven't added any places"
          }
        },
      },
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: ".", // we use content as keys

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
