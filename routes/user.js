const express = require("express")
const User = require("../models/user")
const Blog = require("../models/blog")
const { getSafeImageUrl } = require("../services/imageUtils")

const router = express.Router();

router.get('/signin',(req,res)=>{
    return res.render("signin")
})

router.get('/signup',(req,res)=>{
    return res.render("signup")
})

router.post('/signin',async (req,res)=>{
    const {email,password} = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email,password);

        return res.cookie("token",token).redirect('/')
    } catch (error) {
        return res.render('signin',{error:"Incorrect Email or Password"})
    }

})

router.post('/signup',async (req,res)=>{
    const {fullName,email,password} = req.body;
    await User.create({
        fullName,
        email,
        password
    })
    res.redirect('/')
})

router.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect('/')
})

router.get('/profile/:userId', async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).render('error', { 
                error: 'User not found',
                user: req.userinfo
            });
        }

        // Find all blogs by this user
        const userBlogs = await Blog.find({ createdBy: req.params.userId }).sort({ createdAt: -1 });
        
        // Process image URLs for all blogs
        userBlogs.forEach(blog => {
            blog.coverImageURL = getSafeImageUrl(blog.coverImageURL);
        });

        // Render the author profile page
        return res.render('authorProfile', {
            user: req.userinfo,
            author: user,
            blogs: userBlogs
        });
    } catch (error) {
        console.error('Error fetching author profile:', error);
        return res.status(500).render('error', { 
            error: 'Error loading author profile',
            user: req.userinfo
        });
    }
});


module.exports = router;