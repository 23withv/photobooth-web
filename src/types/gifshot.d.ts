declare module "gifshot" {
  export interface GifshotOptions {
    images: string[];
    interval?: number;
    gifWidth?: number;
    gifHeight?: number;
  }

  export interface GifshotResult {
    error: boolean;
    errorCode?: string;
    errorMsg?: string;
    image: string;
  }

  const gifshot: {
    createGIF: (
      options: GifshotOptions,
      callback: (obj: GifshotResult) => void,
    ) => void;
  };

  export default gifshot;
}
