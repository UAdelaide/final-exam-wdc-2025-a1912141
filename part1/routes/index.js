var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/dogs', async function(req, res, next) {
    try {
        const [rows] = await db.query(
            'SELECT d.name AS dog_name, d.size, u.username AS owner_username FROM Dogs d JOIN Users u ON d.owner_id = u.user_id'
        );

        res.send(rows);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.get('/api/walkrequests/open', async function(req, res, next) {
  try {
        const [rows] = await db.query(
            `SELECT wr.request_id, d.name AS dog_name, wr.requested_time, wr.duration_minutes, wr.location, u.username AS owner_username FROM WalkRequests wr JOIN Dogs d ON wr.dog_id = d.dog_id JOIN  Users u ON d.owner_id = u.user_id WHERE wr.status = "open"`
        );

        res.send(rows);
    } catch (err) {
        res.sendStatus(500);
    }
});

// router.get('/api/walkers/summary', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
