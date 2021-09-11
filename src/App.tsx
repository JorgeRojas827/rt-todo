import './App.css';
import { Principal } from './views/Principal';

const App = () => {
  return (
    <div className="App w-screen h-screen flex flex-col md:flex-row">
      <Principal />
    </div>
  );
}

export default App;
