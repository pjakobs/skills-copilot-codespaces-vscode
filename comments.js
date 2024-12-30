// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/comments', (req, res) => {
  fs.readFile(__dirname + '/comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Server error');
    } else {
      const comments = JSON.parse(data);
      res.send(comments);
    }
  });
});

app.post('/comments', (req, res) => {
  const newComment = req.body;
  fs.readFile(__dirname + '/comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Server error');
    } else {
      const comments = JSON.parse(data);
      comments.push(newComment);
      fs.writeFile(__dirname + '/comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          res.status(500).send('Server error');
        } else {
          res.send(newComment);
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});