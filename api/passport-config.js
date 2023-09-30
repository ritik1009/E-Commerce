const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('./models/users')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne({username: jwt_payload.username})
      .then((docs)=>{
            if(docs){
                return done(null,docs);
            }else{
                return done(null,false);
            }
      }).catch((err)=>{
        return done(err, false);
      })
    }));
};