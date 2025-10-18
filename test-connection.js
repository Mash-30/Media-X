// Test script to verify API connection
const API_BASE_URL = 'http://localhost:3000/api';

async function testConnection() {
  console.log('🧪 Testing API Connection...\n');
  
  try {
    // Test 1: Health check
    console.log('1. Testing health check...');
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
    
    // Test 2: CORS test
    console.log('\n2. Testing CORS...');
    const corsResponse = await fetch(`${API_BASE_URL}/cors-test`);
    const corsData = await corsResponse.json();
    console.log('✅ CORS test:', corsData);
    
    // Test 3: Signup test
    console.log('\n3. Testing signup...');
    const signupResponse = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword123',
        username: 'testuser',
        displayName: 'Test User'
      }),
    });
    
    if (signupResponse.ok) {
      const signupData = await signupResponse.json();
      console.log('✅ Signup successful:', signupData);
      
      // Test 4: Login test
      console.log('\n4. Testing login...');
      const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'testpassword123'
        }),
      });
      
      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        console.log('✅ Login successful:', loginData);
        
        // Test 5: Protected route test
        console.log('\n5. Testing protected route...');
        const protectedResponse = await fetch(`${API_BASE_URL}/auth/verify`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${loginData.token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (protectedResponse.ok) {
          const protectedData = await protectedResponse.json();
          console.log('✅ Protected route access:', protectedData);
        } else {
          console.log('❌ Protected route failed:', await protectedResponse.text());
        }
      } else {
        console.log('❌ Login failed:', await loginResponse.text());
      }
    } else {
      console.log('❌ Signup failed:', await signupResponse.text());
    }
    
    console.log('\n🎉 All tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testConnection();
