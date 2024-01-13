import { ILot, IDisplayClient, IClient } from "interfaces";
import { AdminState } from "./";

type AdminActionType =
  | { type: "[Admin] - set lots"; payload: ILot[] }
  | { type: "[Admin] - set selected lot"; payload: ILot | null }
  | { type: "[Admin] - set clients route"; payload: string }
  | { type: "[Admin] - set is loading"; payload: boolean }
  | {
      type: "[Admin] - set clients";
      payload: IDisplayClient[];
    }
  | {
      type: "[Admin] - set client to edit";
      payload: IClient;
    }
  | {
      type: "[Admin] - set updated client";
      payload: IClient;
    }
  | {
      type: "[Admin] - clear client to edit";
    };

export const adminReducer = (
  state: AdminState,
  action: AdminActionType
): AdminState => {
  switch (action.type) {
    case "[Admin] - set lots":
      return {
        ...state,
        lots: action.payload,
      };

    case "[Admin] - set selected lot":
      return {
        ...state,
        selectedLot: action.payload,
      };

    case "[Admin] - set is loading":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "[Admin] - set clients route":
      return {
        ...state,
        routes: {
          ...state.routes,
          clients: action.payload,
        },
      };

    case "[Admin] - set clients":
      return {
        ...state,
        clients: action.payload,
      };

    case "[Admin] - set client to edit": {
      const client = action.payload;
      return {
        ...state,
        editClient: {
          client,
        },
      };
    }

    case "[Admin] - set updated client": {
      const updatedClient = action.payload;
      return {
        ...state,
        editClient: {
          ...state.editClient,
          client: updatedClient,
        },
      };
    }

    case "[Admin] - clear client to edit": {
      return {
        ...state,
        editClient: {
          client: null,
        },
      };
    }

    default:
      return state;
  }
};
