require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const myFirstSecret = process.env.FIRST_SECRET_KEY;
if (!myFirstSecret) {
    console.error("JWT Secret Key is not defined in .env");
    process.exit(1); // Exit if the secret key is not defined
}
console.log("JWT Secret Key:", myFirstSecret);

require('./config/mongoose.config');
require('./routes/foodDelivery.routes')(app);
require('./routes/user.routes')(app);
require('./routes/foodItem.routes')(app);
require('./routes/order.routes')(app);

const server = app.listen(8000, () => {
    console.log("Listening at Port 8000");
});
