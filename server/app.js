require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const urlRoutes = require('./routes/urlRoutes');

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/v1', urlRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})