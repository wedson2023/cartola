import { MensagemProvider } from './../../providers/mensagem/mensagem';
import { HttpProvider } from './../../providers/http/http';
import { Component, OnInit } from '@angular/core';
import { IonicPage, LoadingController, ViewController } from 'ionic-angular';
declare var $ :any;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{

  public usuario = {
    payload : {
      email : null,
      password : null,
      serviceId : 438
    }
  }

  constructor(
    private http: HttpProvider,
    private Mensagem: MensagemProvider,
    private loadingCtrl: LoadingController,
    private ViewController:ViewController
  ) {
    
  }

  login(){
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present();

    this.http.getApiPost('api/authentication', this.usuario).subscribe(response => {
      let resposta = JSON.parse(JSON.stringify(response));
      if(resposta.glbId)
      {
        localStorage.setItem('token', resposta.glbId);
        localStorage.setItem('token_meu_time', resposta.glbId);
        this.Mensagem.mensagem('Sucesso', resposta.userMessage);
      }
      this.ViewController.dismiss(resposta.glbId);
      loading.dismiss();
    }, err => {
      loading.dismiss();
      this.Mensagem.mensagem('Algo deu errado', 'Senha ou login incorretos, ou Verifique sua conexão com a internet!');
    })
  }

  ngOnInit(){
    let loading = this.loadingCtrl.create({ content: 'Por favor aguarde...' });
    loading.present(); 

    $('iframe').load(function(){ 
      
      $(this).contents().find('button').on('click', function(){
        alert('entrou');
      });
      
      loading.dismiss();
      $(this).show();      
    })
  }

}
