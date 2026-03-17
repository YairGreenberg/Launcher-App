import 'dotenv'
import dbMongo from '../data/connectedMongoDb.js'
import { authToken, requireAdmin} from '../middleware/middlewarAuth.js';
import express from 'express';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {v4 as uuidv4} from 'uuid'

const JWT_secret ='secret_key'      // process.env.JWT_secret
const routerAuth = express()


routerAuth.post('/rgister',authToken,requireAdmin,async (req,res)=>{
    try{
        const {username,password,email,user_type} =req.body
        if(!username || !password ||!email||!user_type){
            return res.status(400).json({error: "enter username and password and email and user_type"})
        }
        const passwordHash = await bcrypt.hash(password,10)

        const user = {
            id: uuidv4(),
            username:username,
            passwordHash:passwordHash,
            email:email,
            user_type:user_type
        }
        const addUser = await dbMongo.collection("users").insertOne(user)
        res.status(201).json({success: 'user added successfuly'})
    }catch(error){
        console.error(error)
        res.status(500).json({error:   'server error'})
    }
})


routerAuth.post('/login', async(req,res)=>{
    const {password,username} = req.body

    if(!password||!username){
        return res.status(401).json({error: "password or username is not corect"})
    }
    try{
        const user = await dbMongo.collection('users').findOne({username:username});
        if(!user){
            return res.status(401).json({error: 'invlid username'})
        }
        const valid = await bcrypt.compare(password,user.passwordHash)
        if(!valid){
            return res.status(401).json({error: 'invlid password'})            
        }
        await dbMongo.collection('users').updateOne({id: user.id},{$set:{last_login: new Date()}})


        const token = jwt.sign({id:user.id,username: user.username },JWT_secret,{expiresIn: '24h'})
        res.json({
            token,
            user:{
                username:`${user.username} login`
            }
        })
    }catch(error){
        console.error(error)
        res.status(500).json({error: "server error"})
    }
})

export default routerAuth;