
import express from 'express';

const app = express();
const URL = 'mongodb://localhost:27017/db';

mongoose.connect(URL, {});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log('PORT: ', PORT);
    
});