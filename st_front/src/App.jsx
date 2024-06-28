import Body from "./components/Body.jsx";
import UserContextProvider from "./models/utils/context/UserContext.jsx";

function App() {
  return (
    <UserContextProvider>
      <Body />
    </UserContextProvider>
  );
}
export default App;
