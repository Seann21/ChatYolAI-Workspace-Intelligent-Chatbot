declare module 'react-syntax-highlighter' {
  import React from 'react';
  export const Prism: React.ComponentType<any>;
  export const Light: React.ComponentType<any>;
  const defaultExport: React.ComponentType<any>;
  export default defaultExport;
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  export const oneDark: Record<string, any>;
  export const vscDarkPlus: Record<string, any>;
  export const prism: Record<string, any>;
  export const dark: Record<string, any>;
  const defaultExport: Record<string, any>;
  export default defaultExport;
}

