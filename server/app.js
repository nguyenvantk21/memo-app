const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, '../dist')));

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

app.use(session({
    secret: 'memo-app-login',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1800000 } //30 minutes
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});
app.use('/api', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});