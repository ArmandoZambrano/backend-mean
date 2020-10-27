
const mongoose = require('mongoose');


const dbConnection = async() => {

    //usuario db
// userdb_271020
//OzTINkJzMg9wQX5t

//usuario no admin
// userdb1_271020
//xSCyEAOJPwv2ABqZ

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };

// const uri= 'mongodb://localhost:27017/MyDoctorDB?retryWrites=true&w=majority';

//cluster0-shard-00-00.00qvq.mongodb.net

const uri= process.env.DB_CNN;


    try{


        await mongoose.connect(uri, options).then(
            () => { console.log('BD Online'); },
            err => { console.log(err); }
          );


    }catch (error){

        console.log(error);
        //throw new Error('Error a la hora de inicar la BD ver logs');

    }

    /*

   const uri = "mongodb://userdb1_271020:xSCyEAOJPwv2ABqZ@cluster0-shard-00-00.00qvq.mongodb.net:27017,cluster0-shard-00-01.00qvq.mongodb.net:27017,cluster0-shard-00-02.00qvq.mongodb.net:27017/MyDoctorDB?replicaSet=Cluster0-shard-0&authSource=test&retryWrites=true&w=majority"

   mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
       .catch(error => console.log(error));
*/
}

module.exports = {
    dbConnection
}