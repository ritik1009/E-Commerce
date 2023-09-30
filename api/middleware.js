module.exports.isloggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({message:"You are not loggedIn"});
    }
    next();
}

module.exports.isAdmin = (req, res, next) => {
    console.log('Outside of middleware',req.user.role)
    if(req.user.role!=='admin'){
        console.log('inside middleware',req.user)
        return res.status(401).json({message:"You are not Authoroized"});
    }
    next();
}