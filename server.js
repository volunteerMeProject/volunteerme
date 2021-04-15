const express = require('express')
const app = express();
const path = require("path");
const PORT = 8080;

app.use(express.static(path.join(__dirname, "client", "build")));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/', 'client', 'build', 'index.html'));
});