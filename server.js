const express = 'express';

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log({
    'req': req,
    'res': res,
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
