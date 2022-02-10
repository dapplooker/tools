import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { convertUtf8ToHex } from "@walletconnect/utils";
// @ts-ignore
import Web3Modal from "web3modal";
// @ts-ignore
//allowSyntheticDefaultImports
import WalletConnect from "@walletconnect/web3-provider";
// @ts-ignore
import Torus from "@toruslabs/torus-embed";
import {AssetsService} from "./service/assets.service";
// // @ts-ignore
//import WalletLink from "walletlink";

interface IAssetData {
  symbol: string;
  name: string;
  decimals: string;
  contractAddress: string;
  balance?: string;
}

interface IAppState {
  fetching: boolean;
  address: string;
  web3: any;
  provider: any;
  connected: boolean;
  chainId: number;
  networkId: number;
  assets: IAssetData[];
  showModal: boolean;
  pendingRequest: boolean;
  result: any | null;
}
interface IChainData {
  name: string;
  short_name: string;
  chain: string;
  network: string;
  chain_id: number;
  network_id: number;
  rpc_url: string;
  native_currency: IAssetData;
}


function initWeb3(provider: any){
  const web3: any = new Web3("http://localhost:33391/");
 console.log(web3);
  web3.eth.extend({
    methods: [
      {
        name: "chainId",
        call: "eth_chainId",
        outputFormatter: web3.utils.hexToNumber
      }
    ]
  });
  console.log("web");
  return web3;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  web3Modal:any;
  INITIAL_STATE: IAppState = {
    fetching: false,
    address: "",
    web3: null,
    provider: null,
    connected: false,
    chainId: 1,
    networkId: 1,
    assets: [],
    showModal: false,
    pendingRequest: false,
    result: null
  };
  connectedChain:IChainData|null = {
    name: "Ethereum Mainnet",
    short_name: "eth",
    chain: "ETH",
    network: "mainnet",
    chain_id: 1,
    network_id: 1,
    rpc_url: "https://mainnet.infura.io/v3/%API_KEY%",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: ""
    }
  };
  state: IAppState = this.INITIAL_STATE;
  defaultNativeCurrency: IAssetData =
  this.state.chainId === 100
    ? {
        contractAddress: "",
        symbol: "xDAI",
        name: "xDAI",
        decimals: "18",
        balance: "0",
      }
    : {
        contractAddress: "",
        name: "Ethereum",
        symbol: "ETH",
        decimals: "18",
        balance: "0",
      };
  nativeCurrency: IAssetData = this.defaultNativeCurrency;
  tokens: IAssetData[] = [];
  supportedChains: IChainData[] = [
    {
      name: "Ethereum Mainnet",
      short_name: "eth",
      chain: "ETH",
      network: "mainnet",
      chain_id: 1,
      network_id: 1,
      rpc_url: "https://mainnet.infura.io/v3/%API_KEY%",
      native_currency: {
        symbol: "ETH",
        name: "Ethereum",
        decimals: "18",
        contractAddress: "",
        balance: ""
      }
    },
    {
      name: "Ethereum Ropsten",
      short_name: "rop",
      chain: "ETH",
      network: "ropsten",
      chain_id: 3,
      network_id: 3,
      rpc_url: "https://ropsten.infura.io/v3/%API_KEY%",
      native_currency: {
        symbol: "ETH",
        name: "Ethereum",
        decimals: "18",
        contractAddress: "",
        balance: ""
      }
    },
    {
      name: "Ethereum Rinkeby",
      short_name: "rin",
      chain: "ETH",
      network: "rinkeby",
      chain_id: 4,
      network_id: 4,
      rpc_url: "https://rinkeby.infura.io/v3/%API_KEY%",
      native_currency: {
        symbol: "ETH",
        name: "Ethereum",
        decimals: "18",
        contractAddress: "",
        balance: ""
      }
    },
    {
      name: "Ethereum Görli",
      short_name: "gor",
      chain: "ETH",
      network: "goerli",
      chain_id: 5,
      network_id: 5,
      rpc_url: "https://goerli.infura.io/v3/%API_KEY%",
      native_currency: {
        symbol: "ETH",
        name: "Ethereum",
        decimals: "18",
        contractAddress: "",
        balance: ""
      }
    },
    {
      name: "RSK Mainnet",
      short_name: "rsk",
      chain: "RSK",
      network: "mainnet",
      chain_id: 30,
      network_id: 30,
      rpc_url: "https://public-node.rsk.co",
      native_currency: {
        symbol: "RSK",
        name: "RSK",
        decimals: "18",
        contractAddress: "",
        balance: ""
      }
    },
    {
      name: "Ethereum Kovan",
      short_name: "kov",
      chain: "ETH",
      network: "kovan",
      chain_id: 42,
      network_id: 42,
      rpc_url: "https://kovan.infura.io/v3/%API_KEY%",
      native_currency: {
        symbol: "ETH",
        name: "Ethereum",
        decimals: "18",
        contractAddress: "",
        balance: ""
      }
    },
    {
      name: "Ethereum Classic Mainnet",
      short_name: "etc",
      chain: "ETC",
      network: "mainnet",
      chain_id: 61,
      network_id: 1,
      rpc_url: "https://ethereumclassic.network",
      native_currency: {
        symbol: "ETH",
        name: "Ethereum",
        decimals: "18",
        contractAddress: "",
        balance: ""
      }
    },
    {
      name: "POA Network Sokol",
      short_name: "poa",
      chain: "POA",
      network: "sokol",
      chain_id: 77,
      network_id: 77,
      rpc_url: "https://sokol.poa.network",
      native_currency: {
        symbol: "POA",
        name: "POA",
        decimals: "18",
        contractAddress: "",
        balance: ""
      }
    },
    {
      name: "POA Network Core",
      short_name: "skl",
      chain: "POA",
      network: "core",
      chain_id: 99,
      network_id: 99,
      rpc_url: "https://core.poa.network",
      native_currency: {
        symbol: "POA",
        name: "POA",
        decimals: "18",
        contractAddress: "",
        balance: ""
      }
    },
    {
      name: "xDAI Chain",
      short_name: "xdai",
      chain: "POA",
      network: "dai",
      chain_id: 100,
      network_id: 100,
      rpc_url: "https://dai.poa.network",
      native_currency: {
        symbol: "xDAI",
        name: "xDAI",
        decimals: "18",
        contractAddress: "",
        balance: ""
      }
    },
    {
      name: "Callisto Mainnet",
      short_name: "clo",
      chain: "callisto",
      network: "mainnet",
      chain_id: 820,
      network_id: 1,
      rpc_url: "https://clo-geth.0xinfra.com/",
      native_currency: {
        symbol: "CLO",
        name: "CLO",
        decimals: "18",
        contractAddress: "",
        balance: ""
      }
    },
    {
      name: "Binance Smart Chain",
      short_name: "bsc",
      chain: "smartchain",
      network: "mainnet",
      chain_id: 56,
      network_id: 56,
      rpc_url: "https://bsc-dataseed1.defibit.io/",
      native_currency: {
        symbol: "BNB",
        name: "BNB",
        decimals: "18",
        contractAddress: "",
        balance: ""
      }
    },
    {
      name: "Celo Mainnet",
      short_name: "celo",
      chain: "celo",
      network: "mainnet",
      chain_id: 42220,
      network_id: 42220,
      rpc_url: "https://forno.celo.org",
      native_currency: {
        symbol: "CELO",
        name: "CELO",
        decimals: "18",
        contractAddress: "",
        balance: ""
      }
    },
    {
      name: "Celo Alfajores Testnet",
      short_name: "celo",
      chain: "celo",
      network: "alfajores",
      chain_id: 44787,
      network_id: 44787,
      rpc_url: "https://alfajores-forno.celo-testnet.org",
      native_currency: {
        symbol: "CELO",
        name: "CELO",
        decimals: "18",
        contractAddress: "",
        balance: ""
      }
    },
    {
      name: "Celo Baklava Testnet",
      short_name: "celo",
      chain: "celo",
      network: "baklava",
      chain_id: 62320,
      network_id: 62320,
      rpc_url: "https://baklava-forno.celo-testnet.org",
      native_currency: {
        symbol: "CELO",
        name: "CELO",
        decimals: "18",
        contractAddress: "",
        balance: ""
      }
    }
  ];
  
  //for creating the web3Modal when page loads
  constructor(private _http:AssetsService){
    console.log("constructor working")
    this.web3Modal = new Web3Modal({
      network: this.getNetwork(),//optional
      cacheProvider: true,
      theme:"dark",
      providerOptions: {}
    });
    //cachedprovider is undefined in the beginning
    //getting ready the web3Modal object
    //console.log(this.web3Modal.cachedProvider);
  }


  ngOnInit():void{
    console.log("ngOnInit")
    if (this.web3Modal.cachedProvider) {
      this.onConnect();
    }
  }
  
  //for resetting app to no wallet connected state but if a wallet is connect priviously
  // then it will always pop up on clicking the connect button unless you disconnect it
  //from API itself

  public resetApp = async () => {

    const { web3 } = this.state;
    if (web3 && web3.currentProvider && web3.currentProvider.close){
      await web3.currentProvider.close();
    }

    await this.web3Modal.clearCachedProvider();
    this.state = {...this.INITIAL_STATE};
  };
  
  
  public getAccountAssets = async () => {
    const { address, chainId } = this.state;
    this.state = { ...this.state,fetching:true };
      // get account balances
      this._http.get(`https://ethereum-api.xyz/account-assets?address=${address}&chainId=${chainId}`).subscribe(
        ({result}) =>{
          
          this.state = { ...this.state,fetching: false, assets:result };
          if (this.state.assets && this.state.assets.length) {
            const filteredNativeCurrency = this.state.assets.filter((asset: IAssetData) =>
              asset && asset.symbol
                ? asset.symbol.toLowerCase() === this.nativeCurrency.symbol.toLowerCase()
                : false
            );
            this.nativeCurrency =
              filteredNativeCurrency && filteredNativeCurrency.length
                ? filteredNativeCurrency[0]
                : this.defaultNativeCurrency;
            this.tokens = this.state.assets.filter((asset: IAssetData) =>
              asset && asset.symbol
                ? asset.symbol.toLowerCase() !== this.nativeCurrency.symbol.toLowerCase()
                : false
            );
          }
        },
        (error)=>{
        //  console.log(error);
           this.state = { ...this.state,fetching:false, assets:[] };
        }
      );

  };



  public subscribeProvider = async (provider: any) => {
    if (!provider.on) {
      return;
    }
    provider.on("close", () => this.resetApp());
    provider.on("accountsChanged", async (accounts: string[]) => {
      console.log(accounts);
      this.state = { ...this.state,address: accounts[0] };
      await this.getAccountAssets();
    });
    provider.on("chainChanged", async (chainId: number) => {
      const { web3 } = this.state;
      const networkId = await web3.eth.net.getId();

      if(networkId != 42220){
        this.state = { ...this.state,chainId, networkId }
        await this.getAccountAssets();
      }
      else {
        alert(`Celo with chainID - ${chainId} is not supported`)
      }

    });

    provider.on("networkChanged", async (networkId: number) => {
      const { web3 } = this.state;
      const chainId = await web3.eth.chainId();
      if(networkId != 42220){
        this.state = { ...this.state,chainId, networkId }
        await this.getAccountAssets();
      }

    });
  };

  public onConnect = async () => {

    /* this is where user is requested for selecting wallet and
     it will await till it not connected to one.
     -> onces its connected it will jump to next line
    */
    const provider = await this.web3Modal.connect();
    // web3Modal.cachedProvider for metamak --> injected
    //to keep track of the provider changes (e.g - wallet changes)
    await this.subscribeProvider(provider);
      
    //enabling the provider service
    await provider.enable();
    const web3: any = initWeb3(provider);
    //console.log(this.web3Modal);

    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const address = accounts[0];
    
    const networkId = await web3.eth.net.getId();
    console.log(networkId)

    const chainId = await web3.eth.chainId();
    console.log(chainId);

    this.connectedChain = chainId ? this.getChainData(chainId) : null;
    console.log(this.connectedChain);
    
    this.state = { ...this.state,
      web3,
      provider,
      connected: true,
      address,
      chainId,
      networkId}

    await this.getAccountAssets();
    console.log("connected")
  };
  getChainData(chainId: number): IChainData {
    const chainData = this.supportedChains.filter(
      (chain: any) => chain.chain_id === chainId
    )[0];
  
    if (!chainData) {
      throw new Error("ChainId missing or not supported");
    }
  
    const API_KEY = "e66dcbee71f043efa8085d676c87a389";
  
    if (
      chainData.rpc_url.includes("infura.io") &&
      chainData.rpc_url.includes("%API_KEY%") &&
      API_KEY
    ) {
      const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY);
  
      return {
        ...chainData,
        rpc_url: rpcUrl
      };
    }
  
    return chainData;
  }
  
  getNetwork() {
    return this.getChainData(this.state.chainId).network;
  }

  getProviderOptions(){
    const infuraId = "e66dcbee71f043efa8085d676c87a389";
    const providerOptions = {
      walletconnect: {
        package: WalletConnect,
        options: {
          infuraId
        }
      },
      // torus: {
      //   package: Torus
      // },
      // walletlink: {
      //   package: WalletLink,
      //   options: {
      //     appName: "Web3Modal Example App",
      //     infuraId
      //   }
      // }
    };
    return providerOptions;
  };


}
