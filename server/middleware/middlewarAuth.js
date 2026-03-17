import jwt from 'jsonwebtoken';
import dbMongo from '../data/connectedMongoDb.js';

const JWT_secret ='secret_key'      // process.env.JWT_secret



export async function authToken(req,res,next){
    const authHeader = req.headers.authorization;
    if (!authHeader){
        return res.status(401).json({error: 'user not found'})
    }
    const token = authHeader.split(' ')[1];
    try{
        const pyload = jwt.verify(token, JWT_secret)
        const user = await dbMongo.collection('users').findOne({id: pyload.id})
        if(!user){
            return res.status(401).json({error: 'user not found'})
        }
        req.user = user;
        console.log(req.user)
        next()
    }catch(error){
        console.error(error)
        return res.status(401).json({error: 'invlud token'})
    }
}


export function requireAdmin(req,res,next){
    if(req.user.user_type !== 'admin'){
        return res.status(403).json({error: 'only admin require'})
    }
    next()
}

export function requireIntellience(req,res,next){
    if(!req.user.user_type !== 'admin' || !req.user.user_type !== 'intelligence'){
        return res.status(403).json({error: 'only admin or intelligence  require'})
    }
    next();
}