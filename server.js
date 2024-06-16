let projectData = {};
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());
app.use(express.static('website'));
app.post('/add', addInfo);

function addInfo(req, res) {
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['content'] = req.body.content;
    res.send(projectData);
}
app.get('/all', getInfo);
function getInfo(req, res) {
    res.send(projectData);
};
const port = 8080;
const server = app.listen(port, () => {
    console.log(`server started and listening in port: ${port}`);
});