const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3000;

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
    const responseData = { message: 'Server ready!' };
    res.json(responseData);
});
app.use('/api', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});