import React, { useState, useEffect } from 'react';
import Split from 'react-split';
import './Row.scss';
import { splitActions } from '../redux/slices/splitSlices';
import { useDispatch, useSelector } from 'react-redux';

import BottomLeft from './BottomLeft';
import BottomRight from './BottomRight';
import TopLeft from './TopLeft';
import TopRight from './TopRight';

const Row = (props) => {
  const [row, setRow] = useState('');
  const selectorSize = useSelector(
    (state) => state.split['hor' + props.rowLine + 'Current']
  );
  const [current, setCurrent] = useState(selectorSize);
  const [sizes, setSizes] = useState([selectorSize]);
  const dispatch = useDispatch();

  const onDrag = (coords) => {
    // console.log({ start: coords[0], end: coords[1] });
    setSizes((sizes) => [...sizes, { start: coords[0], end: coords[1] }]);
  };

  const onDragEnd = (coords) => {
    setCurrent({ start: coords[0], end: coords[1] });
  };

  useEffect(() => {
    setRow('horizontal' + props.rowLine);
  }, []);

  useEffect(() => {
    dispatch(
      splitActions.updateCoords({
        position: 'horizontal' + props.rowLine,
        history: sizes,
        current,
      })
    );
  }, [current]);

  return (
    <>
      <Split
        className="splitHorizontal"
        minSize={200}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        sizes={[current.start, current.end]}
      >
        <div>
          {props.rowLine == 1 && <TopLeft />}
          {props.rowLine == 2 && <BottomLeft />}
        </div>
        <div>
          {props.rowLine == 1 && <TopRight />}
          {props.rowLine == 2 && <BottomRight />}
        </div>
      </Split>
    </>
  );
};

export default Row;
