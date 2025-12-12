import { connect } from 'mongoose';

const connectMongoDB = async () => {
    const URI_MONGODB = process.env.URI_MONGODB
    const DB_NAME = process.env.DB_NAME
    if (!URI_MONGODB || !DB_NAME) {
        connect('mongodb://localhost:27017/db', {});
        return;
    };

    await connect(URI_MONGODB, {
        dbName: DB_NAME
    })
};
export default connectMongoDB;