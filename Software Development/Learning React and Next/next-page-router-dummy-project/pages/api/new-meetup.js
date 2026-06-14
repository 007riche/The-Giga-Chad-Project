import { MongoClient } from "mongodb";
import { DB_USER, DB_PSWD } from "../../environ";

/**
 *  Requests on /api/new-meetup endpoint
 */

export async function handler(req, res) {
    /**
     *  POST on /api/new-meetup endpoint
     */

    if (req.method === 'POST') {
        const data = req.body;

        const { title, image, address, description } = data;
        let conn_url = `mongodb+srv://${DB_USER}:${DB_PSWD}@cluster0.ikhaiiq.mongodb.net/?appName=Cluster0`;

        console.log("CONN URL: ", conn_url);

        const client = await MongoClient
            .connect(conn_url);
        const db = client.db('meetups');
        const meetupsCollection = db.collection('meetups');
        const insertionResult = await meetupsCollection.insertOne(data);
        console.log(insertionResult);

        client.close();

        // Response
        res.status(201).json({ message: 'Meetup successfully inserted' });
    }
}