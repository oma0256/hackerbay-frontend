import React, { Component } from 'react';
import ArrowKeysReact from 'arrow-keys-react';
import './Board.css';
import Cell from '../../Components/Cell/Cell';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: null,
      column: null,
      isRowLessOrEqual: null,
      board: [],
      totalMoves: 0,
    };
    this.boardRef = React.createRef();
    ArrowKeysReact.config({
      left: () => this.horizontalMarioMove(true),
      right: () => this.horizontalMarioMove(false),
      up: () => this.verticalMarioMove(true),
      down: () => this.verticalMarioMove(false),
    });
  }

  isGameOver = () => {
    const { board, totalMoves } = this.state;
    let gameOver = true;
    for (let row = 0; row < board.length; row++) {
      if (board[row].includes(1)) {
        gameOver = false;
        break;
      }
    }
    if (gameOver) {
      alert(`Game over. Total moves to save princess: ${totalMoves}`);
    }
  };

  horizontalMarioMove = isLeftMove => {
    let totalMoves = this.state.totalMoves;
    const newBoard = this.state.board.map(row => {
      const newRow = [...row];
      const marioIndex = newRow.findIndex(element => element === 2);
      const possibleMarioPosition = isLeftMove ? 0 : this.state.column - 1;
      if (marioIndex !== -1 && marioIndex !== possibleMarioPosition) {
        newRow[marioIndex] = 0;
        const newMarioIndex = isLeftMove ? marioIndex - 1 : marioIndex + 1;
        newRow[newMarioIndex] = 2;
        totalMoves += 1;
      }
      return newRow;
    });
    this.setState({ board: newBoard, totalMoves }, () => this.isGameOver());
  };

  verticalMarioMove = isUpMove => {
    let marioRow;
    let marioColumn;
    let totalMoves = this.state.totalMoves;
    const newBoard = this.state.board.map((row, index) => {
      const newRow = [...row];
      const marionIndex = newRow.findIndex(element => element === 2);
      const possibleMarioPosition = isUpMove ? 0 : this.state.row - 1;
      if (marionIndex !== -1 && index !== possibleMarioPosition) {
        marioRow = isUpMove ? index : index + 1;
        marioColumn = marionIndex;
        newRow[marionIndex] = 0;
        totalMoves += 1;
      }
      return newRow;
    });
    if (marioRow !== undefined && marioColumn !== undefined) {
      const newMarioRow = isUpMove ? marioRow - 1 : marioRow;
      newBoard[newMarioRow][marioColumn] = 2;
    }
    this.setState({ board: newBoard, totalMoves }, () => this.isGameOver());
  };

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const newPosition = Math.floor(Math.random() * (i + 1));
      if (array[i] !== 2 && array[newPosition] !== 2) {
        const temp = array[i];
        array[i] = array[newPosition];
        array[newPosition] = temp;
      }
    }
    return array;
  };

  createBoard = boardPositions => {
    const board = [];
    while (boardPositions.length) {
      const boardRows = boardPositions.splice(0, this.state.column);
      board.push(boardRows);
    }
    return board;
  };

  generateBoardPositions = () => {
    const { row, column, isRowLessOrEqual } = this.state;
    const rowOrColumn = isRowLessOrEqual ? row : column;
    const spritePositions = Array(rowOrColumn).fill(1);
    const emptyPositions = Array(row * column - rowOrColumn);
    let boardPositions = spritePositions.concat(emptyPositions);
    let board = this.createBoard(boardPositions);
    board[Math.floor(row / 2)][Math.floor(column / 2)] = 2;
    boardPositions = [];
    for (let row = 0; row < board.length; row++) {
      boardPositions = boardPositions.concat(board[row]);
    }
    boardPositions = this.shuffleArray(boardPositions);
    board = this.createBoard(boardPositions);
    this.setState({ board }, () => this.boardRef.current.focus());
  };

  getRowOrColumn = input => {
    if (Math.round(+input) <= 0 || Math.round(+input) > 10 || isNaN(+input)) {
      return 10;
    }
    return +input;
  };

  componentDidMount() {
    let row = prompt('Please enter the board height: ');
    let column = prompt('Please enter the board width: ');
    row = this.getRowOrColumn(row);
    column = this.getRowOrColumn(column);
    this.setState({ row, column, isRowLessOrEqual: row <= column }, () =>
      this.generateBoardPositions()
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
          <Cell key={index} isSpriteOrMario={board[row][cell]} />
        );
        index = index + 1;
      }
      boardRows.push(<tr key={row}>{boardCells}</tr>);
    }
    boardRows = boardRows.map(boardRow => boardRow);

    return (
      <div>
        <table
          className='table'
          {...ArrowKeysReact.events}
          tabIndex='1'
          ref={this.boardRef}
        >
          <tbody>{boardRows}</tbody>
        </table>
        <div className='footer'>
          <p>If Mario is not moving please click anywhere on the board.</p>
          <p>Use the arrow keys on the keyboard to move Mario.</p>
        </div>
      </div>
    );
  }
}

export default Board;
