# Actividad 5: Manejo y Validación de Formularios Web
## Módulo 3: Formularios en JavaScript y Separación de Responsabilidades

### 📖 Descripción del Proyecto
Formulario completo para registro de asistentes a una convención o evento. Se realizó una refactorización integral del código base inicial separando la estructura (**HTML**), la presentación (**CSS**) y el comportamiento (**JavaScript**) en archivos independientes, agregando más de 4 validaciones adicionales personalizadas y mejorando sustancialmente la experiencia de usuario (UX).

### 🎯 Objetivos y Validaciones Implementadas
- [x] **Modularización:** Separación en `index.html`, `style.css` y `app.js`.
- [x] **Validación de Nombre:** Longitud mínima y restricción de caracteres numéricos.
- [x] **Validación 1 Adicional (Correo):** Comprobación rigurosa de formato email mediante expresión regular.
- [x] **Validación 2 Adicional (Teléfono):** Control de exactamente 10 dígitos numéricos.
- [x] **Validación 3 Adicional (Fecha):** Restricción de selección temporal para impedir fechas del pasado.
- [x] **Validación 4 Adicional (Archivo Adjunto):** Comprobación de peso máximo (2MB) y extensiones MIME autorizadas (PDF, JPG, PNG).
- [x] **Validación de Grupos:** Asegura al menos una casilla de intereses marcada y un turno seleccionado.
- [x] **Feedback visual:** Mensajes de error específicos debajo de cada campo con eliminación reactiva al escribir.

### 🚀 Cómo Ejecutar
Abre `index.html` en cualquier navegador web.
