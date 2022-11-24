import { FC, PropsWithChildren, useReducer } from 'react';
import { GalleryContext, galleryReducer } from './';

export interface GalleryState {
    isFullScreen: boolean;
}

const Gallery_INITIAL_STATE: GalleryState = {
    isFullScreen: false
};

export const GalleryProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(galleryReducer,
        Gallery_INITIAL_STATE);

    return (
        <GalleryContext.Provider value={{
            ...state
        }} >
            {children}
        </GalleryContext.Provider>
    );
};