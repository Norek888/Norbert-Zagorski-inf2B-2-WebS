function winload()
{
let minuty = document.getElementById("minuty");         //zmienne do liczenia czasu
let sekundy = document.getElementById("sekundy");
let sumaSekund = 0;
setInterval(ustawCzas, 1000);

function ustawCzas()                    //funkcje na liczenie czasy
{            
  ++sumaSekund;
  sekundy.innerHTML = pad(sumaSekund % 60);
  minuty.innerHTML = pad(parseInt(sumaSekund / 60));
}

function pad(val) 
{
  let valString = val + "";
  if (valString.length < 2) 
  {
    return "0" + valString;
  } 
  else 
  {
    return valString;
  }
}
let i = 0;
    if (window.DeviceMotionEvent)                   //funkcja poruszania kulą
    {
        window.addEventListener('devicemotion', function(ev) 
        {
            let height = document.documentElement.clientHeight;
            let width = document.documentElement.clientWidth;
            let acc = ev.accelerationIncludingGravity;
            X=acc.x;
            Y=acc.y;
            X=0-X;
            X=X+10;
            Y=Y+10;
            X*=50;
            Y*=50;
            X=(X*width)/1000;
            Y=(Y*height)/1000;
            let hY = Y;
            let hX = X;
            document.getElementById("kula").style.left=hX;
            document.getElementById("kula").style.top=hY;
        }, false);
    }
    else {
        alert("Nie można zagrać na tym urządzeniu");
    }
    let wygrana = false;
    function loaded()
    {
        function umiescdziure()                                         //funkcja umieszcza dziure w losowym miejscu
        {
            let hh = document.documentElement.clientHeight;
            let ww = document.documentElement.clientWidth;
            let losoweX = (Math.floor(Math.random() * ww ) + 1);
            let losoweY = (Math.floor(Math.random() * hh ) + 1);
            document.getElementById("dziura").style.left = losoweX;
            document.getElementById("dziura").style.top = losoweY;
            return losoweX, losoweY;
        }
        umiescdziure();
        function rozgrywka()                                         //rozgrywka
        {
            let xx = parseInt(document.getElementById("dziura").style.left);
            let yy = parseInt(document.getElementById("dziura").style.top);
            let kulaX = parseInt(document.getElementById("kula").style.left);
            let kulaY = parseInt(document.getElementById("kula").style.top);
            if(kulaX >= xx && kulaX <= xx + 20 && kulaY >= yy && kulaY <= yy + 20)      //warunek wygranej           
            {                                                                           //jesli sie zgadzaja wspolrzedne kuli i dziury nastepuje wygrana
                umiescdziure();
                alert("Brawo ! To teraz kolejny :D")
                i = i + 1;
                document.getElementById("kula").style.top = "5px";
                document.getElementById("kula").style.left = "5px";
                wygrana = true;
                document.getElementById("wynik").innerHTML = "wynik: " + i;
            }
            else
            {
                wygrana = false;
            }
            return wygrana;
        }
    
        let t = setInterval(rozgrywka, 10)              //reset dziur
        if(wygrana == true)
        {
            clearInterval(t);
            wygrana = false
        }
        else{("")}
    }
    setTimeout(loaded, 10)
    alert("Poruszaj urzadzeniem aby dotoczyć kule do dziury")
}
