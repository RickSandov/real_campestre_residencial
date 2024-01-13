import { IClient, IDisplayClient, ILot } from 'interfaces';
import { createContext } from 'react';

export interface ContextProps {
    lots: ILot[];
    selectedLot: ILot | null;

    clients: IDisplayClient[];
    routes: {
        clients: string
    }

    editClient: {
        client: IClient | null;
    }

    isLoading: boolean;

    // Methods
    getLots: () => void;
    setSelectedLot: (lot: ILot | null) => void;
    updateLotInfo: (lot: ILot) => Promise<void>
    setClientsRoute: (newRoute: string) => void;
    getClients: () => void;
    createClient: (data: { phoneNumber: string, name: string }, close: () => void) => void;

    setEditClient: (client: IClient) => void;
    postClientUpdate: ({ phoneNumber, name, _id }: { phoneNumber: string, name: string, _id: string }, close: () => void) => void;
    clearEditClient: () => void;
}

export const AdminContext = createContext({} as ContextProps);