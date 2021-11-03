import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import { config, createKnex } from './lib/createKnex.js'


const createApp = async () => {
    const rootRouter = express.Router();

    const app = express();

    app.use(session({
        'secret': '8dj56ks892jd85h2h6'
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    app.use('/', rootRouter);

    const knex = await createKnex(config, 0);


    rootRouter.get('/testendpoint', async (req, res) => {
        try {
            //do something
        } catch (e) {
            console.log(e);
            //handle error;
        }
    })

    rootRouter.post('/testendpoint', async (req, res) => {
        try {
            //do something
        } catch (e) {
            console.log(e);
            //handle error;
        }
    })

    rootRouter.put('/testendpoint', async (req, res) => {
        try {
            //do something
        } catch (e) {
            console.log(e);
            //handle error;
        }
    })

    rootRouter.delete('/testendpoint', async (req, res) => {
        try {
            //do something
        } catch (e) {
            console.log(e);
            //handle error;
        }
    })

    return app;
}

export default createApp;