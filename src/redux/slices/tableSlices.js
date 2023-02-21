import { createSlice } from '@reduxjs/toolkit';
// import namor from 'namor';

const tableSlice = createSlice({
  name: 'table',
  initialState: {
    tableData: [],
  },
  reducers: {
    fetchData(state, action) {
      const arrLength = action.payload.arrLength;
      state.tableData = makeData(arrLength);
    },
  },
});

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const chance = Math.random();
  return {
    contract: Math.floor(Math.random() * 3) + 2018,
    offer: Math.floor(Math.random() * 10000) + 200,
    data: chance > 0.5 ? 'Alış' : 'Veriş',
  };
};

const makeData = (...lens) => {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      depth++;
      return {
        id: depth,
        ...newPerson(),
      };
    });
  };

  return makeDataLevel();
};

export const tableActions = tableSlice.actions;

export default tableSlice;
