import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.scss';
import Split from 'react-split';
import Row from './components/Row';
import { splitActions } from './redux/slices/splitSlices';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  // const [current, setCurrent] = useState({ start: 50, end: 50 });
  const selectorSize = useSelector((state) => state.split.verCurrent);
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
    dispatch(
      splitActions.updateCoords({
        position: 'vertical',
        history: sizes,
        current,
      })
    );
  }, [current]);

  return (
    <div className="App">
      <Split
        className="splitVertical"
        direction="vertical"
        minSize={200}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        sizes={[current.start, current.end]}
      >
        <div>
          <Row rowLine={1} />
        </div>
        <div>
          <Row rowLine={2} />
        </div>
      </Split>
    </div>
  );
}

export default App;
