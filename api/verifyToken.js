const jwt = require("jsonwebtoken");

const HASHING_SECRET = '9e42e429fe34d87a78eab640e6ffd83445f50300738f0';

function verify(req, res, next){
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, HASHING_SECRET,
            (err, user) => {
                if(err) {
                    res.status(403).json("Token is Invalid!");
                }
                req.user = user;
                next();
            }
        );
    }else{
        res.status(403).json("Not Authenticated!");
    }
}

module.exports = verify;
