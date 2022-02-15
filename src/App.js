import { useState, useEffect } from 'react'
import possibleGames from './possible-games'
import { isEqual, cloneDeep } from 'lodash'
import Confetti from 'react-confetti'
import './App.css';

function App() {
  const [won, setWon] = useState(false)
  const [grid, setGrid] = useState([ [], [], [] ])
  const [startGame, setStartGame] = useState([ [], [], [] ])
  useEffect(() => {
    const game = possibleGames[Math.round(Math.random() * possibleGames.length)]
    const gameRows = [
      game[0].split(''),
      game[1].split(''),
      game[2].split(''),
    ]
    console.log(game)
    setStartGame(gameRows)
    setGrid(scramble(gameRows))
  }, [])

  const scramble = grid => {
    const scrambled = cloneDeep(grid)
    for (let i = 0; i < 100; ++i) {
      if (Math.random() > .5) {
        const col = Math.floor(Math.random() * 4)
        const tmp = scrambled[0][col]
        scrambled[0][col] = scrambled[1][col]
        scrambled[1][col] = scrambled[2][col]
        scrambled[2][col] = tmp
      } else {
        const row = Math.floor(Math.random() * 3)
        const tmp = scrambled[row][0]
        scrambled[row][0] = scrambled[row][1]
        scrambled[row][1] = scrambled[row][2]
        scrambled[row][2] = scrambled[row][3]
        scrambled[row][3] = tmp
      }
    }
    return scrambled
  }

  useEffect(() => {
    if (isEqual(grid, startGame)) {
      setWon(true)
    } else {
      setWon(false)
    }
  }, [ grid, startGame ])

  const up = col => {
    const newGrid = cloneDeep(grid)
    newGrid[0][col] = grid[1][col]
    newGrid[1][col] = grid[2][col]
    newGrid[2][col] = grid[0][col]
    setGrid(newGrid)
  }
  const down = col => {
    const newGrid = cloneDeep(grid)
    newGrid[0][col] = grid[2][col]
    newGrid[1][col] = grid[0][col]
    newGrid[2][col] = grid[1][col]
    setGrid(newGrid)
  }
  const left = row => {
    const newGrid = cloneDeep(grid)
    newGrid[row][0] = grid[row][1]
    newGrid[row][1] = grid[row][2]
    newGrid[row][2] = grid[row][3]
    newGrid[row][3] = grid[row][0]
    setGrid(newGrid)
  }
  const right = row => {
    const newGrid = cloneDeep(grid)
    newGrid[row][0] = grid[row][3]
    newGrid[row][1] = grid[row][0]
    newGrid[row][2] = grid[row][1]
    newGrid[row][3] = grid[row][2]
    setGrid(newGrid)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          CROSSWORDS
        </h1>
        {won && <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
        />}
        {won && <div className='won'>
          <div>
            You win!
          </div>
        </div>}
        <div>
          <div>
            <div className="tile"></div>
            <div className="tile" onClick={up.bind(this, 0)}>{'\u25B2'}</div>
            <div className="tile" onClick={up.bind(this, 1)}>{'\u25B2'}</div>
            <div className="tile" onClick={up.bind(this, 2)}>{'\u25B2'}</div>
            <div className="tile" onClick={up.bind(this, 3)}>{'\u25B2'}</div>
            <div className="tile"></div>
          </div>
          {grid.map((row, i) =>
            <div key={i}>
              <div className="tile left" onClick={left.bind(this, i)}>{'\u25B6'}</div>
              <div className={`tile ${row[0] === startGame[i][0] ? 'right' : ''}`}>{row && row[0] && row[0].toUpperCase()}</div>
              <div className={`tile ${row[1] === startGame[i][1] ? 'right' : ''}`}>{row && row[1] && row[1].toUpperCase()}</div>
              <div className={`tile ${row[2] === startGame[i][2] ? 'right' : ''}`}>{row && row[2] && row[2].toUpperCase()}</div>
              <div className={`tile ${row[3] === startGame[i][3] ? 'right' : ''}`}>{row && row[3] && row[3].toUpperCase()}</div>
              <div className="tile" onClick={right.bind(this, i)}>{'\u25B6'}</div>
            </div>
          )}
          <div>
            <div className="tile"></div>
            <div className="tile" onClick={down.bind(this, 0)}>{'\u25Bc'}</div>
            <div className="tile" onClick={down.bind(this, 1)}>{'\u25Bc'}</div>
            <div className="tile" onClick={down.bind(this, 2)}>{'\u25Bc'}</div>
            <div className="tile" onClick={down.bind(this, 3)}>{'\u25Bc'}</div>
            <div className="tile"></div>
          </div>
        </div>

      </header>
    </div>
  );
}

export default App;
