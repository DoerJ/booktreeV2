const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'client/build')));

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`LISTENING TO PORT ${port}...`);
});
