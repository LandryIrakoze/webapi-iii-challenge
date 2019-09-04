const express = require('express');
const router = express.Router();
const userDb = require('./userDb');

// router.post('/', (req, res) => {
//     const body = req.body;
//     userDb.insert(body)
//         .then(res => {
//             res.status(200).json(res)
//         })
//         .catch(error => {
//             res.status(500).json({ message: 'error creating user' })
//         })
// });
router.post('/', validateUser, (req, res) => {
    userDb.insert(body)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: 'error creating user' })
        })
});

// router.post('/:id/posts', (req, res) => {
//     const body = req.body;
//     userDb.insert(body)
//         .then(res => {
//             res.status(200).json(res)
//         })
//         .catch(error => {
//             res.status(500).json({ message: 'error creating user' })
//         })
// });
router.post('/:id/posts', validateUser, (req, res) => {
    userDb.insert(body)
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

// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     userDb.getById(id)
//         .then(res => {
//             res.status(200).json(res)
//         })
//         .catch(error => {
//             res.status(500).json({ message: 'error fetching user' })
//         })
// });
router.get('/:id', validateUserId, (req, res) => {
    userDb.getById(req.user)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: 'error fetching user' })
        })
});

// router.get('/:id/posts', (req, res) => {
//     const { id } = req.params;
//     userDb.getUserPosts(id)
//         .then(res => {
//             res.status(200).json(res)
//         })
//         .catch(error => {
//             res.status(500).json({ message: 'error fetching user post' })
//         })
// });
router.get('/:id/posts', validateUserId, (req, res) => {
    userDb.getUserPosts(req.user)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: 'error fetching user post' })
        })
});

// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     userDb.remove(id)
//         .then(res => {
//             res.status(200).json(res)
//         })
//         .catch(error => {
//             res.status(500).json({ message: 'error removing user' })
//         })
// });
router.delete('/:id', validateUserId, (req, res) => {
    userDb.remove(req.user)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: 'error removing user' })
        })
});

// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const body = req.body;
//     userDb.update(id, body)
//         .then(res => {
//             res.status(200).json(res)
//         })
//         .catch(error => {
//             res.status(500).json({ message: 'error updating user' })
//         })
// });
router.put('/:id', validateUserId, validateUser, (req, res) => {
    userDb.update(req.user, body)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: 'error updating user' })
        })
});

//custom middleware
function validateUserId(req, res, next) {
    const { id } = req.params;

    if (id) {
        req.user = id;
        next();
    } else {
        res.status(400).json({ message: 'invalid user id' });
        next();
    }
};

function validateUser(req, res, next) {
    const body = req.body;

    if (!body) {
        res.status(400).json({ message: 'missing user data' });
        next();
    } else if (!body.name) {
        res.status(400).json({ message: 'missing required name field' });
        next();
    }
};

function validatePost(req, res, next) {
    const body = req.body;
    
    if (!body) {
        res.status(400).json({ message: 'missing post data' });
        next();
    } else if (!body.text) {
        res.status(400).json({ message: 'missing required text field' });
        next();
    }
};

module.exports = router;
