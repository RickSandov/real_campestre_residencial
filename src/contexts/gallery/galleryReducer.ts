import { IGalleryS } from "interfaces";
import { GalleryState } from "./";

type GalleryActionType =
  | { type: "[Gallery] - toogle is full screen" }
  | {
      type: "[Gallery] - set active gallery";
      payload: {
        gallery: IGalleryS;
        image?: string;
      };
    }
  | { type: "[Gallery] - next image"; payload?: boolean };

export const galleryReducer = (
  state: GalleryState,
  action: GalleryActionType
): GalleryState => {
  switch (action.type) {
    case "[Gallery] - toogle is full screen":
      return {
        ...state,
        isFullScreen: !state.isFullScreen,
      };

    case "[Gallery] - set active gallery": {
      const { gallery, image } = action.payload;
      return {
        ...state,
        isFullScreen: true,
        activeGallery: gallery,
        currentImage: image || gallery.images[0],
      };
    }

    case "[Gallery] - next image": {
      const prev = action.payload;
      const gallery = state.activeGallery?.images;
      if (!gallery) return { ...state };
      const galleryItems = gallery.length - 1;
      const currentImageIndex = gallery.indexOf(state.currentImage);
      if (prev) {
        if (currentImageIndex === 0) {
          return { ...state, currentImage: gallery[galleryItems] };
        }
        return { ...state, currentImage: gallery[galleryItems - 1] };
      }
      if (currentImageIndex === galleryItems)
        return { ...state, currentImage: gallery[0] };
      return {
        ...state,
        currentImage: gallery[currentImageIndex + 1],
      };
    }
    default:
      return state;
  }
};
