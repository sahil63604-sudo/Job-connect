function AdminMiddleware(req,res,next) {
    
    
    if (req.user.roles!=='admin') {
        return res.status(403).json({
            message:"Access denied: Admin only"
        })
    }
    next();
}
module.exports=AdminMiddleware