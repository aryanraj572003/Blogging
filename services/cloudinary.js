const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blog-images',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        transformation: [
            { width: 800, height: 600, crop: 'limit' },
            { quality: 'auto' }
        ]
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Function to delete file from Cloudinary
const deleteFileFromCloudinary = async (publicId) => {
    try {
        if (!publicId) return true;
        
        const result = await cloudinary.uploader.destroy(publicId);
        console.log(`File deleted from Cloudinary: ${publicId}`);
        return result.result === 'ok';
    } catch (error) {
        console.error('Error deleting file from Cloudinary:', error);
        return false;
    }
};

// Function to extract public ID from Cloudinary URL
const extractPublicIdFromUrl = (url) => {
    if (!url) return null;
    
    // If it's already a public ID, return as is
    if (!url.startsWith('http')) {
        return url;
    }
    
    // Extract public ID from Cloudinary URL
    // Example URL: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/image.jpg
    const urlParts = url.split('/');
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    
    if (uploadIndex === -1) return null;
    
    // Get everything after 'upload' and before the file extension
    const pathAfterUpload = urlParts.slice(uploadIndex + 2).join('/');
    const publicId = pathAfterUpload.split('.')[0]; // Remove file extension
    
    return publicId;
};

// Function to get optimized URL from Cloudinary
const getOptimizedUrl = (url, options = {}) => {
    if (!url) return null;
    
    // If it's not a Cloudinary URL, return as is
    if (!url.includes('cloudinary.com')) {
        return url;
    }
    
    // Extract public ID and create optimized URL
    const publicId = extractPublicIdFromUrl(url);
    if (!publicId) return url;
    
    const defaultOptions = {
        width: 800,
        height: 600,
        crop: 'limit',
        quality: 'auto',
        format: 'auto'
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    return cloudinary.url(publicId, finalOptions);
};

// Function to get thumbnail URL
const getThumbnailUrl = (url, width = 300, height = 200) => {
    return getOptimizedUrl(url, { width, height, crop: 'fill' });
};

module.exports = {
    upload,
    deleteFileFromCloudinary,
    extractPublicIdFromUrl,
    getOptimizedUrl,
    getThumbnailUrl,
    cloudinary
};
