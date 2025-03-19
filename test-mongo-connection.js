import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testMongoConnection() {
  try {
    const uri = process.env.MONGODB_URI;
    console.log('Connecting to MongoDB with URI:', uri.replace(/:[^:]*@/, ':****@'));
    
    await mongoose.connect(uri);
    console.log('✅ Connection successful!');
    
    // Probar una operación simple
    const testModel = mongoose.model('TestConnection', new mongoose.Schema({ 
      test: String,
      date: { type: Date, default: Date.now }
    }));
    
    const testDoc = new testModel({ test: 'Connection test' });
    await testDoc.save();
    console.log('✅ Document saved successfully');
    
    // Limpiar
    await testModel.deleteOne({ _id: testDoc._id });
    console.log('✅ Test document deleted');
    
    await mongoose.disconnect();
    console.log('✅ Disconnected successfully');
  } catch (error) {
    console.error('❌ Error:', error);
    console.error('Error details:', error.message);
    if (error.name === 'MongoServerError') {
      console.error('MongoDB error code:', error.code);
      console.error('MongoDB error message:', error.errmsg);
    }
  }
}

testMongoConnection();