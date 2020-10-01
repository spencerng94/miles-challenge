const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../dist'));


app.get('/api/rewards', function(req, res) {
  // TODO 
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
