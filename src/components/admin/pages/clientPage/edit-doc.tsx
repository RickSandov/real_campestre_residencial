import { useState } from "react";
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useDismiss,
    useRole,
    useClick,
    useInteractions,
    FloatingFocusManager,
    useId
} from "@floating-ui/react";
import { Doc } from "interfaces";
import { api } from "lib";
import toast from "react-hot-toast";

export function EditDoc({ doc, close, clientId }: { doc: Doc, close: () => void, clientId: string }) {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        placement: "right",
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [
            offset(10),
            flip({ fallbackAxisSideDirection: "end" }),
            shift(),
        ],
        whileElementsMounted: autoUpdate
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role
    ]);

    const headingId = useId();

    const handleDeleteDoc = async () => {
        try {
            const url = `admin/clients/file?key=${doc.key}&clientId=${clientId}`
            const req = api.delete(url);
            toast.promise(req, {
                success: () => {
                    close();
                    return `${doc.name} eliminado con éxito`
                },
                error: 'Hubo un error al eliminar el archivo',
                loading: 'Eliminando archivo'
            })
        } catch (error) {

        }
    }

    return (
        <>
            <li ref={refs.setReference} {...getReferenceProps()} className='relative z-50 px-6 py-2 font-bold text-white bg-rblue hover:bg-slate-600 hover:text-slate-200'>
                <button className="text-xl" >
                    {doc.name}
                </button>
            </li>
            {isOpen && (
                <FloatingFocusManager context={context} modal={false}>
                    <div
                        className="p-5 rounded-md shadow-md max-w-[200px] bg-red-500 z-50 ml-2"
                        ref={refs.setFloating}
                        style={floatingStyles}
                        aria-labelledby={headingId}
                        {...getFloatingProps()}
                    >
                        <h2 className="text-xl text-white" id={headingId}>¿Seguro que desea eliminar el documento <strong>{doc.name}</strong>?</h2>
                        <button
                            style={{ float: "right" }}
                            className="px-5 py-2 mt-2 text-lg text-white rounded-md bg-rblue"
                            onClick={handleDeleteDoc}
                        >
                            Eliminar
                        </button>
                    </div>
                </FloatingFocusManager>
            )}
        </>
    );
}