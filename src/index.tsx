import { useCallback, useEffect, useState } from "react";

import { ApolloProvider } from "@apollo/client";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ApolloWrapper from "./apollo/client";
import { Navigation } from "./navigation/root";

const App: React.FC = () => {
  const [ready, setReady] = useState(false);

  const initialize = useCallback(async () => {
    await ApolloWrapper.initialize();
    setReady(true);
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Return null until ready
  if (!ready) {
    return null;
  }
  return (
    <ApolloProvider client={ApolloWrapper.client}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default App;
