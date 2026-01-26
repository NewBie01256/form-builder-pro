/// <reference types="react" />
/// <reference types="react-dom" />

// Type declarations for react-syntax-highlighter (PCF build compatibility)
declare module 'react-syntax-highlighter' {
  import * as React from 'react';
  
  interface SyntaxHighlighterProps {
    children: string;
    language?: string;
    style?: Record<string, React.CSSProperties>;
    showLineNumbers?: boolean;
    wrapLines?: boolean;
    customStyle?: React.CSSProperties;
    codeTagProps?: React.HTMLAttributes<HTMLElement>;
    lineNumberStyle?: React.CSSProperties | ((lineNumber: number) => React.CSSProperties);
    startingLineNumber?: number;
    lineProps?: React.HTMLAttributes<HTMLElement> | ((lineNumber: number) => React.HTMLAttributes<HTMLElement>);
    PreTag?: React.ElementType;
    CodeTag?: React.ElementType;
    useInlineStyles?: boolean;
  }
  
  export const Prism: React.FC<SyntaxHighlighterProps>;
  export const Light: React.FC<SyntaxHighlighterProps>;
  export default React.FC<SyntaxHighlighterProps>;
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  const oneDark: Record<string, React.CSSProperties>;
  const vscDarkPlus: Record<string, React.CSSProperties>;
  const tomorrow: Record<string, React.CSSProperties>;
  const prism: Record<string, React.CSSProperties>;
  export { oneDark, vscDarkPlus, tomorrow, prism };
}

declare module 'react-syntax-highlighter/dist/esm/styles/hljs' {
  const vs2015: Record<string, React.CSSProperties>;
  const docco: Record<string, React.CSSProperties>;
  export { vs2015, docco };
}

// Ensure JSX namespace is available for PCF builds
export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    type Element = React.JSX.Element;
    type ElementClass = React.JSX.ElementClass;
    type IntrinsicElements = React.JSX.IntrinsicElements;
  }
}
