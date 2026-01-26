/// <reference types="react" />
/// <reference types="react-dom" />

// Ensure JSX namespace is available for PCF builds
// This file ensures TypeScript recognizes JSX elements in the PCF build context
export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // Re-export React's JSX types for PCF compatibility
    type Element = React.JSX.Element;
    type ElementClass = React.JSX.ElementClass;
    type IntrinsicElements = React.JSX.IntrinsicElements;
  }
}
