// import styles from './fileDrop.module.scss';
// import inputStyles from '../editLot/edit.module.scss';
// import { useContext, useRef, useState } from 'react'
// import imageCompression from 'browser-image-compression';

// const UPLOAD_DOC = gql`

//     mutation uploadDoc($input: ClientDocInput) {
//         uploadDoc(input: $input) {
//             name
//         }
//     }

// `

// function DropFileUpload() {

//     const { setShouldRefetch, client } = useContext(EditClientContext);
//     const { setToastInfo, activeToast } = useContext(AdminContext);
//     const dropFileInputRef = useRef<HTMLDivElement>(null);
//     const [values, handleInputChange, reset] = useForm({
//         docName: ''
//     });
//     const [file, setFile] = useState(null);

//     // FUNCTIONS
//     const onDragEnter = () => {
//         if (null !== dropFileInputRef.current) {
//             dropFileInputRef.current.classList.add(styles.dragEnter)
//         }
//     };

//     const onDragLeave = () => {
//         if (null !== dropFileInputRef.current) {
//             dropFileInputRef.current.classList.remove(styles.dragEnter)
//         }
//     }

//     const onFilesDrop = async (e: InputEvent) => {

//         const file = e.target.files[0];
//         let newFile;

//         if (!file) return;

//         if (file.type.includes('image')) {
//             const options = {
//                 maxSizeMB: 3,
//                 maxWidthOrHeight: 800,
//                 maxIteration: 5,
//             };

//             const optimizedImage = await imageCompression(file, options);
//             newFile = optimizedImage;
//         }

//         setFile(newFile || file);

//     }

//     const handleUploadDoc = async (e) => {
//         e.preventDefault();

//         const { data } = await uploadDoc({
//             variables: {
//                 input: {
//                     clientID: client._id,
//                     name: docName,
//                     doc: file
//                 }
//             }
//         });

//         if (data) {
//             setShouldRefetch(true);
//             setToastInfo(`Documento ${docName} subido con éxito`);
//             activeToast();
//             reset();
//             setFile(null);
//         }
//     }

//     return (
//         <>
//             {
//                 loading && <PageLoader />
//             }
//             {
//                 !file ? (
//                     <div
//                         ref={dropFileInputRef}
//                         className={styles.dropFileInput}
//                         onDragEnter={onDragEnter}
//                         onDragLeave={onDragLeave}
//                         onDrop={onDragLeave}
//                     >
//                         <p>
//                             Da clic o suelta un documento
//                         </p>

//                         <input type="file" value="" onChange={onFilesDrop} />
//                     </div>
//                 ) : (
//                     <div className={`${styles.dropFileInput} ${styles.fileOn}`} >
//                         <p>
//                             Documento cargado
//                         </p>
//                     </div>
//                 )
//             }

//             <div className={inputStyles.form_group}>
//                 <label htmlFor="docName" className={inputStyles.form_label}>Nombre del documento</label>
//                 <input type="text"
//                     value={docName}
//                     className={inputStyles.form_field}
//                     onChange={handleInputChange}
//                     name="docName"
//                     id='docName'
//                     required />
//             </div>

//             <button onClick={handleUploadDoc} disabled={(!file || !docName) ? true : false} className={styles.btn} >
//                 Subir Archivo
//             </button>

//         </>
//     )
// }

// export default DropFileUpload;


import React from 'react'

export const DropFileUpload = () => {
    return (
        <div>DropFileUpload</div>
    )
}
