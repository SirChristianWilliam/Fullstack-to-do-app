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

router.post('/', (req,res) => {
    console.log('req.body in POST',req.body);
    const sqlText = `
        INSERT INTO "tasks"
            ("task", "completed", "notes")
        VALUES
            ($1,$2,$3);
        `;
    const sqlParams = [
        req.body.task,
        req.body.completed,
        req.body.notes,
    ];
    console.log("sqlText", sqlText);

    pool.query(sqlText, sqlParams)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('POST failed',err);
            res.sendStatus(500);
        });
 });

 router.delete('/:id', (req,res) => {
    console.log('In delete with ID: ', req.params.id);
    const taskId = req.params.id;
    
    const sqlText = `DELETE FROM "tasks" WHERE "id" = $1;`;
    const sqlParams = [taskId];
    
    pool.query(sqlText, sqlParams)
    .then((dbRes) => {
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log("DELETE FAILED,", err);
        res.sendStatus(500);
    });
 });

module.exports = router;