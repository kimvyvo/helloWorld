import { Component, AfterViewInit, ViewChild,  ElementRef, ViewEncapsulation } from '@angular/core';
import { HttpService } from '../http.service';
import { ShareService } from '../share.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import * as MyScriptJS from 'myscript';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements AfterViewInit {
  constructor(
    private _httpService: HttpService,
    private _shareService: ShareService,
    private _dashboard: DashboardComponent) { }
  @ViewChild('tref', {read: ElementRef}) domEditor: ElementRef;
  editor;
  ngAfterViewInit(): void {
     this.editor = MyScriptJS.register(this.domEditor.nativeElement, {
      recognitionParams: {
        type: 'TEXT',
        protocol: 'WEBSOCKET',
        apiVersion: 'V4',
        server: {
          scheme: 'https',
          host: 'webdemoapi.myscript.com',
          applicationKey: '4e867bfc-a2a3-4a31-92b4-4135141f65f9',
          hmacKey: 'fd7aa280-6cd1-48e0-915f-26c51638a11c',
        },
      },
    });
  }
  getExports() {
    const curr_time = new Date();
    const observable = this._httpService.getTranslation(this.editor.model.exports['text/plain'],
      'en', this._dashboard.lang_setting.lang_to);
    observable.subscribe(data => {

      const observable2 = this._httpService.getSingleSession(this._dashboard.selected_session);
      observable2.subscribe((data2: any) => {
        const new_trans = '<div class="mb-1"><small>' + this._shareService.my_user_name + ' (written)</small></div>' + '<div class="col m-0 p-2 bg-light border-rad">' + data['data']['translations'][0]['translatedText'] + '</div>' + '<div class="col text-right"><small>' + curr_time.toLocaleTimeString() + '</small></div>' + data2.data.trans_content
          
        const observable3 = this._httpService.editSession(this._dashboard.selected_session, {trans_content: new_trans});
        observable3.subscribe((data3: any) => {
          this._shareService.socket.emit('send_text');
        });
      })
    });
  }
}
