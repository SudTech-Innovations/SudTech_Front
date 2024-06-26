import Body from "./components/Body.js";
import UserContextProvider from "./models/utils/context/UserContext.js";

function App() {
  return (
    <UserContextProvider>
      <Body />
    </UserContextProvider>
  );
}
export default App;
