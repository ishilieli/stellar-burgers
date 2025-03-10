import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorIngredient',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    deleteItem: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearAll: (state) => (state = initialState),
    updateAll: (state, action: PayloadAction<TConstructorIngredient[]>) => {
      state.ingredients = action.payload;
    }
    // swapIngredient: (
    //   state,
    //   action: PayloadAction<{ index: number; direction: string }>
    // ) => {
    //   const { index, direction } = action.payload;
    //   if (direction === 'up') {
    //     state.ingredients.splice(
    //       index - 1,
    //       2,
    //       state.ingredients[index],
    //       state.ingredients[index - 1]
    //     );
    //   }
    //   if (direction === 'down') {
    //     state.ingredients.splice(
    //       index,
    //       2,
    //       state.ingredients[index + 1],
    //       state.ingredients[index]
    //     );
    //   }
    // }
  },
  selectors: {
    selectItems: (state: TConstructorState) => state
  }
});

export const { addItem, deleteItem, clearAll, updateAll } =
  constructorSlice.actions;
export const constructorSelector = constructorSlice.selectors;

export const constructorReducer = constructorSlice.reducer;
