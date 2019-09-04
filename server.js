const express = require('express');

const server = express();

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter')

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//global middleware
server.use(express.json());

server.use('/api/users', logger, userRouter);
server.use('/api/posts', logger, postRouter);

//custom middleware
function logger(req, res, next) {
  console.log({
    'req method': req.method,
    'req url': `${req.protocol}:/${req.get('host')}${req.originalUrl}`,
    'timestamp': Date.now()
  })
  next();
};

function validateUserId(req, res, next) {
  if (req.params.id) {
    req.user = id;
  } else {
    res.status(400).json({ message: 'invalid user id' })
  }
  next();
}; //update

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing user data' })
  } else if (!req.body.name) {
    res.status(400).json({ message: 'missing required name field' })
  }
  next();
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing post data '})
  } else if (!req.body.text) {
    res.status(400).json({ message: 'missing required text field' })
  }
}

module.exports = server;
