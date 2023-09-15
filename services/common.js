const passport = require('passport')

exports.sanitizeUser = (user)=>{
    return {id:user.id}
}