//import jwt Token
const jwt = require('jsonwebtoken');

//import db.js
const db=require('./db')

  // userDetails ={//objects of objects
  //   1000:{acno:1000, username:'Hussain',password:1000,balance:10000, transaction:[]},
  //   1001:{acno:1001, username:'Reymond',password:1001,balance:10000, transaction:[]},
  //   1002:{acno:1002, username:'Fayas',password:1002,balance:1000, transaction:[]}
  // }

  const signup = (acno, username, password)=>{

    return db.User.findOne({acno})//port 27017
    .then(user=>{
      if(user){
        return{
          statusCode:401,
          status: false,
          message:'user already exists'
        }
      }
      else{
        const newUser = new db.User({
          acno,
          username,
          password,
          balance:0,
          transaction:[]
        })
        newUser.save()
        return{
          statusCode:200,
          status: true,
          message:'successfully registered'
        }
      }
    })

    //   if(acno in userDetails){
    //     // return false
    //     return{
    //         statusCode:401,
    //         status: false,
    //         message:'user already exists'
    //     }
    //   }
    //   else{
    //     userDetails[acno]={acno,username,password,balance:0,transaction:[]}

    //   console.log(userDetails)
    // //   return true
    //   return{
    //     statusCode:200,
    //     status: true,
    //     message:'successfully registered'
    //   }
    // }
    }

    const login = (acno, pswd) =>{
      
      return db.User.findOne({acno,password:pswd})
      .then(user=>{
        if(user){
          currentUser = user.username;
          currentAcno = acno;
          //token generation
        const token = jwt.sign({currentAcno:acno},'superkey2022')
          return{
            statusCode:200,
            status: true,
            message:'Login successfull',
            currentAcno,
            currentUser,
            token 
          }
        }
        else{
          return{
            statusCode:401,
            status: false,
            message:'user not found'
          }
        }
      })

    //   if(acno in userDetails){
    //     if(pswd == userDetails[acno].password){
    //       currentUser = userDetails[acno].username;
    //       currentAcno = acno;
    //   //token generation
    //   const token = jwt.sign({currentAcno:acno},'superkey2022')
    //       return{
    //         statusCode:200,
    //         status: true,
    //         message:'Login successfull',
    //         currentAcno,
    //         currentUser,
    //         token
    //       }        
    //     }
    //     else{
    //       return{
    //         statusCode:401,
    //         status: false,
    //         message:'password error'
    //     }
    //     }
    //   }
    //   else{
    //     return{
    //       statusCode:401,
    //       status: false,
    //       message:'user not found'
    //   }
    // }
    }


    const deposit = (acno, pswd, amount) =>{

      return db.User.findOne({acno,password:pswd})
      .then(user=>{
        if(user){
          user.balance += parseInt(amount);
          user.transaction.push({
            type: 'Credit',
            amount
          })
          user.save();
          return{
            statusCode:200,
            status:true,
            message:`${amount} is credited and balance is ${user.balance}`
          }
        }
        else{
          return{
            statusCode:401,
            status: false,
            message:'invalid password or account details'
          }
        }
      })

      // if(acno in userDetails){
      //   if(pswd == userDetails[acno].password){
      //     userDetails[acno].balance += parseInt(amount);
      //     userDetails[acno].transaction.push({
      //       type: 'Credit',
      //       amount
      //     })
      //     console.log(userDetails);
      //     // return userDetails[acno].balance;
      //     return{
      //       statusCode:200,
      //       status: true,
      //       message:`${amount} is credited and balance is ${userDetails[acno]['balance']}`
      //     }
      //   }
      //   else{
      //     return{
      //       statusCode:401,
      //       status: false,
      //       message:'invalid password'
      //   }
      //   }
      // }
      // else{
      //   return{
      //     statusCode:401,
      //     status: false,
      //     message:'invalid user details'
      //   }      
      // }
    }

    const withdraw = (acno, pswd, amount)=>{

      return db.User.findOne({acno,password: pswd})
      .then(user=>{
        if(user){
          user.balance -= parseInt(amount);
          user.transaction.push({
          type: 'debit',
          amount
          })
          user.save()
          return{
            statusCode:200,
            status: true,
            message:`${amount} is debited and balance is ${user.balance}`
          }
        }
        else{
          return{
            statusCode:401,
            status: false,
            message:'invalid password or account details'
          }
        }
      })

      // if(acno in userDetails){
      //   if(pswd == userDetails[acno].password){
      //     if(parseInt(amount) < userDetails[acno].balance || parseInt(amount) == userDetails[acno].balance){
      //       userDetails[acno].balance -= parseInt(amount);
      //       userDetails[acno].transaction.push({
      //         type: 'debit',
      //         amount
      //       })
      //       console.log(userDetails)
      //       return{
      //         statusCode:200,
      //         status: true,
      //         message:`${amount} is debited and balance is ${userDetails[acno]['balance']}`
      //       }
      //     }
      //     else{
      //       return{
      //         statusCode:401,
      //         status: false,
      //         message:'insufficient balance'
      //     }
      //     }
      //   }
      //   else{
      //     return{
      //       statusCode:401,
      //       status: false,
      //       message:'invalid password'
      //   }
      //   }
      // }
      // else{
      //   return{
      //     statusCode:401,
      //     status: false,
      //     message:'invalid account details'
      // }
      // }
    }

    const getTransaction =(acno) => {
      return db.User.findOne({acno})
      .then(user=>{
        if(user){
          return{
            statusCode:200,
            status: true,
            transaction: user.transaction
          }
        }
        else{
          return{
            statusCode:401,
            status: false,
            message:'invalid user details'
          }
        }
      })
    }
  
    //delete account
    const deleteAcc=(acno)=>{
      return db.User.deleteOne({acno})
      .then(user=>{
        if(user){
          return{
            statusCode:200,
            status: true,
            message: 'Account deleted'
          }
        }
        else{
          return{
            statusCode:200,
            status: true,
            message: 'invalid account details'
          }
        }
      })
    }

  module.exports={
    signup,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAcc
  }