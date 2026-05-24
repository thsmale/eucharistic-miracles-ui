import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PositionState {
  coordinates: [number, number],
  zoom: number,
}

interface MapState extends PositionState {
  circleRadius: number,
}

const initialState: MapState = {
  coordinates: [0, 0],
  zoom: 1,
  circleRadius: 3,
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    resetPosition: (state) => {
      const { coordinates, zoom } = initialState;
      state.coordinates = coordinates;
      state.zoom = zoom;
    },
    setCircleRadius: (state, action: PayloadAction<number>) => {
      state.circleRadius = action.payload;
    },
    setPosition: (state, action: PayloadAction<PositionState>) => {
      const { coordinates, zoom } = action.payload;
      state.coordinates = coordinates;
      state.zoom = zoom;
    }
  }
})

export const { resetPosition , setCircleRadius, setPosition } = mapSlice.actions;

export default mapSlice.reducer;