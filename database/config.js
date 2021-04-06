const mongoose = require('mongoose');



const dbConnection = async ()=>{
    try {

        await mongoose.connect(process.env.MONGO_CON,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('base de datops true')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar base de datos')
        
    }


}


module.exports= {
    dbConnection
}


