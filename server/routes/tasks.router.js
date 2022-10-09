const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//  let tasks = [
//     {
//         task: "Clean Room",
//         completed: false, //Every new task starts as false
//         notes: "Start with dusting"
//     },
//     {
//         task: "Karate Lesson",
//         completed: false,
//         notes: "Work on round kick"
//     },
//     {
//         task: "Groceries",
//         completed: false,
//         notes: "Do not forget orange juice"
//     },
//     {
//         task: "Invest in dogecoin",
//         completed: false,
//         notes: "INVEST INVEST INVEST"
//     },
//     {
//         task: "Weekend Project",
//         completed: false,
//         notes: "Remember to drink water"
//     },
//     {
//         task: "Water plants",
//         completed: false,
//         notes: "Plants need water too"
//     }
// ];
router.get('/', (req, res) => {
    pool.query(`
        SELECT * FROM "tasks" ORDER BY "id" LIMIT 15;
    `).then((dbRes) => { //Line 39, I limit the visible data by 15
    // this way it won't run off the page and just looks nicer.
    //Order by ID so the rows don't rearrange themselves
    res.send(dbRes.rows);
    })
    .catch((err) => {
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
            ($1,$2,$3)
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

 router.put('/:id', (req,res) => {
    const taskId = req.params.id;
     console.log("In PUT with id:",taskId);
  
    sqlText = `UPDATE "tasks"
                SET "completed" = NOT "completed"
                WHERE "id" = $1
                `;
    const sqlParams = [taskId];

    pool.query(sqlText, sqlParams)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log("Update failed",err);
            res.sendStatus(500);
        });
         
});

module.exports = router;

//THE COMMENTED OUT CODE BELOW IS MY ATTEMPT TO GET THE INPUT NOTES BOX VALUE
//WHENEVER I MOVE MY MOUSE OUT, AND THEN UPDATE THE DATABASE AND APPEND
//THAT NEW VALUE TO THE DOM. HOWEVER, IT SEEMED THAT IT JUST KEPT
//LINKING TO THE FIRST PUT REQUEST IN THE ROUTES SERVER AND I COULDN'T FIGURE
//OUT HOW TO FIX THAT. LEAVING THIS HERE JUST IN CASE I WANT TO GO BACK AND TRY AGAIN.

// router.put('/:note', (req,res) => {
//     const noteId = req.params.id;
//      console.log("In NOTE PUT with id:",noteId);
  
//     sqlText = `UPDATE "tasks"
//                 SET "notes" = ${$('.noteBox').val()}
//                 WHERE "id" = $1`;
//     const sqlParams = [noteId];

//     pool.query(sqlText, sqlParams)
//         .then((dbRes) => {
//             res.sendStatus(201);
//         })
//         .catch((err) => {
//             console.log("Update failed",err);
//             res.sendStatus(500);
//         });
// });

