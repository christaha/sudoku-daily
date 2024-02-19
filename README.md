# Sudoku Game #

This repo contains code for a minimal JavaScript Sudoku App!

## Features
1. Generating Sudoku Puzzles with a unique solutions
2. Players can Sudoku Puzzles with a NYT-like interface 
3. Daily Puzzle that keeps track of a users streak

## Setup
To run the Repo Locally:
1. Install and start Mongo DB or run the official [docker image](https://hub.docker.com/_/mongo). Or, you can use (docker-compose.yaml)[docker-compose.yaml] and simply run
```bash
cd docker
docker compose up
```
2. Start the API 
```bash
npm run start
```
3. Visit [http://locahost:3000](http://locahost:3000)

## Components:
**1. MongoDB:**
- Document Store puzzle and user data
- Needed for the API to Run

**2. Express App**
- REST endpoints for saving and fetching new puzzles
- Host static UI files
- Generates new puzzles and saves to the Mongo DB