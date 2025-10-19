import Navbar from "./components/Navbar";
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from "./routes/routes";
function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
          <AppRoutes/>
        </BrowserRouter>
      </div>

    </>
  )
}

export default App
