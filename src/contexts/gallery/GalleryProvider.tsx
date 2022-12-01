import { IGalleryS } from 'interfaces';
import { FC, PropsWithChildren, useCallback, useEffect, useReducer } from 'react';
import { GalleryContext, galleryReducer } from './';

export interface GalleryState {
    isFullScreen: boolean;
    activeGallery: IGalleryS | null;
    currentImage: string;
}

const Gallery_INITIAL_STATE: GalleryState = {
    isFullScreen: false,
    activeGallery: null,
    currentImage: ''
};

export const GalleryProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(galleryReducer,
        Gallery_INITIAL_STATE);

    useEffect(() => {
        if (state.isFullScreen) {
            document.body.style.setProperty('--overflow', 'hidden');
        } else {
            document.body.style.setProperty('--overflow', 'scroll');
        }
    }, [state.isFullScreen]);

    const setActiveGallery = useCallback(
        (gallery: IGalleryS, image?: string) => (
            dispatch({
                type: '[Gallery] - set active gallery',
                payload: {
                    gallery,
                    image
                }
            })
        ),
        [],
    );
    const toggleIsFullScreen = useCallback(
        () => dispatch({ type: '[Gallery] - toogle is full screen' }),
        [],
    )

    const nextImage = useCallback(
        (prev?: boolean) => dispatch({ type: '[Gallery] - next image', payload: prev }),
        [],
    )

    return (
        <GalleryContext.Provider value={{
            ...state,

            // Methods
            setActiveGallery,
            toggleIsFullScreen,
            nextImage
        }} >
            {children}
        </GalleryContext.Provider>
    );
};