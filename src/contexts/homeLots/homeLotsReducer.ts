import { HomeLotsState } from "./";
import { ILot } from "../../interfaces/Lot";

type HomeLotsActionType = {
  type: "[HomeLots] - set selected lot";
  payload: ILot;
};

export const homeLotsReducer = (
  state: HomeLotsState,
  action: HomeLotsActionType
): HomeLotsState => {
  switch (action.type) {
    case "[HomeLots] - set selected lot": {
      const lot = action.payload;
      if (lot._id === state.selectedLot?._id) {
        return {
          ...state,
          selectedLot: null,
        };
      }
      return {
        ...state,
        selectedLot: lot,
      };
    }

    default:
      return state;
  }
};
