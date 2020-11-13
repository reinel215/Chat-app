//importamos la configuracion inical
const config = require('./config/config');




// iniciamos la app de express
const express = require('express');
const app = express();



//creamos el servidor con el modulo http
const http = require('http');
const server = http.createServer(app);






//Configuramos el Logger
const morgan = require('morgan');
if(config.dev){
    app.use(morgan('dev'));
}
else{
    app.use(morgan('combined'));
}







//HABILITAMOS EL CORS
const cors = require('cors');
app.use(cors());








//CONFIGURAMOS LAS RUTAS
const { chatApi } = require('./routes/chat/chat');
chatApi(app);







//CONFIGURAMOS LOS SOCKETS
const sockectConfig = require('./socket/main');
sockectConfig(server);





server.listen(config.port, () => console.log("server has started on port " + config.port));