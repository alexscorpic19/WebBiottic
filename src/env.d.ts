/// <reference types="vite/client" />

// No necesitamos redeclarar *.svg ya que viene de vite/client

interface ImportMetaEnv extends Readonly<{
  readonly VITE_API_URL: string;
  // Extendemos en lugar de redeclarar
}> {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
