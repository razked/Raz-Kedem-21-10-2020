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
            celciusAlert: "Celcius mode enabled",
            FarenheitAlert: "Farenheit mode enabled",
            nav: {
              home: 'Home',
              favorites: 'Favorites'
            }
          },
          home: {
            likeBtn: {
              likedText: "Location added to favorites",
              unLikedText: "Location removed from favorites",
            },
            searchBox: {
              placeholder: 'Type any location..'
            }
          },
          favorites: {
            title: 'My Favorite Places',
            noPlaces: "You don't have favorite places.. yes:)"
          },
          errors: {
            placeTempture: 'Unable to fetch',
            placeTempture2: 'current weather',
            search: 'Unable to get search results, try again later',
            placeIdCall: 'Unable to get weather deails, try again later',
            forcast: 'Unable to fetch forcast for this location',
            image: 'Unbale to fetch pictrue for this location'
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
