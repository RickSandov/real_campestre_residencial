import { ILot } from 'interfaces';
import { createContext } from 'react';

export interface HomeLotsContextProps {
    selectedLot: ILot | null;
    lastValidSelectedLot: ILot | null;

    //Methods
    setSelectedLot: (lot: ILot) => void
}

export const HomeLotsContext = createContext({} as HomeLotsContextProps);