//server creation

//1.import express

const express = require('express');


//to import dataService
const dataService=require('./service/dataService');

//import jwt Token
const jwt = require('jsonwebtoken');

//import cors
const cors = require('cors');

//2.create an app using the express

const app = express();

//give command to share data via cors
app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:8080/','http://192.168.0.103:8080']
}))

//to parse JSON from Request body
app.use(express.json());

//3.create port number
app.listen(3000, ()=>{
    console.log('server listening on the port 3000');
})
//application specific middleware
const appMiddleware= (req,res,next) => {
    console.log("application specific middleware");
    next()
}
app.use(appMiddleware)

//router specific middleware(for token verification)
const jwtMiddleware = (req,res,next) =>{
    try{
        const token = req.headers["x-access-token"];
        console.log("Router specific middleware");
        const data = jwt.verify(token,"superkey2022");
        console.log(data);
        next()
    }
    catch{
        res.status(422).json({
            statusCode:422,
            stattus:false,
            message:"please login"
        })
    }
}
// app.use(jwtMiddleware)



//4.resolving http requests
    //4.1) get method- to get data
    app.get('/',(req,res)=>{
        res.send('GET METHOD');
    })

    //4.2) post method- to create data
    app.post('/',(req,res)=>{
        res.send('POST METHOD');
    })

    //4.3) put method - to update data completely( ie; updates the entire resource)
    app.put('/',(req,res)=>{
        res.send('PUT METHOD');
    })

    //4.4) delete method - 
    app.delete('/',(req,res)=>{
        res.send('PUT DELETE');
    })
    //4.5) patch method - make partial changes to an existing resource(ie; update data partially)
    app.patch('/',(req,res)=>{
        res.send('PATCH METHOD');
    })

//5.API calls
    //5.1)login call
    //5.2)register call
    //5.3)deposit
    //5.4)withdraw
    //5.5)delete
    //5.6)transaction history


    //resolving register requests
    app.post('/signup',(req,res)=>{
        console.log(req.body);
        dataService.signup(req.body.acno, req.body.username, req.body.password)
        .then(result=>{
            res.status(result.statusCode).json(result)
        })
        // if(result){
        //     res.send('successfull');
        // }
        // else{
        //     res.send('failed to register user');
        // }
        // res.send('yeah bud! successfull')
    })

    //resolving login requests
    app.post('/login',(req,res)=>{
        console.log(req.body);
        dataService.login(req.body.acno, req.body.password)
        .then(result=>{
            res.status(result.statusCode).json(result)
        })
    })


    //resolving deposit requests
    app.post('/deposit',jwtMiddleware,(req,res)=>{
        console.log(req.body);
        dataService.deposit(req.body.acno, req.body.password, req.body.amount)
        .then(result=>{
            res.status(result.statusCode).json(result)

        })
    })


   //resolving withdraw requests
   app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.withdraw(req.body.acno, req.body.password, req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
   })


    //resolving transaction history
    app.post('/transaction',jwtMiddleware,(req,res)=>{
        console.log(req.body);
        dataService.getTransaction(req.body.acno, req.body.password)
        .then(result=>{
            res.status(result.statusCode).json(result)
        })
    })        

    //resolving deleteAcc
    app.delete('/deleteAcc/:acno',(req,res)=>{
        dataService.deleteAcc(req.params.acno)
        .then(result=>{
            res.status(result.statusCode).json(result)
        })
    })