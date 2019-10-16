import React from 'react';
import Mushroom from '../../images/mushroom.png';
import Mario from '../../images/mario.png';
import './Cell.css';

const Cell = props => {
  const { isSpriteOrMario } = props;

  return (
    <td className='cell'>
      {isSpriteOrMario === 1 ? <img src={Mushroom} alt='sprite' /> : null}
      {isSpriteOrMario === 2 ? <img src={Mario} alt='mario' /> : null}
    </td>
  );
};

export default Cell;
