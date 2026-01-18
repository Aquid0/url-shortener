require('dotenv').config();
const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

const urlRoutes = require('./routes/urlRoutes');
const { redirectUrl } = require('./controllers/urlController');

const userRoutes = require('./routes/userRoutes');

app.use(express.json());

// API Routes
app.use('/api/v1', urlRoutes);
app.use('/api/v1', userRoutes);

// Short code redirects (before static files)
app.get('/:code', redirectUrl);

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})