const express = require('express')
const app = express();
const path = require("path");
const PORT = 8080;

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})