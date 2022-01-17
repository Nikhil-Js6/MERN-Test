const jwt = require("jsonwebtoken");

function verify(req, res, next){
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.HASHING_SECRET,
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