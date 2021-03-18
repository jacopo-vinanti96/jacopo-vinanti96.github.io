// Dichiarazione variabili
var addProject = $('#add-project'),
    addValue,
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


// Onclick addProject legge valore e lo aggiunge come nuova riga di testo
addProject.on('keydown', function (e) {
// Assegnazione valid per il controllo
  valid = false;
// Se viene premuto enter allora l' algoritmo viene eseguito
  if ( e.keyCode == 13 ) {
    addValue = addProject.val();
    inputControl(addValue);
// Se l' input passa al controllo si chiede la data
    if ( valid == true ) {
      projectDate = prompt("Insert the date\n(Example: today, tomorrow, 31/12/1999)");
      // Si genera la nuova riga
      tempTemplate = lineTemplate.clone();
      tempTemplate.prepend(addValue);
      // Si controlla se la data corrisponde e si aggiunge la riga in HTML
      if ( projectDate.toLowerCase() == "today" ) {
        today.append(tempTemplate);

      } else if ( projectDate.toLowerCase() == "tomorrow" ) {
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
    }
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
