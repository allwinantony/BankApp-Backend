//1) server - mongodb integration

//import mongoos
const mongoose = require('mongoose');


//2) state connection strung via mongoos
mongoose.connect('mongodb://localhost:27017/bankServer',{
    useNewUrlParser:true //its to avoid warnings


});


//3) define bank db model
    const User = mongoose.model('User',{
        //schema ccreation
        acno: Number,
        username:String,
        password:Number,
        balance:0,
        transaction:[]
    })


module.exports = {
    User
}