function procesarValores() {
  const expr = document.getElementById('valor1').value;
  let x0 = parseFloat(document.getElementById('valor2').value);

  const maxIter = 20;
  const tol = 0.00001;

  try {
    const f = math.parse(expr);
    const fDeriv = math.derivative(f, 'x');
    const fEval = f.compile();
    const fPrimeEval = fDeriv.compile();

    let iter = 0;
    let error = Infinity;

    // Empezamos a construir el resultado como HTML
    let salida = `<div><strong>f(x):</strong> ${f.toString()}</div>`;
    salida += `<div><strong>f'(x):</strong> ${fDeriv.toString()}</div><br>`;

    while (iter < maxIter && error > tol) {
      const fx = fEval.evaluate({ x: x0 });
      const fpx = fPrimeEval.evaluate({ x: x0 });

      if (fpx === 0) {
        salida += `<div class="error">Derivada cero en x = ${x0}. Método detenido.</div>`;
        document.getElementById('resultado').innerHTML = salida;
        return;
      }

      const x1 = x0 - fx / fpx;
      error = Math.abs(x1 - x0);

      // Mostramos cada paso como un bloque con espaciado
      salida += `
        <div class="paso">
          <strong>Iteración ${iter + 1}</strong><br>
          x = ${x0}<br>
          f(x) = ${fx}<br>
          f'(x) = ${fpx}<br>
          x siguiente = ${x1}<br>
          error = ${error}<br>
        </div>
        <br>
      `;

      x0 = x1;
      iter++;
    }

    salida += `<div class="final"><strong>Aproximación final:</strong> x ≈ ${x0}</div>`;

    // Mostramos el resultado formateado
    document.getElementById('resultado').innerHTML = salida;
  } catch (error) {
    document.getElementById('resultado').innerHTML = 
      `<div class="error">Error en la función ingresada.</div>`;
  }
}