import sqlite3 from 'sqlite3';
//import Console from 'console';
//import returnQueryResults from './utils';

//uncomment these import statements once you are up online and can use modules



const extractKeys = array => {
  if (array.length === 0) {
    return [];
  }
  let keys = Object.keys(array[0]);
  let isCopy = array.every(element => {
    if (typeof element !== 'object') {
      throw new Error(`Array must be made entirely of objects`);
    }
    return Object.keys(element).every(key => keys.indexOf(key) !== -1);
  })
  if (isCopy) {
    return keys;
  } else {
    throw new Error(`Array's object's keys do not match`);
  }
}

const returnQueryResults = array => {
  if (typeof array !== 'object') {
    console.log(array);
    return array;
  }
  if (!Array.isArray(array)) {
    array = [array]
  }
  let keys = extractKeys(array);
  let output = [];
  output.push(`\t${keys.join('\t')}`);
  array.forEach(row => {
    output.push(`\t${Object.keys(row).map(key => row[key]).join('\t')}`);
  });
  output = output.join('\n');
  console.log(output);
  return output;
}


// the above is all in the 'utils' file, which will be its on module once we're online



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