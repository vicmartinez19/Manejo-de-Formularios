document.getElementById('registroEvento').addEventListener('submit', function (event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const telefono = document.getElementById('telefono').value;
  const intereses = document.querySelectorAll('input[name="intereses"]:checked');
  const horario = document.querySelector('input[name="horario"]:checked');

  if (!nombre || !correo || !telefono || intereses.length === 0 || !horario) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
  }

  alert('Registro exitoso. ¡Gracias por registrarte!');
});