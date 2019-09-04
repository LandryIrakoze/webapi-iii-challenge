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
  let { id } = req.params;
  if (id) {
    req.user = id;
  } else {
    res.status(400).json({ message: 'invalid user id' })
  }
  next();
};

function validateUser(req, res, next) {
  let { body } = req.body;
  if (!body) {
    res.status(400).json({ message: 'missing user data' })
  } else if (!body.name) {
    res.status(400).json({ message: 'missing required name field' })
  }
  next();
}

function validatePost(req, res, next) {
  let { body } = req.body;
  if (!body) {
    res.status(400).json({ message: 'missing post data '})
  } else if (!body.text) {
    res.status(400).json({ message: 'missing required text field' })
  }
}

module.exports = server;
