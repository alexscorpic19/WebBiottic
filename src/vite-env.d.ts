/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // Añade aquí otras variables de entorno que uses
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
