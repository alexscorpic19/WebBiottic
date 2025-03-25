/* global API_CONFIG */
// Or alternatively:
// declare the variable to avoid the linting error
// const API_CONFIG = window.API_CONFIG || {};

/**
 * Script de depuración para el formulario de contacto
 * Para usar: copia y pega este código en la consola del navegador
 * mientras estás en la página de contacto en producción
 */
(function() {
  console.log('=== INICIANDO DEPURACIÓN DEL FORMULARIO DE CONTACTO ===');
  
  // 1. Verificar configuración de API
  console.log('\n1. CONFIGURACIÓN DE API');
  if (typeof API_CONFIG !== 'undefined') {
    console.log('API_CONFIG encontrada:', API_CONFIG);
  } else {
    console.log('API_CONFIG no está disponible globalmente');
    
    // Intentar encontrar la configuración en el código
    const scripts = document.querySelectorAll('script');
    let apiConfigFound = false;
    
    scripts.forEach(script => {
      if (script.textContent && script.textContent.includes('API_CONFIG')) {
        console.log('Encontrada referencia a API_CONFIG en script');
        apiConfigFound = true;
      }
    });
    
    if (!apiConfigFound) {
      console.log('No se encontró referencia a API_CONFIG en los scripts');
    }
  }
  
  // 2. Probar una solicitud manual
  console.log('\n2. PROBANDO SOLICITUD MANUAL');
  const testData = {
    name: 'Test User (Browser Debug)',
    email: 'test@example.com',
    message: 'This is a test message from browser debug tool',
    phone: '1234567890',
    company: 'Test Company'
  };
  
  console.log('Enviando solicitud a /api/contact');
  fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(testData),
  })
  .then(response => {
    console.log('Respuesta recibida:');
    console.log('- Status:', response.status, response.statusText);
    console.log('- Headers:', Object.fromEntries([...response.headers.entries()]));
    return response.json().catch(() => response.text());
  })
  .then(data => {
    console.log('- Body:', data);
    console.log('✅ Solicitud manual completada');
  })
  .catch(error => {
    console.error('❌ Error en solicitud manual:', error);
  });
  
  // 3. Monitorear futuras solicitudes fetch
  console.log('\n3. MONITOREANDO SOLICITUDES FETCH');
  const originalFetch = window.fetch;
  window.fetch = function(url, options) {
    console.log('Interceptada solicitud fetch a:', url);
    console.log('Opciones:', options);
    
    return originalFetch(url, options)
      .then(response => {
        console.log('Respuesta para', url, ':', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries([...response.headers.entries()])
        });
        
        // Clonar la respuesta para no consumirla
        const clonedResponse = response.clone();
        
        // Intentar leer el cuerpo como JSON
        clonedResponse.json().catch(() => clonedResponse.text())
          .then(body => {
            console.log('Cuerpo de la respuesta para', url, ':', body);
          })
          .catch(err => {
            console.log('No se pudo leer el cuerpo de la respuesta:', err);
          });
        
        return response;
      })
      .catch(error => {
        console.error('Error en solicitud a', url, ':', error);
        throw error;
      });
  };
  
  console.log('Monitoreo de fetch activado. Intenta enviar el formulario ahora.');
  console.log('=== FIN DE LA CONFIGURACIÓN DE DEPURACIÓN ===');
})();
