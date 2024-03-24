const jwt = require('jsonwebtoken');

module.exports = {
    tokenValidate: async(req,res,next)=>{
        const token=req.headers.authorization;
        console.log("tok",token);
        if (!token) {
            return res.status(401).json({ message: 'Authentication failed: No token provided' });
        }
        const tokenValue = token.replace('Bearer ', '');
        jwt.verify(tokenValue, 'secret_key', (err, decoded) => {
        if (err) {
            console.log("auth err",err);
            return res.status(401).json({ message: 'Authentication failed: Invalid token' });
        }
    
        req.decoded = decoded;
        next();
        });
    }
}