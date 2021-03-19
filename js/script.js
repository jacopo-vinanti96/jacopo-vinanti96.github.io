// Dichiarazione variabili
var addProject = $('#add-project'),
    addValue,
    date = new Date,
    detailsTemplate = $('.template .details-template'),
    lineTemplate = $('.list-template .list-element'),
    projectDate,
    tempTemplate,
    today = $('#today'),
    tomorrow = $('#tomorrow'),
    valid;



// Dichiarazione funzione di controllo del testo
function inputControl (word) {

  // Controllo se l' input è vuoto
  if (word.length === 0 || !word.trim()) {
    alert("Please enter a word");
  } else {
    valid = true;
  }
}

// Date dev' essere il valore di un input date
function reverseDate (date) {
  let userDay = date[8] + date[9];
  let userMonth = date[5] + date[6];
  let userYear = date[0] + date[1] + date[2] + date[3];
  return `${userDay}/${userMonth}/${userYear}`;
}

// Dichiarazione giorno attuale e giorno successivo e conversione
var month = date.getUTCMonth() + 1; //mesi da 1-12

if ( month < 10 ) {
  month = `0${month}`;
  console.log("lunghezza 1");
}

const day = date.getUTCDate();
const year = date.getUTCFullYear();
// Conversione
const currentDate = `${day}/${month}/${year}`;
const duedate = `${day + 1}/${month}/${year}`;


// Funzione per aggiungere un progetto
function addProjectLine () {
  // Assegnazione valid per il controllo
  valid = false;
  // Assegnazione valore dell' input
  addValue = addProject.val();
  //Controllo dell' input
  inputControl(addValue);
  // Se l' input passa al controllo si chiede la data
  if ( valid == true ) {
    // Input data dell' utente
    projectDate = $('.user-date').val();
    // Si modifica la data
    projectDate = reverseDate(projectDate);

    console.log(currentDate);
    console.log(duedate);

    // Si genera la nuova riga
    tempTemplate = lineTemplate.clone();
    tempTemplate.prepend(addValue);
    // Si controlla se la data corrisponde e si aggiunge la riga in HTML
    if ( projectDate == currentDate ) {
      today.append(tempTemplate);

    } else if ( projectDate == duedate ) {
      tomorrow.append(tempTemplate);
    //Altrimenti se la data non è tra le predefinite
    } else {
      // Dichiarazione variabili
      var appended = false;
      //Le date inserite dall' utente
      var userDates = $('div:not(.template) > .details-template .summary-title');

      // Se sono state inserite date personalizzate si controlla la data
      if ( userDates.length > 0 ) {
        for (var i = 0; i < userDates.length; i++) {
          // Se la data esiste già allora si aggiunge la riga a questa data
          if ( $(userDates[i]).text() == projectDate ) {

            $(userDates[i])
            .parent('.summary-template')
            .siblings('.list-template')
            .append(tempTemplate);

            appended = true;
          }
        }
      }
      // Altrimenti appended non è true quindi la data è nuova
      if ( appended == false ) {
        tempTemplate = detailsTemplate.clone();
        tempTemplate.find('.summary-title').append( projectDate );
        tempTemplate.find('.list-element').prepend(addValue);
        $('.list__container').append(tempTemplate);
      }
    }
    addProject.val("");
  }
}


// Onclick addProject legge valore e lo aggiunge come nuova riga di testo
addProject.on('keydown', function (e) {
// Se viene premuto enter allora l' algoritmo viene eseguito
  if ( e.keyCode == 13 ) {
    addProjectLine();
    $('.instruction').removeClass('visible');
    firstKeyDown = true;
  }
});

// Funzione per rendere visibile le istruzioni qualora l' input non sia vuoto
var firstKeyDown = true;

addProject.on('keyup', function (e) {

  if ( addProject.val() == "" ) {
    $('.instruction').removeClass('visible');
    firstKeyDown = true;
  } else if ( firstKeyDown = true ) {
    $('.instruction').addClass('visible');
    firstKeyDown = false;
  }
});

$('.list__container').on( 'click', '.list-element', function () {
  var detailsNotTemplate = $('div:not(.template) > .details-template');
  $(this).addClass('clicked');
  setTimeout( function () {
    $(".list-element.clicked").remove();
    for (var i = 0; i < detailsNotTemplate.length; i++) {
      if ( $(detailsNotTemplate[i]).find('.list-element').length == 0 ) {
        $(detailsNotTemplate[i]).remove();
      }
    }
  }, 1000);
});
