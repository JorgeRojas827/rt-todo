import "./App.css";
import { Principal } from "./views/Principal";
import { Provider } from "react-redux";
import { store } from "./store";

const App = () => {
  return (
    <div className="App w-screen h-screen bg-background flex flex-col md:flex-row">
      <Provider store={store}>
        <Principal />
      </Provider>
    </div>
  );
};

export default App;
