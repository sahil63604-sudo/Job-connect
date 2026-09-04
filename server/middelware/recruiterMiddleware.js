
const recruiterMiddleware = (req, res, next) => {
    try {
        
        const userRole=req.user.roles
        console.log(userRole);
        
        if (userRole!=='recruiter') {
            return res.status(403).json({
                message:"forbidden"
            })
        }
        req.recruiterId=req.user.id
            next()

        res.json({
            message: "User authenticated",
            user: req.user
        });
    } catch (error) {
        console.error(error)
        return  res.status(401).json({
            message: "User unauthorised",
            
        });
    }
};

module.exports = recruiterMiddleware;