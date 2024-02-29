function lanzarDados() {
  // Lanza los tres dados y devuelve la suma de los resultados
  return Math.floor(Math.random() * 9 + 1) + Math.floor(Math.random() * 9 + 1) + Math.floor(Math.random() * 9 + 1);
}

function calcularDireccion(galaxia) {
  // Calcula la dirección de la galaxia a partir de su número
  return galaxia.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
}

function movimientoActual(galaxiaActual, galaxiaSiguiente) {
  // Calcula la diferencia absoluta entre las direcciones de dos galaxias
  return Math.abs(calcularDireccion(galaxiaActual) - calcularDireccion(galaxiaSiguiente));
}

function jugar() {
  // Inicializa la posición del jugador y el contador de turnos
  let posicion = 1;
  let turnos = 0;
  let output = document.getElementById('output');
  output.innerHTML = ''; // Limpiar contenido anterior

  while (true) {
    let mensaje = `<p id="turno">Turno: ${turnos}</p><p id="posicion">Posición actual: ${posicion}</p>`;

    // Lanzar los dados y calcular la próxima galaxia
    let proximaGalaxia = lanzarDados();

    // Verificar si se encuentra con un peligro
    if (posicion === 31) {
      mensaje += `<p id="final">¡Te has encontrado con extraterrestres peligrosos! Vuelves a la casilla 13</p>`;
      posicion = 13; // Volver a la casilla 13
    } else {
      // Calcular el movimiento y actualizar la posición
      let movimiento = movimientoActual(posicion, proximaGalaxia);
      mensaje += `<p id="posicion">Movimiento: ${movimiento}</p>`;
      posicion = (posicion + movimiento) % 42;
      
      // Verificar si ha llegado al final del juego
      if (posicion === 0) {
        posicion = 42;
      }
      mensaje += `<p id="posicion">Nueva posición: ${posicion}</p>`;

      if (posicion === 42) {
        mensaje += `<h1 id="final">¡Felicidades! ¡Has llegado al final del juego!</h1>`;
        output.innerHTML += mensaje;
        break;
      }
    }

    // Verificar si se ha encontrado un agujero negro después de moverse
    if (posicion === 33) {
      mensaje += `<h1 id="final">¡Te has encontrado con un agujero negro! ¡Has perdido!</h1>`;
      output.innerHTML += mensaje;
      break;
    }

    // Incrementar el número de turnos
    turnos++;

    // Mostrar el mensaje en el área de salida
    output.innerHTML += mensaje;
  }
}
