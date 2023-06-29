const express = require('express');
const path = require('path');

const app = express();

// Папка со статикой static
app.use(express.static(path.resolve(__dirname, 'static')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});

app.listen(3030, () => console.log('listen started port 3030'));
