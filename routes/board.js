const express = require('express');
const { ObjectId } = require('mongodb');
const { connect } = require('../db/client');
const { generateOne } = require('../generator/generator');

const boardRouter = express.Router();

boardRouter.get('/', async (req, res) => {
  const db = await connect();
  const collection = await db.collection('puzzles');
  const results = await collection.find({}).toArray();
  return res.send(results).status(200);
});

boardRouter.post('/', async (req, res) => {
  const db = await connect();
  const collection = db.collection('puzzles');
  const { board, level } = req.body;
  const newBoard = { board, level };
  const result = await collection.insertOne(newBoard);
  return res.send(result).status(204);
});

boardRouter.post('/generate', async (req, res) => {
  const db = await connect();
  const collection = db.collection('puzzles');

  const { numPuzzles } = req.body;

  const promises = [];

  for (let i = 0; i < Number(numPuzzles); i += 1) {
    const board = generateOne();
    const newBoard = { board, level: 'easy' };
    promises.push(collection.insertOne(newBoard));
  }

  Promise.all(promises);

  return res.send().status(204);
});

boardRouter.delete('/clear', async (req, res) => {
  const db = await connect();
  const collection = db.collection('puzzles');

  await collection.deleteMany({});
  return res.send().status(204);
});

boardRouter.delete('/:id', async (req, res) => {
  const db = await connect();
  const collection = db.collection('puzzles');

  const { id } = req.params;

  const query = { _id: new ObjectId(id) };

  await collection.deleteOne(query);
  return res.send().status(204);
});

module.exports = boardRouter;
