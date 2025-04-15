const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.soccers.fr/espagne/la-liga/classement-buteurs', {
    waitUntil: 'networkidle2',
  });

  const content = await page.content();
  const $ = cheerio.load(content);
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

  await browser.close();
})();
