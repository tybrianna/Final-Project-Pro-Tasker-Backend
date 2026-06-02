const projectSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },

  description:String,

  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
});