require('dotenv').config();
const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const { checkForAuthenticationCookie } = require("./middlewares/authentication")

const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const Blog = require("./models/blog")
const errorHandler = require("./middlewares/errorHandler")
const { getSafeImageUrl } = require("./services/imageUtils")


const app = express();
const PORT = process.env.PORT||8000;

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve('./public')));

mongoose.connect(process.env.MONGO_URL)
.then(console.log("MongoDB connected"))


app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use('/user',userRoute)
app.use('/blog',blogRoute)

app.get('/',async (req,res)=>{
    const allBlogs = await Blog.find({}).populate('createdBy')
    
    // Process image URLs for all blogs
    allBlogs.forEach(blog => {
        blog.coverImageURL = getSafeImageUrl(blog.coverImageURL);
    });
    
    res.render('home',{"user":req.userinfo,"blogs":allBlogs})
})

// Error handling middleware (must be last)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server Started on ${PORT}`)
})