// Assemblage des dictionnaires de contenu, une entree par langue.
import commonFr from './common.fr.js'
import commonEn from './common.en.js'
import commonEs from './common.es.js'
import homeFr from './home.fr.js'
import homeEn from './home.en.js'
import homeEs from './home.es.js'
import itinFr from './itineraires.fr.js'
import itinEn from './itineraires.en.js'
import itinEs from './itineraires.es.js'
import inclFr from './inclusions.fr.js'
import inclEn from './inclusions.en.js'
import inclEs from './inclusions.es.js'
import japonFr from './japon.fr.js'
import japonEn from './japon.en.js'
import japonEs from './japon.es.js'
import pagesFr from './pages.fr.js'
import pagesEn from './pages.en.js'
import pagesEs from './pages.es.js'
import cseFr from './cse.fr.js'
import cseEn from './cse.en.js'
import cseEs from './cse.es.js'

import * as cgvFr from '../cgv-data.js'
import * as cgvEn from './cgv.en.js'
import * as cgvEs from './cgv.es.js'

export const COMMON = { fr: commonFr, en: commonEn, es: commonEs };
export const HOME = { fr: homeFr, en: homeEn, es: homeEs };
export const ITIN = { fr: itinFr, en: itinEn, es: itinEs };
export const INCL = { fr: inclFr, en: inclEn, es: inclEs };
export const JAPON = { fr: japonFr, en: japonEn, es: japonEs };
export const PAGES = { fr: pagesFr, en: pagesEn, es: pagesEs };
export const CSE = { fr: cseFr, en: cseEn, es: cseEs };
export const CGV = { fr: cgvFr, en: cgvEn, es: cgvEs };
