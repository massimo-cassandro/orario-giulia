/*
  https://www.freecodecamp.org/news/cjn-google-sheets-as-json-endpoint/ 
  https://benborgers.com/posts/google-sheets-json
*/


import React from 'react';

const giorni = {
  lun: 'Montag',
  mar: 'Dienstag',
  mer: 'Mittwoch',
  gio: 'Donnerstag',
  ven: 'Freitag',
  sab: 'Samstag',
  // dom: 'Sonntag'
};


export default class Home extends React.Component {
  state = {
    data: [],
    loaded: false
  };

  getData() {

    const spreadsheetId = '1ni5zd0raPvHeNae3mSIB0lNU6cWYIbz8OIsy5Sw-YHk';
    fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json`)
      .then(res => res.text())
      .then(text => {
        const json = JSON.parse(text.substr(47).slice(0, -2)).table.rows;
        let data = {},
          intestazioni = [];
        // prima riga: contiene le intestazioni
        // in questo modo anche cambiando l'ordine delle colonne non cambia
        // l'attribuzione delle variabili
        json[0]['c'].forEach(item => {
          intestazioni.push(
            // https://stackoverflow.com/a/37511463/743443
            item.v.normalize('NFD')
              .replace(/\p{Diacritic}/gu, '')
              .replace(/ /g, '_')
              .toLowerCase()
          );
        });

        json.slice(1).forEach(item => {
          let giorno = item.c[0]?.v;

          if(giorno) {
            giorno = giorno.toLowerCase();

            if(data[giorno] === undefined) {
              data[giorno] = [];
            }
            let temp = {};
            item.c.forEach((val,idx) => {
              temp[intestazioni[idx]] = val?.v ?? null;
            });

            data[giorno].push(temp);
          }
        });

        // sorting orari
        for( const giorno in data ) {
          data[giorno].sort((a, b) => a.orario > b.orario);
        }

        this.setState({
          data: data,
          loaded: true
        });

      }); // end then
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { data, loaded } = this.state;

    if(loaded) {
      
      const cal = Object.keys(giorni).map(giorno => {

        let idx = 0;
        
        return (
          <section className="giorno" key={giorno}>
            <header><h2>{giorni[giorno]}</h2></header>
            {data[giorno] !== undefined && data[giorno].map(item => {
              return (
                <article key={idx++}>
                  <p className="orario">{item.orario? item.orario : '*** orario mancante ***'}</p>
                  <h3>{item.titolo? item.titolo : '*** titolo mancante ***'}</h3>
                  {item.eta && <p className="eta">{item.eta}</p>}                
                  {item.descrizione && <p className="descrizione">{item.descrizione}</p>}                
                </article>
              );
            })}
          </section>
        );
      });

      return (
        <div className="container calendario">
          {cal}
        </div>
      );

    } else {

      return (
        <div className="container">
          Caricamento...
        </div>
      );
    }
  } // end if data
}