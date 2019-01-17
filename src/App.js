import React, { Component } from 'react';
import './App.css';

function chooseBomb() {
  if (Math.floor(Math.random()*10) < 8) {
    return 0
  } else {
    return 'B'
  }
}


function createMineSweeperGame(rows) {
  return [...Array(rows)].map((_, i) => [...Array(rows)].map((_, i) => chooseBomb()))
}
function createSurfaceLevel(rows) {
  return [...Array(rows)].map((_, i) => [...Array(rows)].map((_, i) => <div style={{color: 'rgba(0,0,0,0)'}}>i</div>))
}
function flipTiles(rows) {
  return [...Array(rows)].map((_, i) => [...Array(rows)].map((_, i) => false))
}
function unflipTiles(rows) {
  return [...Array(rows)].map((_, i) => [...Array(rows)].map((_, i) => true))
}

let minesweeper = createMineSweeperGame(9)
let surfacelevel = createSurfaceLevel(9)
let flipped = flipTiles(9)
let unflipped = unflipTiles(9)
// Helper functions
function checkUpperLeft(i, j, B) {
  minesweeper[i][j] =
  ((minesweeper[i+1][j] === B) ? 1 : 0) +
  ((minesweeper[i][j+1] === B) ? 1 : 0) +
  ((minesweeper[i+1][j+1] === B) ? 1 : 0)
  return minesweeper[i][j]
}

function checkUpperRight(i,j,B) {
  minesweeper[i][j] =
  ((minesweeper[i][j-1] === B) ? 1 : 0) +
  ((minesweeper[i+1][j] === B) ? 1 : 0) +
  ((minesweeper[i+1][j-1] === B) ? 1: 0)
  return minesweeper[i][j]
}

function checkLowerLeft(i,j,B) {
  minesweeper[i][j] =
  ((minesweeper[i-1][j] === B) ? 1 : 0) +
  ((minesweeper[i][j+1] === B) ? 1 : 0) +
  ((minesweeper[i-1][j+1] === B) ? 1 : 0)
  return minesweeper[i][j]
}

function checkLowerRight(i,j,B) {
  minesweeper[i][j] =
  ((minesweeper[i-1][j] === B) ? 1 : 0) +
  ((minesweeper[i][j-1] === B) ? 1 : 0) +
  ((minesweeper[i-1][j-1] === B) ? 1 : 0)
  return minesweeper[i][j]
}

function checkLeft(i,j,B) {
  minesweeper[i][j] =
  ((minesweeper[i-1][j] === B) ? 1 : 0) +
  ((minesweeper[i][j+1] === B) ? 1 : 0) +
  ((minesweeper[i+1][j] === B) ? 1 : 0) +
  ((minesweeper[i-1][j+1] === B) ? 1 : 0) +
  ((minesweeper[i+1][j+1] === B) ? 1 : 0)
  return minesweeper[i][j]
}

function checkRight(i,j,B) {
  minesweeper[i][j] =
  ((minesweeper[i-1][j] === B) ? 1 : 0) +
  ((minesweeper[i][j-1] === B) ? 1 : 0) +
  ((minesweeper[i+1][j] === B) ? 1 : 0) +
  ((minesweeper[i-1][j-1] === B) ? 1 : 0) +
  ((minesweeper[i+1][j-1] === B) ? 1 : 0)
}

function checkTop(i,j,B) {
  minesweeper[i][j] =
  ((minesweeper[i][j-1] === B) ? 1 : 0) +
  ((minesweeper[i][j+1] === B) ? 1 : 0) +
  ((minesweeper[i+1][j] === B) ? 1 : 0) +
  ((minesweeper[i+1][j-1] === B) ? 1 : 0) +
  ((minesweeper[i+1][j+1] === B) ? 1 : 0)
}

function checkBottom(i,j,B) {
  minesweeper[i][j] =
  ((minesweeper[i][j-1] === B) ? 1 : 0) +
  ((minesweeper[i][j+1] === B) ? 1 : 0) +
  ((minesweeper[i-1][j] === B) ? 1 : 0) +
  ((minesweeper[i-1][j-1] === B) ? 1 : 0) +
  ((minesweeper[i-1][j+1] === B) ? 1 : 0)
}

function checkInterior(i,j,B) {
  minesweeper[i][j] =
  ((minesweeper[i-1][j] === B) ? 1 : 0) +
  ((minesweeper[i][j-1] === B) ? 1 : 0) +
  ((minesweeper[i+1][j] === B) ? 1 : 0) +
  ((minesweeper[i][j+1] === B) ? 1 : 0) +
  ((minesweeper[i-1][j-1] === B) ? 1 : 0) +
  ((minesweeper[i-1][j+1] === B) ? 1 : 0) +
  ((minesweeper[i+1][j-1] === B) ? 1 : 0) +
  ((minesweeper[i+1][j+1] === B) ? 1 : 0)
}

function newGame() {
  minesweeper = createMineSweeperGame(9)
  surfacelevel = createSurfaceLevel(9)
  flipped = flipTiles(9)
  for (let i = 0; i < minesweeper.length; i++) {
    for (let j = 0; j < minesweeper[i].length; j++) {
      if (minesweeper[i][j] !== 'B') {
        if (i === 0 && j === 0) {
          checkUpperLeft(i,j, 'B')
        }
        if (i === 0 && j === minesweeper.length-1) {
          checkUpperRight(i,j, 'B')
        }
        if (i === minesweeper.length-1 && j === 0) {
          checkLowerLeft(i,j, 'B')
        }
        if (i === minesweeper.length-1 && j === minesweeper.length-1) {
          checkLowerRight(i,j, 'B')
        }
        if (i !== 0 && i !== minesweeper.length-1 & j === 0) {
          checkLeft(i,j, 'B')
        }
        if (i !== 0 && i !== minesweeper.length-1 & j === minesweeper.length-1) {
          checkRight(i,j, 'B')
        }
        if (i === 0 && j !== 0 && j !== minesweeper.length-1) {
          checkTop(i,j, 'B')
        }
        if (i === minesweeper.length-1 && j !== 0 && j !== minesweeper.length-1) {
          checkBottom(i,j, 'B')
        }
        if (i !== 0 && i !== minesweeper.length-1 && j !== 0 && j !== minesweeper.length-1) {
          checkInterior(i,j, 'B')
        }
      }
    }
  }
}

newGame()

class App extends Component {
  state = {
    surfacelevel: surfacelevel,
    minesweeper: minesweeper,
    flipped: flipped,
    unflipped: unflipped
  }
  handleClick = (x,y) => {
    let newSurfaceLevel = this.state.surfacelevel.slice()
    let newFlipped = this.state.flipped.slice()

    if (this.state.minesweeper[x][y] === "B") {
      newSurfaceLevel = this.state.minesweeper
      newFlipped = this.state.unflipped
    } else {
      newSurfaceLevel[x][y] = this.state.minesweeper[x][y]
      newFlipped[x][y] = !this.state.flipped[x][y]
    }

    this.setState({
      surfacelevel: newSurfaceLevel,
      flipped: newFlipped
    })
  }
  handleRestart = () => {
    newGame()
    this.setState({
      surfacelevel: surfacelevel,
      minesweeper: minesweeper,
      flipped: flipped,
      unflipped: unflipped
    })
  }
  render() {
    console.log(minesweeper)
    console.log(flipped)
    return (
      <React.Fragment>
      <h1 style={{display: 'block', fontFamily: 'monospace', margin: 'auto', textAlign: 'center'}}>Minesweeper</h1>

      <div className="container">


        {this.state.surfacelevel.map((x,idx) =>
          <div key={Math.random()}>{x.map((x, jdx) =>
            <div key={Math.random()}>
              {
                <button style={{backgroundColor: (flipped[idx][jdx] === true) ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}} onClick={e => this.handleClick(idx, jdx)}>
                  {(x === "B") ? <i className="fas fa-bomb"></i> : (x === 0) ? <div style={{color: 'rgba(0,0,0,0)'}}>0</div> : (x === 1) ?
                  <div style={{color: 'blue'}}>1</div> : (x === 2) ?
                  <div style={{color: 'green'}}>2</div> : (x === 3) ?
                  <div style={{color: 'red'}}>3</div> : (x === 4) ?
                  <div style={{color: '#4B0082'}}>4</div> : (x === 5) ?
                  <div style={{color: 'brown'}}>5</div> : x }
                </button>
              }
            </div>)}
          </div>)}

      </div>
      <button style={{display: 'block', fontFamily: 'monospace', margin: 'auto', textAlign: 'center', marginTop: '2rem', fontSize: '1.5rem', borderRadius: '10px'}} onClick={this.handleRestart}>Restart</button>

      </React.Fragment>
    )
  }
}

export default App;
