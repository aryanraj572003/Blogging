const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Handle multer errors (file upload errors)
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            error: 'File too large. Maximum file size is 5MB.'
        });
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({
            error: 'Unexpected file field.'
        });
    }

    // Handle Cloudinary errors
    if (err.http_code === 400) {
        return res.status(400).json({
            error: 'Invalid file format or corrupted file.'
        });
    }

    if (err.http_code === 401) {
        return res.status(500).json({
            error: 'Cloudinary authentication failed. Please check your credentials.'
        });
    }

    if (err.http_code === 413) {
        return res.status(400).json({
            error: 'File too large for Cloudinary.'
        });
    }

    // Handle file type errors
    if (err.message === 'Only image files are allowed!') {
        return res.status(400).json({
            error: 'Only image files are allowed!'
        });
    }

    // Handle validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation error',
            details: err.message
        });
    }

    // Handle MongoDB errors
    if (err.name === 'CastError') {
        return res.status(400).json({
            error: 'Invalid ID format'
        });
    }

    // Default error
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
};

module.exports = errorHandler;
