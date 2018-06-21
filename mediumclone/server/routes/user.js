// server/routes/article.js
const usercontroller = require('./../controllers/user.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()
module.exports = (router) =>{
    router
        .route('/user')
        .post(multipartWare,usercontroller.addUser())
    router
        .route('/user')
        .get(usercontroller.getUser())
}