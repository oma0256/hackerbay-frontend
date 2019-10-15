import React, { Component } from 'react';
import Mushroom from '../../images/mushroom.png';
import './Board.css';

class Board extends Component {
  state = {
    row: null,
    column: null,
    isRowLessOrEqual: false,
    board: [],
  };

  generateBoardPositions = () => {
    const { row, column, isRowLessOrEqual } = this.state;
    const rowOrColumn = isRowLessOrEqual ? row : column;
    const spritePositions = Array(rowOrColumn).fill(1);
    const emptyPositions = Array(row * column - rowOrColumn);
    const boardPositions = spritePositions.concat(emptyPositions);
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
          <td className='cell' key={index}>
            {board[row][cell] === 1 ? (
              <img src={Mushroom} alt='sprite' />
            ) : null}
          </td>
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
