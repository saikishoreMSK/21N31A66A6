const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const app = express();
const port = 3000;

app.use(bodyParser.json());
//

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'your-client-secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post('/calculate', (req, res) => {
    const numbers = req.body.numbers;
    
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return res.status(400).send({ error: 'Please provide an array of numbers.' });
    }

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const average = sum / numbers.length;

    res.send({ average });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
