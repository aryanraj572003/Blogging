const { Schema, model } = require("mongoose");


const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true,
    },
    coverImageURL:{
        type:String,
        required:false,
    },
    category:{
        type:String,
        enum: ['Technology', 'Health', 'Lifestyle', 'Fashion'],
        required:true,
        default:'Technology'
    },
    likes:{
        type:[Schema.Types.ObjectId],
        ref:"User",
        default:[]
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

const Blog = model("blog",blogSchema)

module.exports = Blog