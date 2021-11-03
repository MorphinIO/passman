import knx from 'knex';

let connection;
if (process.env.DATABASE_URL) {
    connection = process.env.DATABASE_URL
  } else {
    connection = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`
}

export const config = {
client: 'pg',
connection: connection
}

export const createKnex = async (config, count) => {
if (count < 5) {
    try {
        const knex = knx(config);
        return knex;
    } catch (e) {
        console.log(e);
        console.log('Attempts:', count);
        await new Promise(res => setTimeout(res, 5000));
        return createKnex(config, count + 1)
    }
}
}