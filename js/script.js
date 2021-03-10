// Genera un numero casuale
function genRandomNum( max, min ) {
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}

// Controllo se il numero è uguale ai precedenti
function numControl( array, num ) {
  for ( var j = 0; j < array.length; j++ ) {
    if ( num == array[j] ) {
      return true;
      console.log(num);
    }
  }
  return false;
}

// Onclick inizia la funzione
function startGame() {

  // Dichiarazione variabili
  var bombs = [],
  maxNum = 100,
  minNum = 1,
  nBombe = 16;
  output = document.getElementById('output'),
  containerBtn = document.getElementById('buttons-container');
  userNum = 0,
  userNumList = [],
  boom = new Audio('audio/oooh.mp3'),
  kids = new Audio('audio/hurray.mp3');

  // Selezione livello e relativi controlli
  var level = parseInt( prompt("INSERISCI: \n0 = livello facile \n1 = livello normale \n2 = livello difficile") );
  while ( level < 0 || level > 2 || isNaN( level ) ) {
    level = parseInt( prompt("Il valore inserito non è valido \nINSERISCI: \n0 = livello difficile \n1 = livello normale \n2 = livello facile") );
  }
  if ( level == 1 ) {
    maxNum = 80;
  } else if ( level == 2 ) {
    maxNum = 50;
  }

  // Ciclo for per generare i numeri con un ciclo for e per controllare che sia diverso dagli altri numeri tramite funzioni
  var i = 0;
  while ( i < nBombe ) {
    newNumber = genRandomNum( maxNum, minNum );
    if ( numControl( bombs, newNumber ) == false ) {
      bombs.push(newNumber);
      i++;
    }
  }
  console.log("Numeri bomba: " + bombs);

  // Ciclo che riceve il numero in input, controlla la validità, controlla se è una bomba o meno. Terminati i numeri sicuri il contatore viene incrementato per fermare il ciclo
  while ( userNumList.length < maxNum - nBombe ) {
    userNum = parseInt( prompt("Inserisci un numero da " + minNum + " a " + maxNum ) );
    if ( userNum < minNum || userNum > maxNum || isNaN( userNum ) ) {
      alert("Il valore inserito non è valido");
    } else if ( userNumList.length > 0 && numControl( userNumList, userNum ) == true ) {
      alert("Devi inserire un numero diverso, non barare!!");
    } else {
      userNumList.push(userNum);
    }
    if ( numControl( bombs, userNum ) == true ) {
      boom.play();
      return output.innerHTML = "Hai perso... Punteggio: " + userNumList.length;
    } else if ( userNumList.length == maxNum - nBombe ) {
      kids.play();
      return output.innerHTML = "Hai vinto!! Complimenti!!";
    }
  }
}
