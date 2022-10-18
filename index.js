const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

const PORT = 3001 || process.env.PORT;

const cors = require('cors');

app.use(cors());
app.use(express.json());


app.use('/api/practice', require('./backend/routes/routes'))

app.listen(PORT, (req,res) => {
    console.log(`SERVER LISTENING ON PORT ${PORT}...`)
})