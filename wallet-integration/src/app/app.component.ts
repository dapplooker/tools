import { Component,OnInit } from '@angular/core';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wallet-integration';
  connector: any;
  details: any = {
    accounts: String,
    chainId: String
  };
  constructor() {
    this.connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });
 
  }

  connect = () => {
    if (!this.connector.connected) {
      // create new session
      this.connector.createSession();
    }
    console.log(this.connector)
    this.connector.on("connect", (error:any, payload:any) => {
      if (error) {
        throw error;
      }
      // Get provided accounts and chainId
      this.details = payload.params[0];
      console.log(this.details);
    });
  }

  disconnect = () => {
    this.connector.on("disconnect", (error:any, payload:any) => {
      if (error) {
        throw error;
      }
    });

    this.connector.killSession();

  }
}

