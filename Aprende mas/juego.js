const sonidoCorrecto = new Audio("correcto.mp3");
const sonidoIncorrecto = new Audio("error.mp3");

const opciones = document.querySelectorAll('.opcion');
const botonSiguiente = document.querySelector('.boton-siguiente');
const temporizador = document.getElementById('temporizador');

let tiempo = 30;
let intervalo;
let respondido = false;

function iniciarTemporizador() {
  intervalo = setInterval(() => {
    tiempo--;
    temporizador.textContent = `Tiempo: ${tiempo}`;

    if (tiempo === 0 && !respondido) {
      clearInterval(intervalo);
      marcarIncorrectaPorTiempo();
    }
  }, 1000);
}

iniciarTemporizador();

function marcarIncorrectaPorTiempo() {
  respondido = true;
  opciones.forEach(btn => {
    btn.disabled = true;
  });
  temporizador.textContent = "¡Tiempo agotado!";
  botonSiguiente.style.display = 'flex';
  sonidoIncorrecto.play(); 
}

opciones.forEach(opcion => {
  opcion.addEventListener('click', () => {
    if (respondido) return;
    respondido = true;
    clearInterval(intervalo);

    opciones.forEach(btn => {
      btn.disabled = true;
    });

    const esCorrecta = opcion.getAttribute('data-correcta') === 'true';

    if (esCorrecta) {
      opcion.style.backgroundColor = '#00ff00ff';
      sonidoCorrecto.play();
    } else {
      opcion.style.backgroundColor = '#ff1900ff';
      sonidoIncorrecto.play();
    }

    botonSiguiente.style.display = 'flex';
  });
});
