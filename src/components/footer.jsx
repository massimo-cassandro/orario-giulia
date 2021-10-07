import React from 'react';
// import {NavLink} from 'react-router-dom';
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <p>Orario delle Lezioni di Italiano di Giulia</p>
        <p>
          {/* <NavLink to="/mail">
            Contattami
          </NavLink> */}
          <a href="https://italianoperstranieri.altervista.org/">Il mio blog</a>
        </p>
      </div>
    </footer>
  );
}
