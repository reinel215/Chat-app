const router = require('express').Router();


const chatApi = app => {

    app.use('/chat',router);


    router.get('/', (req,res,next) => {

        res.send("server is up and running");

    } );


}


module.exports = {
    chatApi
}