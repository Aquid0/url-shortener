require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const urlRoutes = require('./routes/urlRoutes');
const { redirectUrl } = require('./controllers/urlController');

const userRoutes = require('./routes/userRoutes');

app.use(express.json());

// API Routes
app.use('/api/v1', urlRoutes);
app.use('/api/v1', userRoutes);

app.get('/:code', redirectUrl);

// Test
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})