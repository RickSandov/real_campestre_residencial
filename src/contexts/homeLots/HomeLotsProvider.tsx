import { ILot } from 'interfaces';
import { FC, PropsWithChildren, useCallback, useReducer } from 'react';
import { HomeLotsContext, homeLotsReducer } from './';

export interface HomeLotsState {
    selectedLot: ILot | null;
    lastValidSelectedLot: ILot | null;
}

const HomeLots_INITIAL_STATE: HomeLotsState = {
    selectedLot: null,
    lastValidSelectedLot: null
};

export const HomeLotsProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(homeLotsReducer,
        HomeLots_INITIAL_STATE);

    const setSelectedLot = useCallback(
        (lot: ILot) => dispatch({
            type: '[HomeLots] - set selected lot',
            payload: lot
        }),
        [],
    )

    return (
        <HomeLotsContext.Provider value={{
            ...state,

            // Methods
            setSelectedLot
        }} >
            {children}
        </HomeLotsContext.Provider>
    );
};