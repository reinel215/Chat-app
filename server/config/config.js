require('dotenv').config();



const config = {

    port : process.env.PORT || 4001,
    dev : process.env.NODE_ENV === "development"

}


module.exports = config;