const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Get all Tasks
router.get('/', (req, res)=>{
    let queryText = 'SELECT * FROM "list" ORDER BY "status";';
    pool.query(queryText).then(result => {
        res.sendStatus(result.rows);
    }).catch(error => {
        console.log('error getting tasks', error);
        res.sendStatus(500);
      });
});

//POST
router.post('/', (req, res)=>{
    let newTask = req.body;
        console.log ('Adding new task', newTask);
    let queryText = `INSERT INTO "list"("task", "status", "location", "est_time") VALUES($1, $2, $3, $4);`
    pool.query(queryText, [newTask.task, newTask.status, newTask.location, newTask.est_time])
    .then(result =>{
        res.sendStatus(201);
    }).catch(error => {
        console.log(`Error adding new task`, error);
        res.sendStatus(500);
      });
});

//PUT
router.put('/:id', (req, res) =>{
    let id = [req.params.id];
    let queryText = `UPDATE "list" SET "status" = 'completed' WHERE "id"= $1`; // correct? no ID's in DB...
    pool.query( queryText, id).then( result => {
        res.sendStatus(201);
    }).catch( error => {
        console.log(`Updating list status ${id} with `, id);
        res.sendStatus(500);
    });
});

// Delete
router.delete('/:id', (req, res) =>{
    let id = req.params.id;
    console.log('Delete route called with id of', id);
    res.sendStatus(500);
});

module.exports = router;