import { connect } from 'mongoose';

const connectMongoDB = async () => {
    const MONGO_URL = process.env.MONGO_URL
    const DB_NAME = process.env.DB_NAME

    await connect(MONGO_URL, {
        dbName: DB_NAME
    })
};
export default connectMongoDB;