const express = require('express')
const { connect } = require('../db/client');
const { generateOne } = require('../generator/generator');
var { ObjectId } = require('mongodb');

var boardRouter = express.Router();

boardRouter.get('/', async (req, res) => {
    let db = await connect()
    let collection = await db.collection("puzzles");
    let results = await collection.find({}).toArray();
    return res.send(results).status(200);  
  })

  boardRouter.post('/', async (req, res) => {
    let db = await connect()
    let collection = db.collection('puzzles')
    const { board, level } = req.body;
    const newBoard = { board, level };
    let result = await collection.insertOne(newBoard);
    return res.send(result).status(204);
  })

  boardRouter.post('/generate', async (req, res) => {
    let db = await connect()
    let collection = db.collection('puzzles')

    const { numPuzzles } = req.body;

    for (let i = 0; i < Number(numPuzzles); i++) {
        let board = generateOne();
        let newBoard = { board, level: 'easy'}
        await collection.insertOne(newBoard);
    }

    return res.send().status(204);
  })

  boardRouter.delete('/:id', async (req, res) => {
    let db = await connect()
    let collection = db.collection('puzzles')

    const { id } = req.params

    const query = { _id: new ObjectId(id) };

    await collection.deleteOne(query)
    return res.send().status(204);
  })

module.exports = boardRouter;