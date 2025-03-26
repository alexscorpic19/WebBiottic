import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// URLs base
const STAGING_URL = 'https://test.biottic.com.co'; // URL de staging
const PRODUCTION_URL = 'https://biottic.com.co'; // URL real de producción

async function checkProductionAPI() {
  console.log('=== DIAGNÓSTICO DE API EN ENTORNOS DE PRODUCCIÓN ===\n');
  
  // 1. Verificar que el servidor de staging responde
  console.log('1. VERIFICANDO DISPONIBILIDAD DEL SERVIDOR DE STAGING');
  try {
    const stagingHealthResponse = await fetch(`${STAGING_URL}/api/health`, {
      method: 'GET',
    });
    
    if (stagingHealthResponse.ok) {
      console.log(`✅ Servidor de staging (${STAGING_URL}) responde correctamente`);
    } else {
      console.log(`❌ Servidor de staging responde con error: ${stagingHealthResponse.status} ${stagingHealthResponse.statusText}`);
    }
  } catch (error) {
    console.error(`❌ No se pudo conectar con el servidor de staging (${STAGING_URL}):`, error);
  }
  
  // 2. Verificar que el servidor de producción responde
  console.log('\n2. VERIFICANDO DISPONIBILIDAD DEL SERVIDOR DE PRODUCCIÓN');
  try {
    const prodHealthResponse = await fetch(`${PRODUCTION_URL}/api/health`, {
      method: 'GET',
    });
    
    if (prodHealthResponse.ok) {
      console.log(`✅ Servidor de producción (${PRODUCTION_URL}) responde correctamente`);
    } else {
      console.log(`❌ Servidor de producción responde con error: ${prodHealthResponse.status} ${prodHealthResponse.statusText}`);
    }
  } catch (error) {
    console.error(`❌ No se pudo conectar con el servidor de producción (${PRODUCTION_URL}):`, error);
  }
  
  // 3. Probar la ruta de contacto con una solicitud real en staging
  console.log('\n3. PROBANDO RUTA DE CONTACTO EN STAGING');
  const testData = {
    name: 'Test User (Diagnostic)',
    email: 'test@example.com',
    message: 'This is a test message from production diagnostic tool',
    phone: '1234567890',
    company: 'Test Company'
  };
  
  try {
    console.log(`Enviando solicitud POST a ${STAGING_URL}/api/contact`);
    console.log('Datos enviados:', testData);
    
    const stagingResponse = await fetch(`${STAGING_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Biottic-Diagnostic-Tool/1.0'
      },
      body: JSON.stringify(testData),
    });
    
    console.log('Respuesta recibida de staging:');
    console.log('- Status:', stagingResponse.status, stagingResponse.statusText);
    console.log('- Headers:', Object.fromEntries([...stagingResponse.headers.entries()]));
    
    try {
      const stagingData = await stagingResponse.json();
      console.log('- Body:', stagingData);
      
      if (stagingResponse.ok) {
        console.log('✅ API de contacto en staging responde correctamente');
      } else {
        console.log('❌ API de contacto en staging responde con error');
      }
    } catch (parseError) {
      console.error('❌ No se pudo parsear la respuesta de staging como JSON:', parseError);
      const text = await stagingResponse.text();
      console.log('- Respuesta en texto plano:', text.substring(0, 500) + (text.length > 500 ? '...' : ''));
    }
  } catch (error) {
    console.error('❌ Error al realizar la solicitud a la API de contacto en staging:', error);
  }
  
  // 4. Probar la ruta de contacto con una solicitud real en producción
  console.log('\n4. PROBANDO RUTA DE CONTACTO EN PRODUCCIÓN');
  
  try {
    console.log(`Enviando solicitud POST a ${PRODUCTION_URL}/api/contact`);
    console.log('Datos enviados:', testData);
    
    const prodResponse = await fetch(`${PRODUCTION_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Biottic-Diagnostic-Tool/1.0'
      },
      body: JSON.stringify(testData),
    });
    
    console.log('Respuesta recibida de producción:');
    console.log('- Status:', prodResponse.status, prodResponse.statusText);
    console.log('- Headers:', Object.fromEntries([...prodResponse.headers.entries()]));
    
    try {
      const prodData = await prodResponse.json();
      console.log('- Body:', prodData);
      
      if (prodResponse.ok) {
        console.log('✅ API de contacto en producción responde correctamente');
      } else {
        console.log('❌ API de contacto en producción responde con error');
      }
    } catch (parseError) {
      console.error('❌ No se pudo parsear la respuesta de producción como JSON:', parseError);
      const text = await prodResponse.text();
      console.log('- Respuesta en texto plano:', text.substring(0, 500) + (text.length > 500 ? '...' : ''));
    }
  } catch (error) {
    console.error('❌ Error al realizar la solicitud a la API de contacto en producción:', error);
  }
  
  // 5. Verificar la configuración de CORS en staging
  console.log('\n5. VERIFICANDO CONFIGURACIÓN CORS EN STAGING');
  try {
    const stagingCorsResponse = await fetch(`${STAGING_URL}/api/contact`, {
      method: 'OPTIONS',
      headers: {
        'Origin': STAGING_URL,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    
    console.log('Respuesta CORS de staging:');
    console.log('- Status:', stagingCorsResponse.status, stagingCorsResponse.statusText);
    console.log('- Headers:', Object.fromEntries([...stagingCorsResponse.headers.entries()]));
    
    const corsHeaders = [
      'access-control-allow-origin',
      'access-control-allow-methods',
      'access-control-allow-headers',
      'access-control-allow-credentials'
    ];
    
    const stagingMissingHeaders = corsHeaders.filter(header => !stagingCorsResponse.headers.has(header));
    
    if (stagingMissingHeaders.length === 0) {
      console.log('✅ Configuración CORS en staging parece correcta');
    } else {
      console.log('❌ Faltan headers CORS en staging:', stagingMissingHeaders);
    }
  } catch (error) {
    console.error('❌ Error al verificar CORS en staging:', error);
  }
  
  // 6. Verificar la configuración de CORS en producción
  console.log('\n6. VERIFICANDO CONFIGURACIÓN CORS EN PRODUCCIÓN');
  try {
    const prodCorsResponse = await fetch(`${PRODUCTION_URL}/api/contact`, {
      method: 'OPTIONS',
      headers: {
        'Origin': PRODUCTION_URL,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    
    console.log('Respuesta CORS de producción:');
    console.log('- Status:', prodCorsResponse.status, prodCorsResponse.statusText);
    console.log('- Headers:', Object.fromEntries([...prodCorsResponse.headers.entries()]));
    
    const corsHeaders = [
      'access-control-allow-origin',
      'access-control-allow-methods',
      'access-control-allow-headers',
      'access-control-allow-credentials'
    ];
    
    const prodMissingHeaders = corsHeaders.filter(header => !prodCorsResponse.headers.has(header));
    
    if (prodMissingHeaders.length === 0) {
      console.log('✅ Configuración CORS en producción parece correcta');
    } else {
      console.log('❌ Faltan headers CORS en producción:', prodMissingHeaders);
    }
  } catch (error) {
    console.error('❌ Error al verificar CORS en producción:', error);
  }
  
  console.log('\n=== FIN DEL DIAGNÓSTICO ===');
}

checkProductionAPI();



