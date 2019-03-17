(function () {
  'use strict';
  
  let timeButton = document.querySelector("#timeButton"), //zmienne na czas
      czas = document.querySelector("#czas"); 
  
  let czasAktualny = function (){                      //funkcja na czas
      czas.textContent = new Date().toLocaleTimeString();
  };
  let Start;
  let przenoszenieElementu;
  let wspolrzedneX;
  let wspolrzedneY;
  Start = function (ev) {
    let boundingClientRect;
    if (ev.target.className.indexOf('pasek') === -1) {      //sprawdzenie czy obiekt posiada klase bar. jesli tak to wykona sie funkcja przenoszenia notatki
      return;
    }
    
    przenoszenieElementu = this;
    
    boundingClientRect = przenoszenieElementu.getBoundingClientRect();   //dzieki temu bedziemy mieli faktycznego polozenie okienka w przegladarce
    
    wspolrzedneY = boundingClientRect.top - ev.clientY;     //w tych zmiennych bedziemy przechowywać absolutne polozenie danej notatki
    wspolrzedneX = boundingClientRect.left - ev.clientX;
  };
  let przenoszenie;
  przenoszenie = function (ev) {    //funkcja na zmienianie połozenia notatki
    if (!przenoszenieElementu) {    //jesli nie przeciagamy zadnego elementu to funkcja sie nie wykona
      return;
    }
    
    let pozX = ev.clientX + wspolrzedneX,
        PozY = ev.clientY + wspolrzedneY;
    
    
    przenoszenieElementu.style.transform = "translateX(" + pozX + "px) translateY(" + PozY + "px)";
  };
  let End;
  End = function () { 
    przenoszenieElementu = null;
    wspolrzedneX = null;
    wspolrzedneY = null;
  };
  let getNoteObject;
  getNoteObject = function(el){
      let textarea = el.querySelector('textarea');
      return{
          transformCSSValue: el.style.transform,
          content: textarea.value,
          id: el.id,
          textarea: {
            width: textarea.style.width,
            height: textarea.style.height,
          }
      };
  };
  let dodanieNotatkiBtn;
  dodanieNotatkiBtn = function () {
      utworzNotke();
    };
  let utworzNotke;
  let zapiszNotke;
  let usunNotke;
  utworzNotke = function (options) {                 //funkcja na tworzenie notatek 
    let elementNotatki = document.createElement('div'),
        elementPaska = document.createElement('div'),
        elementTekstu = document.createElement('textarea'),
        elementTytulu = document.createElement('textarea'),
        elementDaty = document.createElement('div'),
        elementZapisuBtn = document.createElement('button'),
        elementUsuwaniaBtn = document.createElement('button'),
        BOUNDARIES = 400,
        noteConfig = options || {
          content: '',
          id: "sticker_" + new Date().getTime(),
          transformCSSValue : "translateX(" + Math.random() * BOUNDARIES + 
          "px) translateY(" + Math.random() * BOUNDARIES + "px)"
        },
        zapis,
        usun;


        if (noteConfig.textarea) {
          elementTekstu.style.width = noteConfig.textarea.width;
          elementTekstu.style.height = noteConfig.textarea.height;
          elementTekstu.style.resize = 'none';
          
        }
        

    usun = function(){                          //funkcja na usuniecie notatki
       usunNotke(
           getNoteObject(elementNotatki)
       );
       document.body.removeChild(elementNotatki);
    };

    zapis = function(){                       //funkcja na zapisanie notatki
        zapiszNotke(
            getNoteObject(elementNotatki)
          );
    };

    elementNotatki.id = noteConfig.id;
    elementTekstu.value= noteConfig.content;
    elementTytulu.value=noteConfig.content;

    elementZapisuBtn.addEventListener('click',zapis,false);
    elementUsuwaniaBtn.addEventListener('click',usun,false);

    elementZapisuBtn.classList.add('saveButton');
    elementUsuwaniaBtn.classList.add('deleteButton');

    elementNotatki.style.transform = noteConfig.transformCSSValue; 
    
    elementTytulu.classList.add('tytul');
    elementPaska.classList.add('pasek');
    elementNotatki.classList.add('notatka');
    elementDaty.classList.add('date');

    elementPaska.appendChild(elementZapisuBtn);
    elementPaska.appendChild(elementUsuwaniaBtn);
    
    

    elementNotatki.appendChild(elementPaska);
    elementNotatki.appendChild(elementTytulu);
    elementNotatki.appendChild(elementTekstu); 
    elementNotatki.appendChild(elementDaty);
    elementNotatki.appendChild(document.createTextNode("Utworzono: "+czas.textContent));       //utworzenie diva z czasem, aby zadziałało trzeba najpierw kliknąć w przycisk godziny
    elementNotatki.addEventListener('mousedown', Start, false);
    
    document.body.appendChild(elementNotatki);
  };
  let testLocalStorage;
  testLocalStorage = function(){    
      let foo = 'foo';
      try{
          localStorage.setItem(foo,foo);
          localStorage.removeItem(foo);
          return true;
      } catch(e) {
          return false;
      }
  };
  let zaladujNotki;
  let wykonaj;
  wykonaj = function (){    //funkcja bedzie sie uruchamiac przy uruchomieniu programu
      if (!testLocalStorage()){
          let message = "Przepraszamy ale nie mozesz uzyc funkcji local storage";
          message();
      }
      else{
          zapiszNotke = function(note){
              localStorage.setItem(note.id, JSON.stringify(note));
              //tutaj zapiszemy notatke
          };
          usunNotke = function(note){
              localStorage.removeItem(note.id)
              //tutaj usuniemy notatke
          };
          zaladujNotki = function(){
              for(let i = 0; i < localStorage.length; i++) {
                  let noteObject = JSON.parse(
                    localStorage.getItem(
                      localStorage.key(i)
                    )
                  );
                  utworzNotke(noteObject);
                };
              //tutaj załadujemy wszystkie notatki
          };
          zaladujNotki();
      }
      let elementDodaniaNotatkiBtn;
      elementDodaniaNotatkiBtn = document.querySelector('.addNoteBtn');
      elementDodaniaNotatkiBtn.addEventListener('click', dodanieNotatkiBtn, false);
      document.addEventListener('mousemove', przenoszenie, false);    //przy poraszniu myszka wykona sie funkcja przenoszenie
      document.addEventListener('mouseup', End, false);
      timeButton.addEventListener("click", czasAktualny);
  };
  wykonaj();
})();