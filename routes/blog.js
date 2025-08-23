const express = require("express")
const path = require("path");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const { upload, deleteFileFromCloudinary, extractPublicIdFromUrl } = require("../services/cloudinary");
const { getSafeImageUrl } = require("../services/imageUtils");

const router = express.Router();

router.get('/add-new', (req, res) => {
    return res.render("addBlog", {
        "user": req.userinfo
    })
})

router.get('/:id',async (req,res)=>{
    const blog = await Blog.findById(req.params.id).populate('createdBy')
    const comments= await Comment.find({blogId:req.params.id}).populate('createdBy')
    
    // Process image URL for safe display
    if (blog) {
        blog.coverImageURL = getSafeImageUrl(blog.coverImageURL);
    }
    
    return res.render('blog',{
        "user":req.userinfo,
        "blog":blog,
        "comments":comments
    })
})


router.post('/comment/:blogId',async (req,res)=>{
    await Comment.create({
        content:req.body.content,
        blogId:req.params.blogId,
        createdBy:req.userinfo._id,
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})

// Like/unlike a blog post
router.post('/like/:blogId', async (req, res) => {
    try {
        if (!req.userinfo) {
            return res.redirect('/user/signin');
        }
        
        const blog = await Blog.findById(req.params.blogId);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        
        // Check if user already liked the post
        const userIndex = blog.likes.indexOf(req.userinfo._id);
        
        if (userIndex === -1) {
            // User hasn't liked the post yet, add like
            blog.likes.push(req.userinfo._id);
        } else {
            // User already liked the post, remove like
            blog.likes.splice(userIndex, 1);
        }
        
        await blog.save();
        return res.redirect(`/blog/${req.params.blogId}`);
    } catch (error) {
        console.error('Error liking/unliking blog:', error);
        return res.status(500).json({ error: 'Error processing like' });
    }
})

// Delete blog route with Cloudinary file cleanup
router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        
        // Check if user owns the blog
        if (blog.createdBy.toString() !== req.userinfo._id.toString()) {
            return res.status(403).json({ error: 'Not authorized to delete this blog' });
        }
        
        // Delete image from Cloudinary if it exists
        if (blog.coverImageURL) {
            const publicId = extractPublicIdFromUrl(blog.coverImageURL);
            if (publicId) {
                await deleteFileFromCloudinary(publicId);
            }
        }
        
        // Delete the blog
        await Blog.findByIdAndDelete(req.params.id);
        
        // Delete associated comments
        await Comment.deleteMany({ blogId: req.params.id });
        
        return res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return res.status(500).json({ error: 'Error deleting blog' });
    }
})

router.post("/", upload.single('coverImage'), async (req, res) => {
    try {
        const { title, body, category } = req.body
        
        // Get the Cloudinary file URL
        const coverImageURL = req.file ? req.file.path : null;
        
        const blog = await Blog.create({
            title,
            body,
            category,
            createdBy: req.userinfo._id,
            coverImageURL: coverImageURL
        })
        return res.redirect(`/blog/${blog._id}`)
    } catch (error) {
        console.error('Error creating blog:', error);
        return res.status(500).send('Error creating blog');
    }
})

module.exports = router;
