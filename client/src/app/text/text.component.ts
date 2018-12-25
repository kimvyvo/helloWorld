import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../http.service';
import { ShareService } from '../share.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  input_message = '';
  current_session_id = '';
  constructor(
    private _httpService: HttpService,
    private _shareService: ShareService,
    private _route: ActivatedRoute,
    private _dashboard: DashboardComponent) { }

  ngOnInit() {
    this._route.parent.params.subscribe((params: Params) => {
      this.current_session_id = params.id;
      this._shareService.socket.emit('init_text');
      this._shareService.socket.on('receive_text', () => {
        this.updateChatBox();
      });
    });
  }
  sendText() {
    if (this.input_message.length > 0){
      const observable = this._httpService.getSingleSession(this.current_session_id);
      observable.subscribe((data: any) => {
        const curr_time = new Date();

        const new_msg = '<div class="mb-1 px-2 text-dark-blue"><i class="fas fa-user-circle"></i> ' + this._shareService.my_user_name + ' </div><div class="col m-0 px-4 py-2 bg-light-blue border-rad"> ' + this.input_message + '</div><div class="col m-0 px-4 pb-2 text-right text-dark-blue"><small>' + curr_time.toLocaleTimeString() + '</small></div>' + data.data.chat_content;
      
        const source_lang = this._dashboard.lang_setting.lang_spoken.split('-')[0];

        const observable2 = this._httpService.getTranslation(encodeURI(this.input_message), source_lang, this._dashboard.lang_setting.lang_to);
        observable2.subscribe(data2 => {
          const new_trans = '<div class="mb-1"><small>' + this._shareService.my_user_name + ' (chat)</small></div>' + '<div class="col m-0 p-2 bg-light border-rad">' + data2['data']['translations'][0]['translatedText'] + '</div>' + '<div class="col text-right"><small>' + curr_time.toLocaleTimeString() + '</small></div>' + data.data.trans_content 
          const observable3 = this._httpService.editSession(this.current_session_id, {chat_content: new_msg, trans_content: new_trans});
          observable3.subscribe((data3: any) => {
            this._shareService.socket.emit('send_text');
            this.input_message = '';
          });
        })
      });
    }
  }
  updateChatBox() {
    const observable = this._httpService.getSingleSession(this.current_session_id);
    observable.subscribe((data: any) => {
      document.getElementById('chat_box').innerHTML = data.data.chat_content;
    });
  }
}
