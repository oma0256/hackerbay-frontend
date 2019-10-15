import React, { Component } from 'react';
import './Board.css';

class Board extends Component {
  state = {
    row: null,
    column: null,
  };

  componentDidMount() {
    const row = prompt('Please enter the board height: ');
    const column = prompt('Please enter the board width: ');
    this.setState({ row: +row, column: +column });
  }

  render() {
    const { row, column } = this.state;
    const board = [];
    for (let i = 0; i < row; i++) {
      const rowCells = [];
      for (let j = 0; j < column; j++) {
        rowCells.push(<td key={j} className='cell'></td>);
      }
      board.push(<tr key={i}>{rowCells}</tr>);
    }
    return (
      <table className='table'>
        <tbody>{board}</tbody>
      </table>
    );
  }
}

export default Board;
