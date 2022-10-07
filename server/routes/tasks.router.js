const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

let tasks = [
    {
        task: "Clean Room",
        completed: false,
        notes: "Start with dusting"
    },
    {
        task: "Karate Lesson",
        completed: false,
        notes: "Work on round kick"
    },
    {
        task: "Groceries",
        completed: false,
        notes: "Do not forget orange juice"
    },
    {
        task: "Invest in dogecoin",
        completed: false,
        notes: "INVEST INVEST INVEST"
    },
    {
        task: "Weekend Project",
        completed: false,
        notes: "Remember to drink water"
    },
    {
        task: "Water plants",
        completed: false,
        notes: "Plants need water too"
    }
];

router.get('/', (req, res) => {
    pool.query(`
        SELECT * FROM "tasks";
    `).then((dbRes) => {
    res.send(dbRes.rows);
}).catch((err) => {
    console.log('GET /tasks failed', err);
    res.sendStatus(500);
});
});

module.exports = router;