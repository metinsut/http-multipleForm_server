const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const upload = require('./route/upload');
const port = 3009;

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'POST');
   res.setHeader(
      'Access-Control-Allow-Headers',
      'content-type, x-access-token, Authorization'
   );
   res.setHeader('Access-Control-Allow-Credentials', true);
   next();
});

const response = {
   message: 'Hello Canım'
};

const response2 = {
   title: 'Lorem ipsum dolor sit amet.'
};

app.get('/', (req, res) => res.json(response));

app.post('/', (req, res) => res.json(response));

app.post('/post', (req, res) => {
   res.json({
      ...{ body: req.body && req.body },
      ...{ dummy: response2 && response2 },
      ...{ params: req.query && req.query },
      ...{ header: req.headers && req.headers }
   });
});

app.use('/upload', upload);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
