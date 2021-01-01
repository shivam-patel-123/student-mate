const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const dbString = process.env.DATABASE_STRING.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(dbString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('DB Connection Successful !');
    })
    .catch((err) => {
        console.log(err);
    });

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
