const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const header = req.headers.authorization;

        console.log("Authorization header:", header);

        if (!header || !header.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Unauthorized: Bearer token required'
            });
        }

        const token = header.split(' ')[1];

        const verify = jwt.verify(
            token,
            process.env.SECRET_KEY
        );

        req.user = verify;

        next();

    } catch (error) {
        console.error(error);

        return res.status(401).json({
            message: 'Unauthorized: Invalid or expired token'
        });
    }
};

module.exports = authMiddleware;