import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";
import Hub from "./Pages/Hub"
import Packs from "./Pages/Packs"
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
          <Route path="/NFTHub/info" element={<Info />} />
          <Route path="/NFTHub/disconnect" element={<Disconnect />} />
          <Route path="/NFTHub/" element={<Hub />} />
          <Route path="/NFTHub/packs" element={<Packs />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Web3ReactProvider>
  )
}

export default App
