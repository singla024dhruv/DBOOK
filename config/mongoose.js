const mongoose =require('mongoose');
const env = require('./environment');
mongoose.connect(`mongodb://127.0.0.1/${env.db}`);


const db=mongoose.connection;
db.on('error',console.error.bind(console,"error connecting to mongodb"));

db.once('open',function(){
    console.log('Connected to database:: MongoDB');
    // console.log(process.env.DBOOK_ASSET_PATH);

});

module.exports = db;
