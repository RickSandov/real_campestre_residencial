import { createContext } from 'react';

export interface GalleryContextProps {
    isFullScreen: boolean;
}

export const GalleryContext = createContext({} as GalleryContextProps);