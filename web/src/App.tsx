import { GraphqlProvider } from "./providers/GraphqlProvider";
import { SessionProvider } from "./providers/SessionProvider";
import { ToastifyProvider } from "./providers/ToastifyProvider";
import { Routes } from "./router";


function App() {
  return (
    <ToastifyProvider>
      <GraphqlProvider>
        <SessionProvider>
          <Routes/>
        </SessionProvider>
      </GraphqlProvider>
    </ToastifyProvider>
  );
}

export default App;
