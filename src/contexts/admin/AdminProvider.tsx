import { FC, PropsWithChildren, useReducer } from 'react';
import Router from 'next/router';
import { IClient, IDisplayClient, ILot } from 'interfaces';
import { api } from 'lib';
import { toast } from 'react-hot-toast';
import { AdminContext, adminReducer } from './';

export interface AdminState {
    lots: ILot[];
    selectedLot: ILot | null;
    clients: IDisplayClient[];
    client: IClient | null;
    editClient: {
        client: IClient | null;
    }
    routes: {
        clients: string
    };
    isLoading: boolean;
}

const Admin_INITIAL_STATE: AdminState = {
    lots: [],
    client: null,
    selectedLot: null,
    clients: [],
    editClient: {
        client: null,
    },
    routes: {
        clients: 'clientes'
    },

    isLoading: false
};

export const AdminProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(adminReducer,
        Admin_INITIAL_STATE);

    const setIsLoading = (isLoading: boolean) => (dispatch({
        type: '[Admin] - set is loading',
        payload: isLoading
    }))

    const setSelectedLot = (lot: ILot | null) => (dispatch({
        type: '[Admin] - set selected lot',
        payload: lot
    }))

    const updateLotInfo = async (lot: ILot) => {
        return;
    }

    const setClientsRoute = (newRoute: string) => dispatch({ type: '[Admin] - set clients route', payload: newRoute });

    const getClients = async () => {
        try {
            setIsLoading(true);
            const { data } = await api.get<{ clients: IDisplayClient[] }>('admin/clients');
            setIsLoading(false);
            dispatch({
                type: '[Admin] - set clients',
                payload: data.clients,
            })
        } catch (error) {
            setIsLoading(false);
            toast.error('Revisa tu conexión a internet. Si el problema persiste, comunícate con servicio técnico', {
                duration: 8000
            })
        }
    }

    const createClient = async (data: { phoneNumber: string, name: string }, close: () => void) => {
        try {
            setIsLoading(true);
            const req = api.post<{ message: string }>('admin/clients', data);
            toast.promise(req, {
                loading: 'Guardando cliente',
                error: () => {
                    setIsLoading(false);
                    return 'Hubo un error, inténtelo más tarde'
                },
                success: ({ data }) => {
                    getClients();
                    close();
                    return data.message;
                }
            })
        } catch (error) {

        }
    }

    const setEditClient = (client: IClient) => dispatch({
        type: '[Admin] - set client to edit',
        payload: client,
    })

    const setUpdatedClient = (client: IClient) => dispatch({
        type: '[Admin] - set updated client',
        payload: client,
    })

    const clearEditClient = () => dispatch({
        type: '[Admin] - clear client to edit'
    })

    const setLots = (lots: ILot[]) => dispatch({
        type: '[Admin] - set lots',
        payload: lots
    })

    const postClientUpdate = ({ phoneNumber, name, _id }: { phoneNumber: string, name: string, _id: string }, close: () => void) => {
        const client = { phoneNumber, name, _id };
        const req = api.put<{ message: string }>('admin/clients/' + _id, {
            phoneNumber, name
        });
        toast.promise(req, {
            loading: 'Actualizando cliente',
            success: ({ data }) => {
                Router.replace(Router.asPath);
                return 'Actualizado con éxito'
            },
            error: 'Hubo un error'
        })
        clearEditClient();
        close();
    }

    const postClientFile = ({ file, fileName, _id }: { file: File, fileName: string, _id: string }, close: () => void) => {
        const req = api.post<{ message: string }>('admin/clients/file/' + _id, {
            file, fileName
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        toast.promise(req, {
            loading: 'Subiendo archivo',
            success: ({ data }) => {
                Router.replace(Router.asPath);
                close();
                return 'Archivo subido con éxito'
            },
            error: 'Hubo un error'
        })
    }


    const getLots = () => {
        try {
            api.get<{ lots: ILot[] }>('lots').then(res => {
                setLots(res.data.lots)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const setClient = (client: IClient) => dispatch({
        type: '[Admin] - set client',
        payload: client
    })

    const getClient = async (client: string) => {
        try {
            console.log('GEt client from admin provider', client);
            api.get<{ clients: IClient[] }>('admin/clients?search=' + client).then(res => {
                const client = res.data.clients[0];
                setClient(client);
            })
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <AdminContext.Provider value={{
            ...state,

            // Methods
            updateLotInfo,
            setSelectedLot,
            setClientsRoute,
            getClients,
            createClient,
            setClient,
            getClient,

            setEditClient,
            postClientUpdate,
            clearEditClient,
            postClientFile,

            getLots
        }} >
            {children}
        </AdminContext.Provider>
    );
};