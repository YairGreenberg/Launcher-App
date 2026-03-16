import 'dotenv'
import dbMongo from '../data/connectedMongoDb.js'
import express from 'express';
import bcrypt from 'bcryptjs'
import {v4 as uuidv4} from 'uuid'

const JWT_secret ='secret_key'      // process.env.JWT_secret
const routerAuth = express()


routerAuth.post('/rgister',async (req,res)=>{
    try{
        const {username,password} =req.body
        if(!username || !password){
            return res.status(400).json({error: "enter username and password"})
        }
        const passwordHash = await bcrypt.hash(password,10)

        const user = {
            id: uuidv4(),
            username:username,
            passwordHash:passwordHash
        }
        const addUser = await dbMongo.collaction("users").insertOne(user)
        res.status(201).json({success: 'user added successfuly'})
    }catch(error){
        console.error(error)
        res.status(500).json({error:   'server error'})
    }
})


routerAuth.post('login', async(req,res)=>{
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
        const token = jwt.sign({id:user.id,username: user.username },JWT_secret,{expireIn: '24h'})
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