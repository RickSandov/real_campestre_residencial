import { IGalleryS } from 'interfaces';
import { createContext } from 'react';

export interface GalleryContextProps {
    isFullScreen: boolean;
    activeGallery: IGalleryS | null;
    currentImage: string;

    // Methods
    setActiveGallery: (gallery: IGalleryS, image?: string) => void;
    toggleIsFullScreen: () => void;
    nextImage: (prev?: boolean) => void;
}

export const GalleryContext = createContext({} as GalleryContextProps);