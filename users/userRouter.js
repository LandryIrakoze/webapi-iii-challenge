const express = require('express');
const router = express.Router();
const userDb = require('./userDb');

router.post('/', validateUser, (req, res) => {
    userDb.insert(req.body)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: 'error creating user' })
        })
});

router.post('/:id/posts', validateUser, (req, res) => {
    userDb.insert(req.body)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: 'error creating user' })
        })
}); 

router.get('/', (req, res) => {
    userDb.get()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: 'error fetching users' })
        })
});

router.get('/:id', validateUserId, (req, res) => {
    userDb.getById(req.user)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: 'error fetching user' })
        })
});

router.get('/:id/posts', validateUserId, (req, res) => {
    userDb.getUserPosts(req.user)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: 'error fetching user post' })
        })
}); 

router.delete('/:id', validateUserId, (req, res) => {
    userDb.remove(req.user)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: 'error removing user' })
        })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
    userDb.update(req.user, req.body)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: 'error updating user' })
        })
});

//custom middleware
function validateUserId(req, res, next) {
    if (req.params.id) {
        req.user = req.params.id;
    } else {
        res.status(400).json({ message: 'invalid user id' });
    }
    next();
}; //update

function validateUser(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: 'missing user data' });
    } else if (!req.body.name) {
        res.status(400).json({ message: 'missing required name field' });
    }
    next();
}; //update

function validatePost(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: 'missing post data' });
        next();
    } else if (!req.body.text) {
        res.status(400).json({ message: 'missing required text field' });
        next();
    }
}; //update

module.exports = router;
