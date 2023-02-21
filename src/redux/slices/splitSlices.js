import { createSlice } from '@reduxjs/toolkit';

const splitSlice = createSlice({
  name: 'split',
  initialState: {
    verCoords: [],
    verCurrent: JSON.parse(localStorage.getItem('vertical')) || {
      start: 60,
      end: 40,
    },
    hor1Coords: [],
    hor1Current: JSON.parse(localStorage.getItem('horizontal1')) || {
      start: 70,
      end: 30,
    },
    hor2Coords: [],
    hor2Current: JSON.parse(localStorage.getItem('horizontal2')) || {
      start: 50,
      end: 50,
    },
    changed: false,
  },
  reducers: {
    updateCoords(state, action) {
      const position = action.payload.position;
      const current = {
        start: action.payload.current.start,
        end: action.payload.current.end,
      };
      const history = action.payload.history;

      //   console.log(position, current, history);

      if (position == 'vertical') {
        // console.log(state.verCurrent.length);
        state.changed = true;
        // console.log(state.verCurrent);
        state.verCoords = history;
        state.verCurrent = current;
      } else if (position == 'horizontal1') {
        state.hor1Coords = history;
        state.hor1Current = current;
      } else if (position == 'horizontal2') {
        state.hor2Coords = history;
        state.hor2Current = current;
      }

      localStorage.setItem(position, JSON.stringify(current));
    },
  },
});

export const splitActions = splitSlice.actions;

export default splitSlice;
