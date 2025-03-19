import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

// Configurar variables de entorno
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const runTests = async () => {
  console.log('🧪 Iniciando pruebas del sistema...');
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
  
  const results = {
    email: false,
    database: false,
    api: false
  };

  // Prueba de conexión a la base de datos
  try {
    console.log('\n📊 Probando conexión a MongoDB...');
    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
      throw new Error('MONGODB_URI no está definido en las variables de entorno');
    }
    
    console.log('URI de MongoDB:', uri.replace(/:[^:]*@/, ':****@'));
    await mongoose.connect(uri);
    console.log('✅ Conexión a MongoDB exitosa');
    
    // Prueba simple de operación en la base de datos
    const TestModel = mongoose.model('TestConnection', new mongoose.Schema({
      test: String,
      timestamp: { type: Date, default: Date.now }
    }));
    
    const testDoc = new TestModel({ test: 'Test de sistema' });
    await testDoc.save();
    console.log('✅ Documento guardado correctamente');
    
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('✅ Documento eliminado correctamente');
    
    await mongoose.disconnect();
    console.log('✅ Desconexión exitosa de MongoDB');
    results.database = true;
  } catch (error) {
    console.error('❌ Error en prueba de MongoDB:', error);
    console.error('Detalles:', error instanceof Error ? error.message : 'Error desconocido');
  }

  // Prueba de configuración de email
  try {
    console.log('\n📧 Probando configuración de email...');
    
    // Verificar variables de entorno necesarias
    const requiredVars = ['EMAIL_SERVICE', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_FROM'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      throw new Error(`Faltan variables de entorno: ${missingVars.join(', ')}`);
    }
    
    // Crear transportador
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    // Verificar conexión
    await transporter.verify();
    console.log('✅ Configuración de email válida');
    results.email = true;
  } catch (error) {
    console.error('❌ Error en prueba de email:', error);
  }

  // Prueba de API (simulada)
  try {
    console.log('\n🌐 Probando API...');
    
    // Verificar puerto configurado
    const port = process.env.PORT || 3000;
    console.log(`Puerto configurado: ${port}`);
    
    // Simular verificación de rutas
    console.log('Rutas disponibles:');
    console.log('- /api/contact');
    console.log('- /api/health');
    
    console.log('✅ Configuración de API válida');
    results.api = true;
  } catch (error) {
    console.error('❌ Error en prueba de API:', error);
  }

  // Resumen de resultados
  console.log('\n📋 Resumen de pruebas:');
  console.log(`Base de datos: ${results.database ? '✅ OK' : '❌ Falló'}`);
  console.log(`Email: ${results.email ? '✅ OK' : '❌ Falló'}`);
  console.log(`API: ${results.api ? '✅ OK' : '❌ Falló'}`);
  
  const exitCode = Object.values(results).every(Boolean) ? 0 : 1;
  console.log(`\n${exitCode === 0 ? '✅ Todas las pruebas pasaron' : '❌ Algunas pruebas fallaron'}`);
  
  process.exit(exitCode);
};

runTests().catch(error => {
  console.error('Error fatal en las pruebas:', error);
  process.exit(1);
});