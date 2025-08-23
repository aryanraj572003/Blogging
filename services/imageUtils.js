const { getOptimizedUrl, getThumbnailUrl } = require('./cloudinary');

// Function to process image URLs for display
const processImageUrl = (imageUrl) => {
    if (!imageUrl) {
        return '/images/default.png'; // Default fallback image
    }
    
    // If it's already a full URL (Cloudinary), return as is
    if (imageUrl.startsWith('http')) {
        return imageUrl;
    }
    
    // If it's a local path (legacy), return as is
    if (imageUrl.startsWith('/')) {
        return imageUrl;
    }
    
    // If it's a Cloudinary URL, optimize it
    if (imageUrl.includes('cloudinary.com')) {
        return getOptimizedUrl(imageUrl);
    }
    
    return imageUrl;
};

// Function to check if an image URL is from Cloudinary
const isCloudinaryUrl = (imageUrl) => {
    return imageUrl && imageUrl.includes('cloudinary.com');
};

// Function to check if an image URL is local
const isLocalUrl = (imageUrl) => {
    return imageUrl && imageUrl.startsWith('/');
};

// Function to get a safe image URL with fallback
const getSafeImageUrl = (imageUrl, fallbackUrl = '/images/default.png') => {
    const processedUrl = processImageUrl(imageUrl);
    
    // If processing failed or returned null, use fallback
    if (!processedUrl) {
        return fallbackUrl;
    }
    
    return processedUrl;
};

// Function to get optimized image URL for different use cases
const getOptimizedImageUrl = (imageUrl, options = {}) => {
    if (!imageUrl) {
        return '/images/default.png';
    }
    
    // If it's a Cloudinary URL, apply optimizations
    if (isCloudinaryUrl(imageUrl)) {
        return getOptimizedUrl(imageUrl, options);
    }
    
    // For local images, return as is
    return imageUrl;
};

// Function to get thumbnail URL
const getImageThumbnail = (imageUrl, width = 300, height = 200) => {
    if (!imageUrl) {
        return '/images/default.png';
    }
    
    // If it's a Cloudinary URL, get thumbnail
    if (isCloudinaryUrl(imageUrl)) {
        return getThumbnailUrl(imageUrl, width, height);
    }
    
    // For local images, return as is
    return imageUrl;
};

module.exports = {
    processImageUrl,
    isCloudinaryUrl,
    isLocalUrl,
    getSafeImageUrl,
    getOptimizedImageUrl,
    getImageThumbnail
};
