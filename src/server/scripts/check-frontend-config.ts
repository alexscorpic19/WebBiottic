import fs from 'fs';
import path from 'path';

function checkFrontendConfig() {
  console.log('=== VERIFICACIÓN DE CONFIGURACIÓN DEL FRONTEND ===\n');
  
  // 1. Verificar configuración de API
  console.log('1. VERIFICANDO CONFIGURACIÓN DE API');
  try {
    const configPath = path.resolve(process.cwd(), 'src/config/index.ts');
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    console.log('Contenido del archivo de configuración:');
    console.log(configContent);
    
    // Verificar si la configuración de API es correcta
    if (configContent.includes('BASE_URL:') && configContent.includes('/api')) {
      console.log('✅ Configuración de API encontrada');
      
      // Extraer la configuración de BASE_URL
      const baseUrlMatch = configContent.match(/BASE_URL:.*?(['"])(.+?)\1/s);
      if (baseUrlMatch) {
        console.log(`- BASE_URL configurada como: ${baseUrlMatch[2]}`);
      } else {
        console.log('❌ No se pudo determinar BASE_URL exacta');
      }
      
      // Verificar si hay lógica condicional para producción vs desarrollo
      if (configContent.includes('window.location.hostname') || configContent.includes('process.env')) {
        console.log('✅ Detectada lógica condicional para entornos');
      } else {
        console.log('❌ No se detectó lógica para diferenciar entornos');
      }
    } else {
      console.log('❌ No se encontró configuración de API');
    }
  } catch (error) {
    console.error('❌ Error al leer archivo de configuración:', error);
  }
  
  // 2. Verificar implementación del formulario de contacto
  console.log('\n2. VERIFICANDO IMPLEMENTACIÓN DEL FORMULARIO DE CONTACTO');
  try {
    const contactPath = path.resolve(process.cwd(), 'src/pages/Contact.tsx');
    const contactContent = fs.readFileSync(contactPath, 'utf8');
    
    // Verificar si se está usando la configuración correcta
    if (contactContent.includes('API_CONFIG.BASE_URL') && contactContent.includes('API_CONFIG.ENDPOINTS.CONTACT')) {
      console.log('✅ Formulario usa configuración de API correctamente');
    } else {
      console.log('❌ Formulario no usa configuración de API correctamente');
    }
    
    // Verificar manejo de errores
    if (contactContent.includes('catch (error)') && contactContent.includes('console.error')) {
      console.log('✅ Formulario implementa manejo de errores');
    } else {
      console.log('❌ Formulario no implementa manejo de errores adecuado');
    }
    
    // Verificar si hay logs de depuración
    if (contactContent.includes('console.log(')) {
      console.log('✅ Formulario incluye logs de depuración');
    } else {
      console.log('❌ Formulario no incluye logs de depuración');
    }
  } catch (error) {
    console.error('❌ Error al leer archivo del formulario de contacto:', error);
  }
  
  console.log('\n=== FIN DE LA VERIFICACIÓN ===');
}

checkFrontendConfig();