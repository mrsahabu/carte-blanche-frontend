import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoadingController,NavController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
public show:boolean = false;
public url = 'http://127.0.0.1:8000/api/register';
 public user = {name: '',
	    		password:'',
	    		 password_confirmation:'',
	    		email:'',
				user_type:''};
  constructor( private loader: LoadingController,
  	private httpClient: HttpClient,
  	private navCtrl: NavController) { }

  ngOnInit() {
  }

 async presentLoading() {
        const loading = await this.loader.create({
            message: 'it will take some time....',
        });
        await loading.present();

    }

register(form){
var user = new FormData();	
console.log(JSON.stringify(form.value));

user.append('name',form.value.lname)
user.append('password',form.value.password)
user.append('email',form.value.email)
user.append('user_type',this.user.user_type = this.show?'doctor':'patient')
var data = JSON.stringify(user);
  console.log('data' + data);
 this.presentLoading();
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return new Promise(resolve => {
            this.httpClient.post<any>(this.url,
                user, {headers}).subscribe(data => {
                this.loader.dismiss();
                this.navCtrl.navigateForward(['./login'])

            }, error => {
                  debugger
                this.loader.dismiss();
                
            });
        });


}

showDocform(){
		this.show = !this.show;
	
}



}
