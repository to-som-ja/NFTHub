import Web3 from "web3";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const getLibrary = (provider) => {
  return new Web3(provider);
};

export const Injected = new InjectedConnector({ supportedChainIds: [1] });
export const WalletConnect = new WalletConnectConnector({
  rpc: {
    1: "https://eth-mainnet.g.alchemy.com/v2/T3LmgMXEIllErGw9oZ7J7qvJET1roDsL",
  },
});
