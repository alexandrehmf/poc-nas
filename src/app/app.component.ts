import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  checkoutForm = this.formBuilder.group({
    'myFile': '',
  });
  img = '';

  constructor(private formBuilder: FormBuilder, private appService: AppService){}

  title = 'poc';

  onSubmit(): void {
    let file = document.querySelector('input')!.files![0];
    console.log(file);
    this.appService.uploadFile(file.name,file);
    //this.checkoutForm.reset();
  }

  async onClick(): Promise<void> {
    this.img = "data:image/png;base64," + await this.appService.downloadFile('k5.pngk5.png');
  }
}
