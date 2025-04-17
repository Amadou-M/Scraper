const fs = require('fs');
const cheerio = require('cheerio');


const html = fs.readFileSync('page.html', 'utf8');


const $ = cheerio.load(html);


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
