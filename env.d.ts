/// <reference types="vite/client" />
declare module 'vue-cleave-component'
interface Window {
  ReactNativeWebView?: {
    postMessage: (message: string) => void;
  };
}