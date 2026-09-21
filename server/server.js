const express= require('express');
const cors = require('cors');
require('dotenv').config();

const app=express();
const PORT=process.env.PORT || 5000;
const DBconnection=require('./config/DB')
DBconnection();
app.use(cors());
app.use(express.json());
const routes=require('./routes/authRoutes')
const jobRouter=require('./routes/jobRoutes')
const applicationRouter=require('./routes/applicationRoutes');
const AdminRouter = require('./routes/adminRoutes');

app.use('/api/auth',routes)
app.use('/api/job',jobRouter)
app.use('/api/apply',applicationRouter)
app.use('/api/admin',AdminRouter)
app.get('/',(req,res)=>{
        res.json({
            message:'job track is live'
        })    
})
app.listen(PORT,()=>{
    console.log('server running on port 5000');
    
})
