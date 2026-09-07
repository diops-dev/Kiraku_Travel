import { ViteReactSSG } from 'vite-react-ssg'
// Polices auto-hébergées. Les familles Google sont chargées en sous-ensemble
// latin ; le japonais est couvert par Shippori Mincho, sous-ensemblé maison
// dans public/fonts (voir colors_and_type.css).
import '@fontsource/noto-sans-jp/latin-300.css'
import '@fontsource/noto-sans-jp/latin-ext-300.css'
import '@fontsource/noto-sans-jp/latin-400.css'
import '@fontsource/noto-sans-jp/latin-ext-400.css'
import '@fontsource/noto-sans-jp/latin-500.css'
import '@fontsource/noto-sans-jp/latin-ext-500.css'
import '@fontsource/noto-sans-jp/latin-700.css'
import '@fontsource/noto-sans-jp/latin-ext-700.css'
import '@fontsource/noto-serif-jp/latin-300.css'
import '@fontsource/noto-serif-jp/latin-ext-300.css'
import '@fontsource/noto-serif-jp/latin-400.css'
import '@fontsource/noto-serif-jp/latin-ext-400.css'
import '@fontsource/noto-serif-jp/latin-600.css'
import '@fontsource/noto-serif-jp/latin-ext-600.css'
import '@fontsource/yuji-mai/latin-400.css'
import '@fontsource/yuji-mai/latin-ext-400.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-ext-400.css'
import '@fontsource/jetbrains-mono/latin-500.css'
import '@fontsource/jetbrains-mono/latin-ext-500.css'
import './styles/site.css'
import { routes } from './routes.jsx'

// Point d'entrée pré-rendu : au build, une page HTML complète est générée
// pour chaque URL, puis React hydrate côté client.
export const createRoot = ViteReactSSG({ routes })
