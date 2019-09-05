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

router.post('/:id/posts', validatePost, (req, res) => {
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

router.get('/:id', validateUser, (req, res) => {
    userDb.getById(req.params.id)
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

// router.get('/:id/posts', validateUserId, (req, res) => {
//     userDb.getUserPosts(req.user)
//         .then(user => {
//             res.status(200).json(user)
//         })
//         .catch(error => {
//             res.status(500).json({ message: 'error fetching user post' })
//         })
// }); 
router.get('/:id/posts', validateUserId, (req, res) => {
    userDb.getUserPosts(req.params.id)
        .then(item => {
            if (item) {
                res.status(200).json(item)
            } else {
                res.status(400).json({ message: 'user has no posts' })
            }
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

function validateUserId(req, res, next) {
    userDb.getById(req.params.id)
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

function validateUser(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: 'missing user data' });
    } else if (!req.body.name) {
        res.status(400).json({ message: 'missing required name field' });
    }
    next();
}; 

function validatePost(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: 'missing post data' });
        next();
    } else if (!req.body.text) {
        res.status(400).json({ message: 'missing required text field' });
        next();
    }
}; 

module.exports = router;
