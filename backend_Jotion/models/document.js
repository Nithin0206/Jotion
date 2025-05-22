import mongoose from "mongoose";


const DocumentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    isArchived:{
        type:Boolean,
        required:true
    },
    parentDocument:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Document",
        default:null
    },
    content:{
        type:String,
        default:""
    },
    coverImage:{
        type:String,
        default:""
    },
    icon:{
        type:String,
        default:""
    },
    isPublished:{
        type:Boolean,
        required:true
    },
    Timestamp:true

})

DocumentSchema.index({userId:1})
DocumentSchema.index({userId:1,parentDocument:2})

const Document = mongoose.model("Document",DocumentSchema)

export default Document