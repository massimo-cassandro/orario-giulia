import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';

import Home from './views/home';
// import Email from './views/email';

import {cookie_consent} from '@massimo-cassandro/cookie-consent';

cookie_consent({
  message: `Questo sito utilizza cookie, anche di terze parti anonimizzati,
  per garantirti la migliore esperienza di navigazione.
  Continuando a navigare su questo sito, si acconsente al loro utilizzo`,
  // `<br>
  // Consulta la pagina della
  // <a href="/privacy-policy" rel="noopener noreferrer nofollow">
  // Privacy Policy</a> per maggiori informazioni.`,
  btn_text: 'Ho capito',
  banner_aria_label: 'Consenso Cookie',
  btn_aria_label: 'Dai il consenso per l\'utilizzo dei cookie',
  btn_class: ''
});

// site url
document.head.querySelector('meta[property="og:url"]')
  .setAttribute('content', window.location.origin);

// https://auth0.com/blog/complete-guide-to-react-user-authentication/#Connect-React-with-Auth0

function App() {

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route component={Home} path="/" exact />
          {/* <Route component={Email} path="/mail" /> */}
          <Redirect to="/" />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );

}

export default App;
