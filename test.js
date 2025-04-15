const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {
  const browser = await puppeteer.launch({ headless: true }); // headless:true = sans interface
  const page = await browser.newPage();

  // Aller sur la page des buteurs
  await page.goto('https://www.soccers.fr/espagne/la-liga/classement-buteurs', {
    waitUntil: 'networkidle2'
  });

  const html = await page.content(); // Récupère le HTML complet après chargement JS
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

  console.log("Classement des buteurs:");
  console.table(resultats);

  await browser.close();
})();
