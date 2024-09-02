var containerImagens = document.getElementById("imagens-carrossel");
var totalImagens = containerImagens.children.length;
var indiceImagemAtual = 0;
var autoSlideInterval = setInterval(() => moverCarrossel(1), 10000);

containerImagens.style.width = `${totalImagens * 100}%`;
for(var i = 0; i < totalImagens; i++){
    containerImagens.children[i].style.width = `${100 / totalImagens}%`;
}

function atualizaPosicaoCarrossel() {
    var percentualTransform = `translateX(-${
        (indiceImagemAtual * 100) / totalImagens
    }%)`;
    if(indiceImagemAtual == 0) {
        containerImagens.style.transition = "none";
        containerImagens.style.transform = "translateX(0)";
        setTimeout(() => {
            containerImagens.style.transition = "transform 0.5s ease-in-out";
            requestAnimationFrame(() => {
                containerImagens.style.transform = percentualTransform;
            });
        }, 50);
    } else {
        containerImagens.style.transition = "transform 0.5s ease-in-out";
        containerImagens.style.transform = percentualTransform;
    }
}

function moverCarrossel(direcao) {
    indiceImagemAtual =
    (indiceImagemAtual + direcao + totalImagens) %totalImagens;
    atualizaPosicaoCarrossel();
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => moverCarrossel(1), 10000);
}

let currentIndex = 0;

function loadImages(startIndex) {
  const carousel = document.querySelector(".carousel");
  const images = Array.from(
    document.querySelectorAll(".carousel-container img")
  );
  carousel.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const imgIndex = (startIndex + i) % images.length;
    const img = images[imgIndex].cloneNode();
    carousel.appendChild(img);
  }
}

function nextImage() {
  const images = document.querySelectorAll(".carousel-container img");
  currentIndex = (currentIndex + 1) % images.length;
  loadImages(currentIndex);
}

function prevImage() {
  const images = document.querySelectorAll(".carousel-container img");
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  loadImages(currentIndex);
}

document.addEventListener("DOMContentLoaded", () => {
  loadImages(currentIndex);
});
