/// <reference types="react" />
/// <reference types="react-dom" />

// Ensure JSX namespace is available for PCF builds
declare namespace JSX {
  interface IntrinsicElements extends React.JSX.IntrinsicElements {}
}
