import '../styles/globals.css'
import GlobalState from '../Hoc/GlobalState';
import Nav from '../components/Game/Nav/Nav';

function MyApp ({ Component, pageProps }) {
  return (
    <GlobalState>
      <Nav/>
      <Component {...pageProps} />
    </GlobalState>
  );
}

export default MyApp
