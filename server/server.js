const express= require('express');
const cors = require('cors');
require('dotenv').config();

const app=express();
const PORT=process.env.PORT || 5000;
const DBconnection=require('./config/DB')
DBconnection();
app.use(cors());
app.use(express.json());
const routes=require('./routes/authRoutes'
)
const recruiterRouter=require('./routes/recruiterRoutes')
app.use('/api/job',recruiterRouter)
app.use('/api/auth',routes)
app.get('/',(req,res)=>{
        res.json({
            message:'job track is live'
        })    
})
app.listen(PORT,()=>{
    console.log('server running on port 5000');
    
})
