const mongoose=require('mongoose');
const  DBconnection= async ()=>{
    try {
        await mongoose.connect(process.env.URI)
        console.log('mongodb connected');
        
    } catch (error) {
        console.log('DB ERROR: '+ error);
        
    }
}
module.exports=DBconnection;