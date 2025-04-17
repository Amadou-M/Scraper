const https = require('https');
const cheerio = require('cheerio');

const url = 'https://www.soccers.fr/espagne/la-liga/classement-buteurs';

https.get(url, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const $ = cheerio.load(data);
    const resultats = [];

    $('table tbody tr').each((i, row) => {
      const colonnes = $(row).find('td');

      const joueur = $(colonnes[1]).text().trim();
      const club = $(colonnes[2]).text().trim();
      const buts = $(colonnes[3]).text().trim();

      if (joueur && club && buts) {
        resultats.push({ joueur, club, buts });
      }
    });

    console.log(resultats);
  });
}).on('error', (err) => {
  console.error('Erreur lors de la requête :', err.message);
});
