import fs from 'fs';
import path from 'path';

function checkFrontendConfig() {
  console.log('=== VERIFICACIÓN DE CONFIGURACIÓN DEL FRONTEND ===\n');
  
  // Check if we're in production or development
  const isProduction = process.env.NODE_ENV === 'production' || !fs.existsSync(path.resolve(process.cwd(), 'src'));
  
  if (isProduction) {
    console.log('Entorno detectado: PRODUCCIÓN');
    
    // In production, check the assets directory instead of dist/assets
    try {
      // Check if the assets directory exists
      const assetsDir = path.resolve(process.cwd(), 'assets');
      if (fs.existsSync(assetsDir)) {
        console.log('✅ Directorio de assets encontrado');
        
        // List JS files to find the main bundle
        const files = fs.readdirSync(assetsDir).filter(f => f.endsWith('.js'));
        console.log(`Archivos JS encontrados: ${files.length}`);
        
        // Check for index.html
        const indexPath = path.resolve(process.cwd(), 'index.html');
        if (fs.existsSync(indexPath)) {
          console.log('✅ Archivo index.html encontrado');
          
          // Read index.html to check for script references
          const indexContent = fs.readFileSync(indexPath, 'utf8');
          if (indexContent.includes('assets/') && indexContent.includes('.js')) {
            console.log('✅ Referencias a scripts encontradas en index.html');
          } else {
            console.log('❌ No se encontraron referencias a scripts en index.html');
          }
        } else {
          console.log('❌ No se encontró el archivo index.html');
        }
        
        // Check for config directory
        const configDir = path.resolve(process.cwd(), 'config');
        if (fs.existsSync(configDir)) {
          console.log('✅ Directorio de configuración encontrado');
          
          // List config files
          const configFiles = fs.readdirSync(configDir);
          console.log(`Archivos de configuración encontrados: ${configFiles.join(', ')}`);
        } else {
          console.log('❌ No se encontró el directorio de configuración');
        }
      } else {
        console.log('❌ No se encontró el directorio de assets');
      }
    } catch (error) {
      console.error('❌ Error al verificar archivos compilados:', error);
    }
  } else {
    // Original development environment checks
    // 1. Verificar configuración de API
    console.log('Entorno detectado: DESARROLLO');
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
  }
  
  console.log('\n=== FIN DE LA VERIFICACIÓN ===');
}

checkFrontendConfig();

