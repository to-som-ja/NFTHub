import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";
import Hub from "./Pages/Hub"
import Burn from "./Pages/Burn"
import Disconnect from "./Pages/Disconnect"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from './Pages/NotFound';
import { Info } from './Pages/Info';

function getLibrary(provider) {
  return new Web3Provider(provider);
}

function App() {

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <Routes>
          <Route path="/info" element={<Info />} />
          <Route path="/disconnect" element={<Disconnect />} />
          <Route path="/" element={<Hub />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Web3ReactProvider>
  )
}

export default App
