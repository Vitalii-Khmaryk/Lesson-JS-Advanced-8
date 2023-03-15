import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public drop = false;
  public isTrue = false;
public isFalse=false;
  dropdawn() {
    this.isTrue = !this.isTrue;
    this.isFalse=!this.isFalse;
  }
  closer() {
    this.isTrue = false;
    setTimeout(()=>{
      this.isFalse=false;
    },10)
  }
}
