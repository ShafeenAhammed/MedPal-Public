const fs = require('fs').promises;
const path = require('path');
const doctorCollection = require('./model/doctorSchema');
const { Kafka } = require('kafkajs');

async function saveBase64ToFile(base64String, filePath) {
  const buffer = Buffer.from(base64String, 'base64');
  await fs.writeFile(filePath, buffer);
}

async function setupKafkaConsumer() {
//   const kafka = new Kafka({ clientId: 'doctor-service', brokers: ['localhost:29092'] });
  const kafka = new Kafka({
    clientId: 'doctor-service',
    brokers: ['localhost:29092'],
  });
  const doctorConsumer = kafka.consumer({ groupId: 'doctor-group' });

  await doctorConsumer.connect();
  // console.log("doctor consumer connected");
  await doctorConsumer.subscribe({ topic: 'doc-req-accepted', fromBeginning: false });

  await doctorConsumer.run({
    eachMessage: async ({ message }) => {
      try {
        const receivedData = JSON.parse(message.value.toString());
        const doc = receivedData.doc;
        console.log('Doctor data inserted successfully:', doc);
        
        await doctorCollection.validate(doc);

        const doctorImageBase64 = receivedData.doctorImageBase64;
        const licenseFileBase64 = receivedData.licenseFileBase64;

        const doctorImagePath = path.join(__dirname, 'assets/uploads', doc.doctorImage);
        const licenseFilePath = path.join(__dirname, 'assets/uploads', doc.licenseFile);

        await saveBase64ToFile(doctorImageBase64, doctorImagePath);
        await saveBase64ToFile(licenseFileBase64, licenseFilePath);
        
        await doctorCollection.insertMany([doc]);
        
      } catch (error) {
        if (error.name === 'ValidationError') {
          console.error('Validation Error:', error.message);
        } else {
          console.error('Error processing Kafka message:', error);
        }
      }
    },
  });

  process.on('SIGINT', async () => {
    await doctorConsumer.disconnect();
    process.exit(0);
  });
}

module.exports = {
  setupKafkaConsumer,
};
