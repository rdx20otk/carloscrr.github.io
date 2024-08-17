
document.addEventListener("DOMContentLoaded", function() {
  // Selecciona el formulario por su ID
  const form = document.getElementById('form-contact');
  // Selecciona el elemento donde se mostrarán los mensajes de estado
  const statusMessage = document.getElementById('status-message');

  // Agrega un evento al formulario que se ejecuta cuando se envía
  form.addEventListener('submit', function(event) {
      // Previene el envío normal del formulario
      event.preventDefault();

      // Crea un objeto FormData con los datos del formulario
      const formData = new FormData(form);

      // Usa la API Fetch para enviar el formulario a Formspree
      fetch('https://formspree.io/f/xqazlwel', {
          method: 'POST', // Método HTTP POST
          body: formData, // Datos del formulario
          headers: {
              'Accept': 'application/json' // Indica que se espera una respuesta en formato JSON
          }
      }).then(response => {
          // Si la respuesta del servidor es correcta (status 200-299)
          if (response.ok) {
              // Muestra un mensaje de éxito
              statusMessage.innerHTML = '¡Gracias! El formulario ha sido enviado con éxito.';
              statusMessage.style.display = 'block'; // Muestra el mensaje
              form.reset(); // Resetea el formulario

              // Desaparece el mensaje después de 5 segundos
              setTimeout(() => {
                  statusMessage.style.display = 'none';
              }, 5000);
          } else {
              // Si hay un error, intenta procesar la respuesta JSON para obtener más información
              response.json().then(data => {
                  // Si la respuesta contiene errores específicos, los muestra
                  if (Object.hasOwn(data, 'errors')) {
                      statusMessage.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                  } else {
                      // Si no, muestra un mensaje genérico de error
                      statusMessage.innerHTML = 'Oops! Hubo un problema al enviar el formulario.';
                  }
                  statusMessage.style.display = 'block'; // Muestra el mensaje

                  // Desaparece el mensaje después de 5 segundos
                  setTimeout(() => {
                      statusMessage.style.display = 'none';
                  }, 5000);
              });
          }
      }).catch(error => {
          // Si hay un problema con la solicitud Fetch, muestra un mensaje de error
          statusMessage.innerHTML = 'Oops! Hubo un problema al enviar el formulario.';
          statusMessage.style.display = 'block'; // Muestra el mensaje

          // Desaparece el mensaje después de 5 segundos
          setTimeout(() => {
              statusMessage.style.display = 'none';
          }, 5000);
      });
  });
});

//evita que se use el click derecho en la web
document.addEventListener('contextmenu', event => event.preventDefault());

//Manejo de enlaces
function scrollToSection(event, sectionId) {
  event.preventDefault(); // Evita el comportamiento predeterminado del enlace
  const section = document.getElementById(sectionId);
  if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
  }
}