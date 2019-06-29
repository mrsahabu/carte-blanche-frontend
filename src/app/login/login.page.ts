import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 public loginData = {email: '', password: ''};
 public  userNotFound: string;
  constructor(private navCtrl: NavController,
  	private loader: LoadingController,
  	private httpClient: HttpClient) { }

  ngOnInit() {
  }

    async presentLoading() {
        const loading = await this.loader.create({
            message: 'Authenticating...',
        });
        await loading.present();

    }

  login(){
  	 this.presentLoading();
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return new Promise(resolve => {
            this.httpClient.post('http://127.0.0.1:8000/login',
                this.loginData, {headers}).subscribe(data => {
                  debugger
                this.loader.dismiss();
                this.navCtrl.navigateForward(['./dashboard'])

            }, error => {
                  debugger
                this.loader.dismiss();
                this.userNotFound = error.toString();
            });
        });
    
  }

  registration(){
  	
  	this.navCtrl.navigateForward(['./register'])
  }
}
