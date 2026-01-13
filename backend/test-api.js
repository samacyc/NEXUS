const axios = require('axios');

async function testAPI() {
  try {
    console.log('Testing backend API...\n');

    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const health = await axios.get('http://localhost:3001/api/health');
    console.log('✅ Health:', health.data);

    // Test 2: Create a parcel
    console.log('\n2. Creating a test parcel...');
    const createResponse = await axios.post('http://localhost:3001/api/parcels', {
      sender: {
        name: 'Test Sender',
        address: '123 Test St, New York, NY',
        phone: '+1234567890'
      },
      receiver: {
        name: 'Test Receiver',
        address: '456 Test Ave, Los Angeles, CA',
        phone: '+0987654321'
      },
      weight: 2.5
    });
    console.log('✅ Parcel created:', createResponse.data.data.trackingNumber);

    // Test 3: Track the parcel
    const trackingNumber = createResponse.data.data.trackingNumber;
    console.log('\n3. Tracking parcel:', trackingNumber);
    const trackResponse = await axios.get(`http://localhost:3001/api/parcels/track/${trackingNumber}`);
    console.log('✅ Tracking result:', trackResponse.data.success ? 'Found' : 'Not found');

    console.log('\n✅ All API tests passed!\n');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testAPI();
