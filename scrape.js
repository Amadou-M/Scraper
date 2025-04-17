import * as cheerio from 'cheerio';

const $ = await cheerio.fromURL('https://www.soccers.fr/espagne/la-liga/classement-buteurs');

const scrapeData = () => {
  
      const resultats = [];

      // Extraire les informations du tableau des buteurs
      $('table tbody tr').each((i, row) => {
        const cells = $(row).find('td');

        if(!cells) return

        const joueur = $(cells [1]).text().trim();
        const club = $(cells[2]).text().trim();
        const buts = $(cells[3]).text().trim();

        
          resultats.push({ joueur, club, buts });
      });

      // Afficher les résultats
      console.log(resultats);
    }
  


// Lancer la fonction de scraping
scrapeData();