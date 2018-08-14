const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require('moment');

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

router.post('/', (req, res) => {
    console.log('got to post', req.body);
    if (req.isAuthenticated) {
        const newLog = req.body
        const date = moment().format('L');
        const time = moment().format('h:mm a');
        const queryText = `INSERT INTO "daily_log" ("depression_rating", "activity", "date", "time", "patient_id") VALUES ($1,$2,$3,$4,$5)`
        pool.query(queryText, [newLog.depression_rating, newLog.activity, date, time, req.user.id])
            .then(() => {
                res.sendStatus(200);
            })
            .catch((error) => {
                console.log(error);
                res.sendStatus(500)
            })
    } else {
        res.sendStatus(403);
    }
})

module.exports = router;