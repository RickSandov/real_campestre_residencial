
import { Input } from 'components/input/Input';
import { Formik, FormikHelpers, FormikValues, Form } from 'formik';
import React, { useContext, useState } from 'react'
import { AdminContext } from 'contexts/admin';
import toast from 'react-hot-toast';
import { api } from 'lib';
import { ILot } from 'interfaces';
import { ClientSelect } from './client-select';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MXN',
});

export type TClient = {
    _id: string,
    name: string,
    phoneNumber: string,
}
export const SetBuyer = ({ cancel }: { cancel: () => void }) => {
    const { selectedLot, getLots, setSelectedLot } = useContext(AdminContext)
    const [clients, setClients] = useState<TClient[]>([])
    const [selectedClient, setselectedClient] = useState<null | TClient>(null)
    const [isLoading, setIsLoading] = useState(false)

    const { _id, num, price, section } = selectedLot as ILot;

    const onSubmit = (values: FormikValues, helpers: FormikHelpers<any>) => {
        // setIsLoading(true);
        const { price } = values;
        const data = { price, client: selectedClient!._id };

        const req = api.put('admin/lots' + `?id=${_id}`, data)

        // TODO: migrate to AdminContext methods.

        // const req = api.put(`admin/lots/${_id}`, {
        //     _id, status, price, type
        // })
        toast.promise(req, {
            loading: 'Guardando comprador...',
            success: (data) => {
                console.log({ data })
                // setIsLoading(false);
                getLots();
                setSelectedLot(null);
                cancel();
                return 'Actualizado con éxito'
            },
            error: () => {
                // setIsLoading(false);
                return 'Hubo un error al enviar el formulario, inténtelo de nuevo más tarde.'
            }
        })

        // const req = api.put(`admin/lots/${_id}`, {
        //     _id, status, price, type
        // })
        // toast.promise(req, {
        //     loading: 'Actualizando información...',
        //     success: () => {
        //         // setIsLoading(false);
        //         getLots();
        //         setSelectedLot(null);
        //         cancel();
        //         return 'Actualizado con éxito'
        //     },
        //     error: () => {
        //         // setIsLoading(false);
        //         return 'Hubo un error al enviar el formulario, inténtelo de nuevo más tarde.'
        //     }
        // })
    }

    const onSearchClients = (values: FormikValues, helpers: FormikHelpers<any>) => {
        const req = api.get(`admin/clients?search=${values.clientString}`);
        toast.promise(req, {
            loading: 'Buscando cliente',
            success: ({ data }) => {
                // setClients(data);
                const { clients } = data;
                setClients(clients);
                return 'Cliente encontrado'
            },
            error: () => {
                return 'Cliente no encontrado'
            }
        })
    }

    return (
        <div className='' >
            <p className='mb-3 text-xl text-text' ><strong>Asignar comprador </strong></p>
            <h2 className='text-5xl mb-28' >Lote <strong>{section}{num}</strong></h2>

            <Formik
                initialValues={{
                    clientString: '',
                }}
                onSubmit={onSearchClients}
                enableReinitialize={true}
            >
                {({ handleSubmit }) => (


                    <form className='mt-10 mb-6' onSubmit={handleSubmit} >
                        <Input
                            name='clientString'
                            nameDisplayed='Buscar cliente'
                            className='font-bold'
                            placeholder='Buscar por nombre o número celular'
                        />
                    </form>
                )}
            </Formik>

            <ul className='flex flex-wrap items-center justify-start gap-3 mb-14' >
                {
                    clients.map(({ _id, name, phoneNumber }) => {
                        return (
                            <li className='' key={_id}>
                                <ClientSelect isSelected={selectedClient?._id === _id} setSelected={setselectedClient} client={{ _id, name, phoneNumber }} />
                            </li>
                        )
                    })
                }
            </ul>

            <Formik
                initialValues={{
                    price,
                }}
                onSubmit={onSubmit}
                enableReinitialize={true}
            >
                {({ handleSubmit, values, }) => {

                    // setPriceParsed(values.price.toLocaleString())
                    const price = formatter.format(values.price);
                    const disabled = !selectedClient?._id
                    return (
                        <form className='' onSubmit={handleSubmit} >
                            <Input
                                footer={price}
                                name='price'
                                nameDisplayed='Precio'
                                className='font-bold'
                                placeholder={String(price)}
                            />

                            <div className='flex self-end justify-end w-full gap-4 mt-20' >
                                <button className='px-6 py-4 text-2xl text-white transition-colors bg-red-500 rounded-lg hover:bg-red-800' type='button' onClick={cancel} >
                                    cancelar
                                </button>
                                <button disabled={disabled} className='px-6 py-4 text-2xl text-white transition-colors rounded-lg bg-primary hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-slate-300' type='submit'>
                                    Asignar comprador
                                </button>
                            </div>
                        </form>
                    )
                }}
            </Formik>
        </div >
    )
}


{/* <>
                        <label htmlFor='status' className=''>
                            Estatus
                        </label>
                        <Field
                            as="select"
                            name='status'
                            placeholder={status}
                        >
                            {Object.values(statusType).map(value => (
                                <option key={value} value={value}>{value}</option>
                            ))}
                        </Field>
                    </> */}