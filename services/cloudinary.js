const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

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
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

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

const extractPublicIdFromUrl = (url) => {
    if (!url) return null;
    
    if (!url.startsWith('http')) {
        return url;
    }
    
    const urlParts = url.split('/');
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    
    if (uploadIndex === -1) return null;
    
    const pathAfterUpload = urlParts.slice(uploadIndex + 2).join('/');
    const publicId = pathAfterUpload.split('.')[0];
    
    return publicId;
};

const getOptimizedUrl = (url, options = {}) => {
    if (!url) return null;
    
    if (!url.includes('cloudinary.com')) {
        return url;
    }
    
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
