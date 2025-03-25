import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// URL base de producción
const PRODUCTION_URL = 'https://test.biottic.com.co'; // Ajusta según tu dominio real

async function checkProductionAPI() {
  console.log('=== DIAGNÓSTICO DE API EN PRODUCCIÓN ===\n');
  
  // 1. Verificar que el servidor responde
  console.log('1. VERIFICANDO DISPONIBILIDAD DEL SERVIDOR');
  try {
    const healthResponse = await fetch(`${PRODUCTION_URL}/api/health`, {
      method: 'GET',
    });
    
    if (healthResponse.ok) {
      console.log('✅ Servidor responde correctamente');
    } else {
      console.log(`❌ Servidor responde con error: ${healthResponse.status} ${healthResponse.statusText}`);
    }
  } catch (error) {
    console.error('❌ No se pudo conectar con el servidor:', error);
  }
  
  // 2. Probar la ruta de contacto con una solicitud real
  console.log('\n2. PROBANDO RUTA DE CONTACTO');
  const testData = {
    name: 'Test User (Diagnostic)',
    email: 'test@example.com',
    message: 'This is a test message from production diagnostic tool',
    phone: '1234567890',
    company: 'Test Company'
  };
  
  try {
    console.log(`Enviando solicitud POST a ${PRODUCTION_URL}/api/contact`);
    console.log('Datos enviados:', testData);
    
    const response = await fetch(`${PRODUCTION_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Biottic-Diagnostic-Tool/1.0'
      },
      body: JSON.stringify(testData),
    });
    
    console.log('Respuesta recibida:');
    console.log('- Status:', response.status, response.statusText);
    console.log('- Headers:', Object.fromEntries([...response.headers.entries()]));
    
    try {
      const data = await response.json();
      console.log('- Body:', data);
      
      if (response.ok) {
        console.log('✅ API de contacto responde correctamente');
      } else {
        console.log('❌ API de contacto responde con error');
      }
    } catch (parseError) {
      console.error('❌ No se pudo parsear la respuesta como JSON:', parseError);
      const text = await response.text();
      console.log('- Respuesta en texto plano:', text.substring(0, 500) + (text.length > 500 ? '...' : ''));
    }
  } catch (error) {
    console.error('❌ Error al realizar la solicitud a la API de contacto:', error);
  }
  
  // 3. Verificar la configuración de CORS
  console.log('\n3. VERIFICANDO CONFIGURACIÓN CORS');
  try {
    const corsResponse = await fetch(`${PRODUCTION_URL}/api/contact`, {
      method: 'OPTIONS',
      headers: {
        'Origin': PRODUCTION_URL,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    
    console.log('Respuesta CORS:');
    console.log('- Status:', corsResponse.status, corsResponse.statusText);
    console.log('- Headers:', Object.fromEntries([...corsResponse.headers.entries()]));
    
    const corsHeaders = [
      'access-control-allow-origin',
      'access-control-allow-methods',
      'access-control-allow-headers',
      'access-control-allow-credentials'
    ];
    
    const missingHeaders = corsHeaders.filter(header => !corsResponse.headers.has(header));
    
    if (missingHeaders.length === 0) {
      console.log('✅ Configuración CORS parece correcta');
    } else {
      console.log('❌ Faltan headers CORS:', missingHeaders);
    }
  } catch (error) {
    console.error('❌ Error al verificar CORS:', error);
  }
  
  console.log('\n=== FIN DEL DIAGNÓSTICO ===');
}

checkProductionAPI();
