import { MongoClient } from 'mongodb';
import 'dotenv/config'

const MONGO_URL = 'mongodb+srv://yair290899_db_user:ZlipWmZT4QXMHolE@cluster5.ytxhcbe.mongodb.net/launcher'
const CONTROLER_NAME = 'launcher'


async function connectedToMongo(){
    try{
        const client = new MongoClient(MONGO_URL,{
            tls: true,
            tlsAllowInvalidCertificates:true
        })

        await client.connect();
        const data = client.db(CONTROLER_NAME)
        console.log('connected to MongoDB')
        return data
        
    }catch(error){
        console.error("connected error:",error)
    }
}
const dbMongo = await connectedToMongo();
export default dbMongo;