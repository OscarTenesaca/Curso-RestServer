const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath= '/api/usuarios'

        // connectara la base de atos
        this.conectarDB();


        // midelwares
        this.middelwares();
        // rutas de mi app
        this.routes();

    }

    async conectarDB(){
        //  una o varia conexiones 
        await dbConnection();

    }

    middelwares(){

        //siempre cpnmfigurarlo si es fuera del local
        this.app.use(cors());

        //plectura y parceo de body
        this.app.use( express.json() );

        //direcctorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath , require('../routes/usuarios'));        
    }

    lisen(){

        this.app.listen(this.port, ()=>{
            console.log('servidor corriendo en el puerto',this.port)

        });
    }

}

module.exports = Server;