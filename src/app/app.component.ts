import { analyzeAndValidateNgModules } from '@angular/compiler';
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import { Component,Injectable } from '@angular/core';
declare let window: any;
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  web3: any;
  accounts: Array<String> = [];
  currentAccount: String = '';
  chainId: String = '';
  network: String = '';
  
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor() {
    this.loadweb3();
  }

  async loadweb3() {
    if (window.ethereum) {
      console.log('success');
    } else {
      window.alert('Non-ethereum browser detected');
    }
  }
  
  getAcc = async () => {
    this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    this.chainId = await window.ethereum.request({ method: 'eth_chainId' });
    console.log(this.accounts);
    this.currentAccount = this.accounts[0];
    if (this.chainId === '0x1') {
      this.network = 'Ethereum Main Network (Mainnet)';
    } else if (this.chainId === '0x3') {
      this.network = 'Ropsten Test Network';
    } else if (this.chainId === '0x4') {
      this.network = 'Rinkeby Test Network';
    } else if (this.chainId === '0x5') {
      this.network = 'Goerli Test Network';
    } else if (this.chainId === '0x2a') {
      this.network = 'Kovan Test Network';
    }
  }
}
