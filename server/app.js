const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3000;

app.use(session({
    secret: 'memo-app-login',
    resave: false,
    saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});