import createApp from '../index.js';
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 8080;

// const app = createApp();
// app.listen(port, () => console.log(`Listening on port ${port}`));

createApp().then(app => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
})