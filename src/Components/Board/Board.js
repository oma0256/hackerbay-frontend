import React, { Component } from 'react';
import './Board.css';

class Board extends Component {
  render() {
    return (
      <table className='table'>
        <tbody>
          <tr>
            <td className='cell'></td>
            <td className='cell'></td>
            <td className='cell'></td>
          </tr>
          <tr>
            <td className='cell'></td>
            <td className='cell'></td>
            <td className='cell'></td>
          </tr>
          <tr>
            <td className='cell'></td>
            <td className='cell'></td>
            <td className='cell'></td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Board;
