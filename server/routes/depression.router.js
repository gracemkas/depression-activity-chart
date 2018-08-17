const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require('moment');

router.get('/', (req, res) => {
    if (req.isAuthenticated) {
        // const todayDate = moment().format('L');
        const todayDate = moment().format().split('T', 1);
        const queryText = `SELECT "time", "depression_rating", "id" FROM daily_log WHERE "date" = $1;`;
        pool.query(queryText, [todayDate])
            .then((results) => {
                res.send(results.rows)
                console.log(results.rows);

            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.put('/date/:date', (req, res) => {
    if (req.isAuthenticated) {
        // const todayDate = moment().format('L');
        // const todayDate = moment().format().split('T', 1);
        console.log('req.body put', req.body)
        const queryText = `SELECT "time", "depression_rating", "id" FROM daily_log WHERE "date" ILIKE $1;`;
        pool.query(queryText, [req.body])
            .then((results) => {
                res.send(results.rows)
                console.log(results.rows);

            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

//should be a get
router.put('/find/:name', (req, res) => {
    if (req.isAuthenticated) {
        console.log('req.body', req.body);
        
        const queryText = `SELECT * FROM "therapist_info"
                            WHERE "first_name" ILIKE $1 
                            AND "last_name" ILIKE $2;`;
        pool.query(queryText, [req.body.first_name, req.body.last_name])
            .then((results) => {
                res.send(results.rows)
                console.log(results.rows);

            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.put('/date/:date', (req, res) => {
    if (req.isAuthenticated) {
        console.log('req.body', req.body);
        
        const queryText = `SELECT "time", "depression_rating", "id" FROM daily_log WHERE "date" = $1;`;
        pool.query(queryText, [req.body])
            .then((results) => {
                res.send(results.rows)
                console.log(results.rows);

            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.get('/therapist', (req, res) => {
    if (req.isAuthenticated) {
        console.log('userid', req.user.id);
        
        const queryText = `SELECT "therapist_info"."first_name", "therapist_info"."last_name" FROM "patient_info"
        JOIN "therapist_info" ON "patient_info"."therapist_id" = "therapist_info"."id"
        WHERE "patient_info"."person_id" = $1;`;
        pool.query(queryText, [req.user.id])
            .then((results) => {
                res.send(results.rows[0])
                console.log(results.rows);

            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.post('/', (req, res) => {
    console.log('got to post', req.body);
    if (req.isAuthenticated) {
        const newLog = req.body
        // const date = moment().format('L');
        const date = moment().format().split('T', 1);
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

router.put('/:id', (req, res) => {
    console.log('got to put', req.body)
    if (req.isAuthenticated) {
        const queryText = `Update "daily_log" SET "depression_rating" = $1, "activity" = $2 WHERE id=$3`;
        pool.query(queryText, [req.body.depression_rating, req.body.activity, req.params.id])
            .then(() => { res.sendStatus(200); })
            .catch((err) => {
                console.log('Error updating', err);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

router.put('/therapist/:id', (req, res) => {
    console.log('got to put', req.body)
    if (req.isAuthenticated) {
        const queryText = `Update "patient_info" SET "therapist_id" = $1 WHERE "person_id" = $2;`;
        pool.query(queryText, [req.params.id, req.user.id])
            .then(() => { res.sendStatus(200); })
            .catch((err) => {
                console.log('Error updating', err);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

router.delete('/:id', (req, res) => {
    if (req.isAuthenticated) {
        const queryText = 'DELETE FROM "daily_log" WHERE id=$1';
        pool.query(queryText, [req.params.id])
            .then(() => { res.sendStatus(200); })
            .catch((err) => {
                console.log('Error deleting', err);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;