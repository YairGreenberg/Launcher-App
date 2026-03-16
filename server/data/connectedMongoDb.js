import { MongoClient } from 'mongodb';

const MONGO_URL = 'mongodb+srv://yair290899_db_user:ZlipWmZT4QXMHolE@cluster5.ytxhcbe.mongodb.net/launcher'
const CONTROLER_NAME = 'launcher'


async function connectedToMongo(){
    try{
        const client = new MongoClient(MONGO_URL)

        await client.connect();
        const data = client.db(CONTROLER_NAME)
        console.log('connected to MongoDB')
    }catch(error){
        console.error("connected error:",error)
    }finally{
         await client.close();
    }
}