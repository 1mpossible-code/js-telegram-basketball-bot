// Configure 'dotenv'
import * as dotenv from "dotenv";

dotenv.config();

interface IConfig {
    token: string,
    dbURI: string,
}


export const config: IConfig = {
    token: process.env.BOT_TOKEN,
    dbURI: process.env.DB_URI,
}

for (const [k, v] of Object.entries(config)) {
    if (v === undefined) {
        throw new Error(`${k} must be provided!`);
    }
}
