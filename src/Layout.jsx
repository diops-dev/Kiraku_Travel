import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Nav, Footer } from './components.jsx'
import { rt, routeKey } from './paths.js'

// Coquille du site : navigation, page courante, pied de page.
// Les pages issues du design appellent go('route', 'param'), on le traduit
// ici en navigation react-router pour garder de vraies URL.
export function useGo() {
  const navigate = useNavigate();
  return (route, param) => navigate(rt(route, param));
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  const go = useGo();
  const route = routeKey(pathname);

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <Nav route={route} go={go} />
      <main id="contenu" className={"page-" + route}>
        <Outlet context={{ go }} />
      </main>
      <Footer go={go} />
    </>
  );
}
