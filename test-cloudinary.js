require('dotenv').config();
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function testCloudinaryConnection() {
    try {
        console.log('Testing Cloudinary connection...');
        console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
        console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'Not set');
        
        // Test Cloudinary connection by getting account info
        const result = await cloudinary.api.ping();
        console.log('✅ Cloudinary connection successful!');
        console.log('Response:', result);
        
        // Test upload capabilities by getting upload presets
        try {
            const uploadPresets = await cloudinary.api.upload_presets();
            console.log(`📁 Found ${uploadPresets.length} upload presets`);
        } catch (error) {
            console.log('ℹ️  No upload presets found (this is normal)');
        }
        
        // Test resource listing
        try {
            const resources = await cloudinary.api.resources({
                type: 'upload',
                max_results: 5
            });
            console.log(`📸 Found ${resources.resources.length} images in your account`);
            
            if (resources.resources.length > 0) {
                console.log('Sample images:');
                resources.resources.slice(0, 3).forEach(resource => {
                    console.log(`  - ${resource.public_id} (${resource.format})`);
                });
            }
        } catch (error) {
            console.log('ℹ️  Could not list resources (this is normal for new accounts)');
        }
        
    } catch (error) {
        console.error('❌ Cloudinary connection failed:', error.message);
        
        if (error.http_code === 401) {
            console.log('💡 Check your Cloudinary API key and secret.');
        } else if (error.http_code === 404) {
            console.log('💡 Check your Cloudinary cloud name.');
        } else if (error.message.includes('cloud_name')) {
            console.log('💡 Check your CLOUDINARY_CLOUD_NAME.');
        } else if (error.message.includes('api_key')) {
            console.log('💡 Check your CLOUDINARY_API_KEY.');
        } else if (error.message.includes('api_secret')) {
            console.log('💡 Check your CLOUDINARY_API_SECRET.');
        }
    }
}

testCloudinaryConnection();
