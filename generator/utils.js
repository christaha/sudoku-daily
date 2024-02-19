function createEmptyBoard() {
    row = Array(9).fill(".")
    return Array(9).fill(row)
}

function createShuffledArray(start, end) {
    const unshuffled = []
    for (let i = start; i < end; i++) {
        unshuffled.push(i)
    }

    // let shuffled = unshuffled.map(value => ({ value, sort: Math.random() }))
    // .sort((a, b) => a.sort - b.sort)
    // .map(({ value }) => value)

    let shuffled = unshuffled
        .sort((a, b) => Math.random())
    
    return shuffled
}

module.exports = { createShuffledArray, createEmptyBoard }