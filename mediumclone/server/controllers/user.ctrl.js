/**server/controllers/user.ctrl.js**/
const Article = require('./../models/Article')
const User = require('./../models/User')
const fs = require('fs')
const cloudinary = require('cloudinary')
module.exports={
    addUser: (req, res, next) => {
        let{user, email, provider,provider_id,token} = req.body
        if (req.files.image) {
            cloudinary.uploader.upload(req.files.image.path, (result) => {
                let obj = { user, email, provider,provider_id,token, provider_pic: result.url != null ? result.url : '' }
                saveUser(obj)
            },{
                resource_type: 'image',
                eager: [
                    {effect: 'sepia'}
                ]
            })
        }else {
            saveUser({  user, email, provider,provider_id,token, provider_pic: '' })
        }
        function saveUser(obj) {
            new User(obj).save((err, article) => {
                if (err)
                    res.send(err)
                else if (!article)
                    res.send(400)

                next()
            })
        }
    },
    getUser: (req,res,next) =>{
        User.findById(req.params.id)
            .populate('name')
            .exec((err, user)=> {
            if (err)
                res.send(err)
            else if (!user)
                res.send(404)
            else
                res.send(user)
            next()
        })
    }
}