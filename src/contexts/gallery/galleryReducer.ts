import { GalleryState } from "./";

type GalleryActionType = { type: "[Gallery] - toogle is full screen" };

export const galleryReducer = (
  state: GalleryState,
  action: GalleryActionType
): GalleryState => {
  switch (action.type) {
    case "[Gallery] - toogle is full screen":
      return {
        ...state,
      };

    default:
      return state;
  }
};
