import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import { config, createKnex } from './lib/createKnex.mjs'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js'
dotenv.config()



const createApp = async () => {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
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

    rootRouter.post('/register', async (req, res) => {
        try{
            let result = await knex('users').where({ email: req.body.email }).select('*');

            if (!result || !result[0]) {
                let response = await knex('users').insert({
                    email: req.body.email
                });
                return res.json('User Account Created');
            } else {
                return res.json('This user already exists');
            } 
        } catch (e) {
            console.log(e)
            return res.json(e);
        }
    });

    // rootRouter.get('/user-exists', async (req, res) => {
    //     try{
    //         let result = await knex('users').where({ email: req.query.email }).select('*');

    //         if (!result || !result[0]) {
    //             return res.json("user does not exist");
    //         }
    //         return res.json(result)
    //     } catch (e) {
    //         console.log(e)
    //         return res.json(e);
    //     }
    // })

    rootRouter.post('/setpassword', async (req, res) => {
        try {
            let result = await knex('users').select('*').where({ email: req.body.email });

            if (result[0].password.length === 0) {
                bcrypt.hash(req.body.password, 10, async(err, hash) => {
                    try {
                        await knex('users')
                            .where({ email: req.body.email })
                            .update({ password: hash })
                        if(req.body.email.trim().length > 0){
                            const accessToken = jwt.sign({ email: req.body.email,  pass: hash }, ACCESS_TOKEN_SECRET);
                            req.session.loginAuthToken = accessToken;
                        }

                        return res.json("password updated");
                    } catch (e) {
                        return res.json(e);
                    }
                });
            } else {
                return res.json('Password update is not needed');
            }
        } catch (e) {
            console.log(e);
            return res.json(e);
        }
    })

    rootRouter.post('/login', async (req, res) => {
        try {
            let result = await knex('users')
                .where({ email: req.body.email })
            if (!result || !result[0]) {
                return res.json("user not found");
            }
            bcrypt.compare(req.body.password, result[0].password, function(err, response) {
                if(response) {
                    const accessToken = jwt.sign({ email: req.body.email,  pass: result[0].password }, ACCESS_TOKEN_SECRET);
                    req.session.loginAuthToken = accessToken;
                } else {
                    result[0].authenticated = false;
                }
                return res.json(result);
            })
        } catch (e) {
            return res.json(e);
        }
    })

    rootRouter.get('/logout', async (req, res) => {
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
        });
        return res.json('logged out');
    })
    
    rootRouter.get('/records', async (req, res) => {
        try {
            let decoded = jwt.verify(req.session.loginAuthToken, ACCESS_TOKEN_SECRET);
            
            let result = await knex('passwords').select('*').where({
                username: decoded.email,
            });
            

            return res.json({
                message: 'success',
                entries: result,
            })
        } catch (e) {
            return res.json(e);
        }
    })

    rootRouter.get('/record', async (req, res) => {
        try {
            let decoded = jwt.verify(req.session.loginAuthToken, ACCESS_TOKEN_SECRET);
            let { title } = req.query;
            let key = decoded.pass.slice(27, decoded.pass.length);
            
            let result = await knex('passwords').select('*').where({
                username: decoded.email,
                title: title
            });

            let decrypted = CryptoJS.AES.decrypt(result[0].password, key).toString(CryptoJS.enc.Utf8);            

            return res.json({
                message: 'success',
                password: decrypted,
            })
        } catch (e) {
            return res.json(e);
        }
    })
    
    rootRouter.post('/record', async (req, res) => {
        try {
            let decoded = jwt.verify(req.session.loginAuthToken, ACCESS_TOKEN_SECRET);
            let { email, password, title } = req.body;
            let key = decoded.pass.slice(27, decoded.pass.length);

            let data = CryptoJS.AES.encrypt(password, key); // Encryption Part

            await knex('passwords').insert({
                username: decoded.email,
                title, title,
                email: email,
                password: data.toString(),
            })

            return res.json('success, password saved')
            
        } catch (e) {
            return res.json(e);
        }
    });

    rootRouter.put('/record', async (req, res) => {
        try {
            let decoded = jwt.verify(req.session.loginAuthToken, ACCESS_TOKEN_SECRET);
            let { title, newPassword, newEmail } = req.body;

            if (!newEmail) {
                newEmail = (await knex('passwords').select('email').where({
                    title: title,
                    username: decoded.email
                }))[0].email
            }

            let key = decoded.pass.slice(27, decoded.pass.length);

            let data = CryptoJS.AES.encrypt(newPassword, key);
            console.log('$', data.toString());

            await knex('passwords').where({
                title: title,
                username: decoded.email
            }).update({
                email: newEmail,
                password: data.toString(),
            })

            return res.json({
                message: 'password and email updated'
            })

        } catch (e) {
            return res.json(e);
        }
    });

    rootRouter.delete('/record', async (req, res) => {
        try {
            let decoded = jwt.verify(req.session.loginAuthToken, ACCESS_TOKEN_SECRET);
            let { title, email } = req.body

            await knex('passwords').where({
                title: title,
                email: email,
                username: decoded.email
            }).del()

            return res.json({
                message: "Password record successfully deleted"
            })
        } catch (e) {
            return res.json(e);
        }
    });



    return app;
}

export default createApp;