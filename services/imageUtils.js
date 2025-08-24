const { getOptimizedUrl, getThumbnailUrl } = require('./cloudinary');

const processImageUrl = (imageUrl) => {
    if (!imageUrl) {
        return '/images/default.png';
    }
    
    if (imageUrl.startsWith('http')) {
        return imageUrl;
    }
    
    if (imageUrl.startsWith('/')) {
        return imageUrl;
    }
    
    if (imageUrl.includes('cloudinary.com')) {
        return getOptimizedUrl(imageUrl);
    }
    
    return imageUrl;
};

const isCloudinaryUrl = (imageUrl) => {
    return imageUrl && imageUrl.includes('cloudinary.com');
};

const isLocalUrl = (imageUrl) => {
    return imageUrl && imageUrl.startsWith('/');
};

const getSafeImageUrl = (imageUrl, fallbackUrl = '/images/default.png') => {
    const processedUrl = processImageUrl(imageUrl);
    
    if (!processedUrl) {
        return fallbackUrl;
    }
    
    return processedUrl;
};

const getOptimizedImageUrl = (imageUrl, options = {}) => {
    if (!imageUrl) {
        return '/images/default.png';
    }
    
    if (isCloudinaryUrl(imageUrl)) {
        return getOptimizedUrl(imageUrl, options);
    }
    
    return imageUrl;
};

const getImageThumbnail = (imageUrl, width = 300, height = 200) => {
    if (!imageUrl) {
        return '/images/default.png';
    }
    
    if (isCloudinaryUrl(imageUrl)) {
        return getThumbnailUrl(imageUrl, width, height);
    }
    
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
