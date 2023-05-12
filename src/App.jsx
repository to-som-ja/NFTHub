import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";
import LeftPanel from "./Components/LeftPanel"
import Hub from "./Pages/Hub"

function getLibrary(provider) {
  return new Web3Provider(provider);
}

function App() {

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <LeftPanel />
      <Hub />
    </Web3ReactProvider>
  )
}

export default App
