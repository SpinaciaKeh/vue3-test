/// <reference types="vite/client" />
export {}

declare global {
    interface Window {
        Cesium: any,
        Viewer: any
    }
}
