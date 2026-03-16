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

router.get('/launchers/:id', async (req,res)=>{
    try{
        const launcher = await dbMongo.collection('launchers').findOne({id: req.params.id})
        if(!launcher){
            return res.status(404).json({error:'launcher not found'})
        }
        res.json({launcher})
    }catch(error){
        console.error(error)
        res.status(500).json({error:'server error'})
    }
})

router.get('/launchers', async(req,res)=>{
    try{
        const launchers =await dbMongo.collection('launchers')
        .find()
        .toArray()

        res.json({launchers})

    }catch(error){
        console.error(error)
        res.status(500).json({error:'server error'})
    }
})

router.delete('/launchers/:id',async(req,res)=>{
        try{
        const launcher = await dbMongo.collection('launchers').deleteOne({id: req.params.id})
        if(!launcher){
            return res.status(404).json({error:'launcher not found'})
        }
        res.json({deel:`delete: `,launcher})
    }catch(error){
        console.error(error)
        res.status(500).json({error:'server error'})
    }

})

export default router;