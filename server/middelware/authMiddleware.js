const jwt =require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    try {
     
        const header=req.headers.authorization
        
        
            const token=header.slice(7)
            
       const verify= jwt.verify(token,process.env.SECRET_KEY)
        req.user=verify
        
        next()   
    } catch (error) {
    return res.status(401).json({
        message: 'Unauthorized'
    });
}
};

module.exports = authMiddleware;