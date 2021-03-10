// Genera un numero casuale
function genRandomNum( max, min ) {
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}

// Controllo se il numero è uguale ai precedenti
function numControl( array, num ) {
  for ( var j = 0; j < array.length; j++ ) {
    if ( num == array[j] ) {
      return true;
    }
  }
  return false;
}

function displayBtn (btnMaxValue, htmlElement) {
  for ( var i = 1; i < btnMaxValue + 1; i++ ) {
    htmlElement.innerHTML += "<input type=\"checkbox\" name=\"button\" class=\"btn\" onclick=\"btnValue()\" value =" + i + ">" + "<span class=\"checkbox-number\">" + i + "</span>";
  }
}

function eleminateBtn (btnMaxValue, htmlElement) {
  for ( var i = 1; i < btnMaxValue + 1; i++ ) {
    htmlElement.innerHTML = "";
  }
}

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

// Onclick inizia la funzione
function startGame() {


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

  displayBtn(maxNum, containerBtn);
}

function btnValue() {
  if ( userNumList.length < maxNum - nBombe ) {
    var buttonsHTML = document.querySelectorAll('.btn');
    var buttonValue = 0;
    var clicked = false;
    var userLose = false;

    for ( var i = 0; i < maxNum; i++) {
      if ( buttonsHTML[i].checked == true ) {
        buttonValue = buttonsHTML[i].value
        if ( numControl( bombs, buttonValue ) == true ) {
          boom.play();
          output.classList.add("visible");
          eleminateBtn (maxNum, containerBtn);
          return output.innerHTML = "Hai perso... Punteggio: " + userNumList.length;
        } else {
          buttonsHTML[i].classList.add("clicked");
          console.log(buttonsHTML[i]);
          console.log(buttonsHTML[i].value);
        }
      }
    }

    userNumList.push(buttonValue);
    console.log(userNumList);

  } else if ( userNumList.length == maxNum - nBombe ) {
    kids.play();
    return output.innerHTML = "Hai vinto!! Complimenti!!";
  }
}
