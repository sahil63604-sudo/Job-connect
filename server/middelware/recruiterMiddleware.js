
const recruiterMiddleware = (req, res, next) => {
    try {
        
        const user=req.user
        
        
        if (user.roles!=='recruiter') {
            return res.status(403).json({
                message:"forbidden"
            })
        }
        req.recruiterId=req.user.id

        
       
        next()
    } catch (error) {
        console.error(error)
        return  res.status(401).json({
            message: "User unauthorised",
            
        });
    }
};

module.exports = recruiterMiddleware;