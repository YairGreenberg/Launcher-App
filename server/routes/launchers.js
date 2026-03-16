import express from 'express';
import {v4 as uuidv4} from 'uuid'
import dbMongo from '../data/connectedMongoDb.js';


const router = express();




router.post('/launchers', async(req,res)=>{
    const { city,rocketType,latitude,longitude,name } = req.body
    if(!city||!rocketType||!latitude||!longitude||!name){
        return res.status(401).json({error: 'input all catgory!'})
    }
    try{
        const launcher = {
            id: uuidv4(),
            name:name,
            rocketType:rocketType,
            latitude:latitude,
            longitude:longitude,
            city:city
        }
        await dbMongo.collection('launchers').insertOne(launcher);
        res.status(201).json({launcher:`addeed succssfly`})
    }catch(error){
        console.error(error)
        res.status(500).json({error:'server error'})
    }

})

export default router;