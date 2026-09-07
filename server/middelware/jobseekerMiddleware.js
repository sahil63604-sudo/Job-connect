
const jobseekerMiddleware = (req, res, next) => {
    try {
        
        const user=req.user
        
        
        if (user.roles!=='jobseeker') {
            return res.status(403).json({
                message:"forbidden"
            })
        }
        req.jobseekerId=req.user.id
        
        
       
        next()
    } catch (error) {
        console.error(error)
        return  res.status(401).json({
            message: "User unauthorised",
            
        });
    }
};

module.exports = jobseekerMiddleware;