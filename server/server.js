const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;

var app = express();

var publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
})