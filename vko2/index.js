const express = require("express");
const path = require('path');
const app = express();
const PORT = 3000;
const list = []

app.use(express.json());

app.get('/hello', (req, res) => res.json({
    msg: "Hello world"
}));

app.get('/echo/:id', (req, res) => {
    res.json({
        id: req.params.id
    })
})

app.post('/sum', (req, res) => {
    let sum = 0;
    req.body.numbers.map((num) => sum = sum + num)
    res.json({sum: sum})
})

app.post('/list', (req, res) => {
    list.push(req.body.text)
    res.json({list: list})
})

app.use(express.static(path.join(__dirname, 'frontend')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));