export interface IImage {
  order: number; // unique
  url: string;
  key: string;
}

export interface IGallery {
  name: string;
  order: number;
  show: boolean;
  images: IImage[];
}

export interface IGalleryS {
  name: string;
  images: string[];
}
