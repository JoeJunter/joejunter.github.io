import sqlite3 from 'sqlite3';
import Console from 'console';
import returnQueryResults from './utils';

const db = new sqlite3.Database('./RPIData.db');

const getRPI = (month, target) => {
  if (!month) {
    console.log('You must provide a month!');
    return;
  }
  db.get('SELECT RPIPercentage FROM RPI WHERE Date = $month',
   { $month: month },
   (err, row) => {
    if (err) {
      throw err;
    }
    console.log("retrieving row:");
    let results = returnQueryResults(row);
    document.getElementById(target).innerHTML = results;
  })
}



getRPI("2010 JUN");

module.exports = {
 getRPI
}