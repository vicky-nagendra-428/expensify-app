const express = require('express');
const path = require('path');
const app = express();

const contentPath = path.join(__dirname, '..', 'public');
app.use(express.static(contentPath));
const port = process.env.PORT || 3000;

app.get('*', (req, res) => {
    res.sendFile(path.join(contentPath, 'index.html'));
})

app.listen(port, () => {
    console.log('server is running on 3000');
})
