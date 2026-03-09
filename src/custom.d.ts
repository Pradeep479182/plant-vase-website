declare module '*.module.css'
declare module '*.css'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.webp'
declare module '*.avif'
declare module '*.svg'

interface ImportMetaEnv {
  readonly VITE_APP?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
