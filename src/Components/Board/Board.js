import React, { Component } from 'react';
import './Board.css';
import Cell from '../Cell/Cell';

class Board extends Component {
  state = {
    row: null,
    column: null,
    isRowLessOrEqual: false,
    board: [],
  };

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const newPosition = Math.floor(Math.random() * (i + 1));
      if (array[i] === 2 || array[newPosition] === 2) {
        continue;
      }
      const temp = array[i];
      array[i] = array[newPosition];
      array[newPosition] = temp;
    }
    return array;
  };

  generateBoardPositions = () => {
    const { row, column, isRowLessOrEqual } = this.state;
    const rowOrColumn = isRowLessOrEqual ? row : column;
    const spritePositions = Array(rowOrColumn).fill(1);
    const emptyPositions = Array(row * column - rowOrColumn);
    let boardPositions = spritePositions.concat(emptyPositions);
    const marioPositon = Math.ceil(boardPositions.length / 2) - 1;
    boardPositions[marioPositon] = 2;
    boardPositions = this.shuffleArray(boardPositions);
    const board = [];
    while (boardPositions.length) {
      const boardRows = boardPositions.splice(0, column);
      board.push(boardRows);
    }
    this.setState({ board });
  };

  componentDidMount() {
    const row = prompt('Please enter the board height: ');
    const column = prompt('Please enter the board width: ');
    this.setState(
      { row: +row, column: +column, isRowLessOrEqual: +row <= +column },
      () => this.generateBoardPositions()
    );
  }

  render() {
    const { board } = this.state;
    let boardCells = [];
    let boardRows = [];
    let index = 0;
    for (let row = 0; row < board.length; row++) {
      boardCells = [];
      for (let cell = 0; cell < board[row].length; cell++) {
        boardCells.push(
          <Cell index={index} isSpriteOrMario={board[row][cell]} />
        );
        index = index + 1;
      }
      boardRows.push(<tr key={row}>{boardCells}</tr>);
    }
    boardRows = boardRows.map(boardRow => boardRow);

    return (
      <table className='table'>
        <tbody>{boardRows}</tbody>
      </table>
    );
  }
}

export default Board;
