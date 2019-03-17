$( function() {
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();
let fileName = "";

const downloadBtn = document.getElementById("download-btn");
const uploadFile = document.getElementById("upload-file");
const revertBtn = document.getElementById("revert-btn");

// Funkcja na dodanie pliku
uploadFile.addEventListener("change", () => {
  const file = document.getElementById("upload-file").files[0];
  const reader = new FileReader();

  if (file) {
    fileName = file.name;
    reader.readAsDataURL(file);
  }

  // Funkcja na dodanie obrazka do canvas
  reader.addEventListener(
    "load",
    () => {
      //Stworz obraz
      img = new Image();
     //ustaw zrodlo
      img.src = reader.result;
     //zaladuj do canvas
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        canvas.removeAttribute("data-caman-id");
      };
    },
    false
  );
});

// Filtry
document.addEventListener("click", e => {
  if (e.target.classList.contains("filter-btn")) {
    //funkcja na zwiekszenie jasnosci
    if (e.target.classList.contains("brightness-add")) {
      Caman("#canvas", img, function() {
        this.brightness(5).render();
      });
    //funkcja na zmniejszenie jasnosci
    } else if (e.target.classList.contains("brightness-remove")) {
      Caman("#canvas", img, function() {
        this.brightness(-5).render();
      });
    }
    //funkcja na zwiekszenie kontrastu
      else if (e.target.classList.contains("contrast-add")) {
      Caman("#canvas", img, function() {
        this.contrast(5).render();
      });
    } 
    //funkcja na zmneijszenie kontrastu
      else if (e.target.classList.contains("contrast-remove")) {
      Caman("#canvas", img, function() {
        this.contrast(-5).render();
      });
    } 
    //funkcja na zwiekszenie nasycenia
      else if (e.target.classList.contains("saturation-add")) {
      Caman("#canvas", img, function() {
        this.saturation(5).render();
      });
    } 
    //funkcja na zmniejszenie nasycenia
      else if (e.target.classList.contains("saturation-remove")) {
      Caman("#canvas", img, function() {
        this.saturation(-5).render();
      });
    } 
    //funkcja na zwiekszenie "vibrance" nie jestem pewien jak przetłumaczyć ale dziala podobnie do nasycenia
      else if (e.target.classList.contains("vibrance-add")) {
      Caman("#canvas", img, function() {
        this.vibrance(5).render();
      });
    } 
    //funkcja na zmniejszenie "vibrance"
      else if (e.target.classList.contains("vibrance-remove")) {
      Caman("#canvas", img, function() {
        this.vibrance(-5).render();
      });
    } 
    //funkcja na dodanie "vintage"
      else if (e.target.classList.contains("vintage-add")) {
      Caman("#canvas", img, function() {
        this.vintage().render();
      });
    } 
    //funkcja na dodanie efektu Lomo
      else if (e.target.classList.contains("lomo-add")) {
      Caman("#canvas", img, function() {
        this.lomo().render();
      });
    } 
    //funkcja na dodanie efektu clarity
      else if (e.target.classList.contains("clarity-add")) {
      Caman("#canvas", img, function() {
        this.clarity().render();
      });
    } 
    //funkcja na sin city (wyróżnienie koloru)
      else if (e.target.classList.contains("sincity-add")) {
      Caman("#canvas", img, function() {
        this.sinCity().render();
      });
    } 
    //funkcja na cross process
      else if (e.target.classList.contains("crossprocess-add")) {
      Caman("#canvas", img, function() {
        this.crossProcess().render();
      });
    } 
    //funkcja na efekt pinhole
      else if (e.target.classList.contains("pinhole-add")) {
      Caman("#canvas", img, function() {
        this.pinhole().render();
      });
    } 
    //funkcja na efekt nostalgii
      else if (e.target.classList.contains("nostalgia-add")) {
      Caman("#canvas", img, function() {
        this.nostalgia().render();
      });
    } 
    //funkcja na efekt 
      else if (e.target.classList.contains("hermajesty-add")) {
      Caman("#canvas", img, function() {
        this.herMajesty().render();
      });
    }
  }
});

// Funkcja na reset filtrów
revertBtn.addEventListener("click", e => {
  Caman("#canvas", img, function() {
    this.revert();
  });
});



// Funkcja na pobranie zedytowanego obrazka przez canvas
downloadBtn.addEventListener("click", () => {
  const fileExtension = fileName.slice(-4);
  let newFilename;
  if (fileExtension === ".jpg" || fileExtension === ".png") {
    newFilename = fileName.substring(0, fileName.length - 4) + "-edited.jpg";
  }
  //wywolaj funkcje pobierz
  download(canvas, newFilename);
});

// Funkcja pobierz
function download(canvas, filename) {
  let e;
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/jpeg", 0.8);
  e = new MouseEvent("click");
  link.dispatchEvent(e);
}
});