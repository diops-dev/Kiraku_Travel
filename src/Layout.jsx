import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Nav, Footer } from './components.jsx'
import { analyser, rt } from './paths.js'
import { LangContext, useLang } from './i18n.js'
import { COMMON } from './content/index.js'
import { pick } from './i18n.js'

// Coquille du site : navigation, page courante, pied de page.
// Les pages issues du design appellent go('route', 'param'), on le traduit
// ici en navigation react-router, dans la langue courante, pour garder de
// vraies URL.
export function useGo() {
  const navigate = useNavigate();
  const lang = useLang();
  return (route, param) => navigate(rt(route, param, lang));
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  const { lang, key } = analyser(pathname);

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return (
    <LangContext.Provider value={lang}>
      <Coquille route={key} pathname={pathname} lang={lang} />
    </LangContext.Provider>
  );
}

function Coquille({ route, pathname, lang }) {
  const go = useGo();
  const c = pick(COMMON, lang);
  return (
    <>
      <a className="skip-link" href="#contenu">{c.skip}</a>
      <Nav route={route} go={go} pathname={pathname} />
      <main id="contenu" className={"page-" + route}>
        <Outlet context={{ go }} />
      </main>
      <Footer go={go} />
    </>
  );
}
