const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) =>{
    //Get the user id from jwt token
    const token = req.header('auth-token');
    if(!token){
       return res.status(401).send({ error: "Please authenticate with a valid token"});
    }
    try {
        const data = jwt.verify(token, "inotebook");
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate with a valid token"});
    }

}

module.exports = fetchuser;