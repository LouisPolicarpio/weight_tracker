import Navbar from "./components/Navbar";
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from "./routes/routes";
function App() {

  return (
    <>
      <div className="w-full overflow-x-hidden ">
        <BrowserRouter>
          <Navbar />
          <AppRoutes/>
        </BrowserRouter>
      </div>

    </>
  )
}

export default App
