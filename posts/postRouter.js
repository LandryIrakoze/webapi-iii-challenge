const express = require('express');
const router = express.Router();
const postDb = require('./postDb');

router.post('/', validatePostId, (req, res) => {
    postDb.insert(req.body)
        .then(res => {
            res.status(200).json(res)
        })
        .catch(error => {
            res.status(500).json({ message: 'error creating post' })
        })
})

router.get('/', (req, res) => {
    postDb.get()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: 'error retrieving posts' })
        })
});

router.get('/:id', validateUserId, (req, res) => {
    postDb.getById(req.params.id)
    .then(item => {
        if (item) {
            res.status(200).json(item)
        } else {
            res.status(400).json({ message: 'invalid user id' })
        }
    })
    .catch(error => {
        res.status(500).json({ message: 'error validating user' })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
    postDb.remove(req.user)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: 'error removing post' })
        })
});

router.put('/:id', validateUserId, validatePostId, (req, res) => {
    postDb.update(req.user, req.body)
        .then(res => {
            res.status().json()
        })
        .catch(error => {
            res.status().json({ message: 'error updating post' })
        })
});

// custom middleware
function validateUserId(req, res, next) {
    postDb.getById(req.params.id)
        .then(item => {
            if (item) {
                req.user = req.params.id
            } else {
                res.status(400).json({ message: 'invalid user id' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'error validating user' })
        })
    next();
};

function validatePostId(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: 'missing post data'});
    } else if (!req.body.text) {
        res.status(400).json({ message: 'missing required text field' });
    }
    next();
};

module.exports = router;