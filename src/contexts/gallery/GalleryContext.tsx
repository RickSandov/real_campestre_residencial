import { createContext } from 'react';

export interface ContextProps {
    isFullScreen: boolean;
}

export const GalleryContext = createContext({} as ContextProps);