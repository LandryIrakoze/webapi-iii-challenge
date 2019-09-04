const express = require('express');
const router = express.Router();
const postDb = require('./postDb');

router.post('/', (req, res) => {
    const body = req.body;

    postDb.insert(body)
        .then(res => {
            res.status(200).json(res)
        })
        .catch(error => {
            res.status(500).json({ message: 'error creating post' })
        })
})

router.get('/', (req, res) => {
    postDb.get()
        .then(res => {
            res.status(200).json(res)
        })
        .catch(error => {
            res.status(500).json({ message: 'error retrieving posts' })
        })
});

// router.get('/:id', (req, res) => {
//     const { id } = req.params;

//     postDb.getById(id)
//         .then(res => {
//             res.status(200).json(res)
//         })
//         .catch(error => {
//             res.status(500).json({ message: 'error retrieving post' })
//         })
// });
router.get('/:id', validateUserId, (req, res) => {
    postDb.getById(req.user)
        .then(res => {
            res.status(200).json(res)
        })
        .catch(error => {
            res.status(500).json({ message: 'error retrieving post' })
        })
});

// router.delete('/:id', (req, res) => {
//     const { id } = req.params;

//     postDb.remove(id)
//         .then(res => {
//             res.status(200).json(res)
//         })
//         .catch(error => {
//             res.status(500).json({ message: 'error removing post' })
//         })
// });
router.delete('/:id', validateUserId, (req, res) => {
    postDb.remove(req.user)
        .then(res => {
            res.status(200).json(res)
        })
        .catch(error => {
            res.status(500).json({ message: 'error removing post' })
        })
});

// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const body = req.body;

//     postDb.update(id, body)
//         .then(res => {
//             res.status().json()
//         })
//         .catch(error => {
//             res.status().json({ message: 'error updating post' })
//         })
// });
router.put('/:id', validateUserId, validatePostId, (req, res) => {
    postDb.update(req.user, body)
        .then(res => {
            res.status().json()
        })
        .catch(error => {
            res.status().json({ message: 'error updating post' })
        })
});

// custom middleware
function validateUserId(req, res, next) {
    const { id } = req.params;

    if (!id) {
        req.user = id;
        next();
    } else {
        res.status(400).json({ message: 'invalid user id' });
        next();
    }
};

function validatePostId(req, res, next) {
    const body = req.body;

    if (!body) {
        res.status(400).json({ message: 'missing post data'});
        next();
    } else if (!body.text) {
        res.status(400).json({ message: 'missing required text field' });
        next();
    }
};

module.exports = router;