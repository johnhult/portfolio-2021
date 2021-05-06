import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import GlobalStyle from "./components/GlobalStyle";
import AppRouter from "./router";

function App() {
  return (
    <ErrorBoundary>
      <GlobalStyle />
      <AppRouter />
    </ErrorBoundary>
  );
}

export default App;
