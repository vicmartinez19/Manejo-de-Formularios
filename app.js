// Elementos del formulario
const form = document.getElementById('registroEvento');
const alertBox = document.getElementById('alert-box');

// Función auxiliar para mostrar error en un campo
function showError(fieldId, errorElementId, message) {
  const errorElem = document.getElementById(errorElementId);
  const inputElem = document.getElementById(fieldId);
  if (errorElem) errorElem.textContent = message;
  if (inputElem) inputElem.classList.add('input-error');
}

// Función auxiliar para limpiar error en un campo
function clearError(fieldId, errorElementId) {
  const errorElem = document.getElementById(errorElementId);
  const inputElem = document.getElementById(fieldId);
  if (errorElem) errorElem.textContent = '';
  if (inputElem) inputElem.classList.remove('input-error');
}

// Limpieza general de todos los errores
function clearAllErrors() {
  const errorMessages = document.querySelectorAll('.error-msg');
  errorMessages.forEach((msg) => (msg.textContent = ''));

  const errorInputs = document.querySelectorAll('.input-error');
  errorInputs.forEach((input) => input.classList.remove('input-error'));

  alertBox.className = 'alert-box hidden';
  alertBox.innerHTML = '';
}

// Validación en tiempo real al escribir o modificar campos
const fieldsToWatch = ['nombre', 'correo', 'telefono', 'fecha', 'hora', 'archivo'];
fieldsToWatch.forEach((id) => {
  const elem = document.getElementById(id);
  if (elem) {
    elem.addEventListener('input', () => clearError(id, `error-${id}`));
    elem.addEventListener('change', () => clearError(id, `error-${id}`));
  }
});

// Listener para el evento submit
form.addEventListener('submit', function (event) {
  event.preventDefault();
  clearAllErrors();

  let isValid = true;

  // 1. Obtención de valores
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const intereses = document.querySelectorAll('input[name="intereses"]:checked');
  const horario = document.querySelector('input[name="horario"]:checked');
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const archivoInput = document.getElementById('archivo');

  // 2. Validación: Nombre completo (al menos 3 caracteres alfabéticos)
  const regexNombre = /^[a-zA-ZÀ-ÿ\s]{3,60}$/;
  if (!nombre) {
    showError('nombre', 'error-nombre', 'El nombre completo es obligatorio.');
    isValid = false;
  } else if (!regexNombre.test(nombre)) {
    showError('nombre', 'error-nombre', 'Ingresa un nombre válido (al menos 3 caracteres, sin números ni símbolos).');
    isValid = false;
  }

  // 3. Validación Adicional 1: Expresión regular para correo electrónico
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correo) {
    showError('correo', 'error-correo', 'El correo electrónico es obligatorio.');
    isValid = false;
  } else if (!regexCorreo.test(correo)) {
    showError('correo', 'error-correo', 'Ingresa un formato de correo válido (ej: usuario@dominio.com).');
    isValid = false;
  }

  // 4. Validación Adicional 2: Teléfono de exactamente 10 dígitos numéricos
  const regexTelefono = /^\d{10}$/;
  if (!telefono) {
    showError('telefono', 'error-telefono', 'El número de teléfono es obligatorio.');
    isValid = false;
  } else if (!regexTelefono.test(telefono)) {
    showError('telefono', 'error-telefono', 'El teléfono debe contener exactamente 10 dígitos numéricos.');
    isValid = false;
  }

  // 5. Validación: Al menos un interés seleccionado
  if (intereses.length === 0) {
    const errorElem = document.getElementById('error-intereses');
    if (errorElem) errorElem.textContent = 'Debes seleccionar al menos un área de interés.';
    isValid = false;
  }

  // 6. Validación: Horario preferido
  if (!horario) {
    const errorElem = document.getElementById('error-horario');
    if (errorElem) errorElem.textContent = 'Por favor, selecciona tu horario preferido.';
    isValid = false;
  }

  // 7. Validación Adicional 3: Fecha del evento no puede estar en el pasado
  if (!fecha) {
    showError('fecha', 'error-fecha', 'La fecha del evento es obligatoria.');
    isValid = false;
  } else {
    const fechaSeleccionada = new Date(`${fecha}T00:00:00`);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoy) {
      showError('fecha', 'error-fecha', 'La fecha del evento no puede estar en el pasado.');
      isValid = false;
    }
  }

  // 8. Validación: Hora preferida
  if (!hora) {
    showError('hora', 'error-hora', 'Por favor, indica una hora preferida.');
    isValid = false;
  }

  // 9. Validación Adicional 4: Archivo opcional (tamaño máx 2MB y formato PDF/JPG/PNG)
  if (archivoInput && archivoInput.files.length > 0) {
    const file = archivoInput.files[0];
    const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
    const allowedExtensions = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

    if (file.size > maxSizeInBytes) {
      showError('archivo', 'error-archivo', 'El archivo no debe exceder los 2 MB de tamaño.');
      isValid = false;
    } else if (!allowedExtensions.includes(file.type)) {
      showError('archivo', 'error-archivo', 'Formato no permitido. Solo se aceptan archivos PDF, JPG o PNG.');
      isValid = false;
    }
  }

  // 10. Si todo es válido
  if (isValid) {
    const interesesSeleccionados = Array.from(intereses).map((i) => i.value).join(', ');
    alertBox.className = 'alert-box success';
    alertBox.innerHTML = `
      <strong>🎉 ¡Registro Completado con Éxito!</strong><br>
      Bienvenido(a), <strong>${nombre}</strong>. Hemos enviado un correo de confirmación a <strong>${correo}</strong>.<br>
      • Fecha: ${fecha} a las ${hora}<br>
      • Turno: ${horario.value}<br>
      • Intereses: ${interesesSeleccionados}
    `;

    form.reset();
  }
});