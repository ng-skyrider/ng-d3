import { Component,
                ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.Native /* add style in svg generato for d3 ... more info https://stackoverflow.com/questions/36214546/styles-in-component-for-d3-js-do-not-show-in-angular-2 */
})
export class AppComponent {
  porcentaje: number = 35;
  size: number = 200;
  color: string = "F50057";
  color2: string = "1DE9B6";

  constructor(){  }

  changeValue(){
    let newValor = Math.floor(Math.random() *100);
    this.porcentaje = newValor;
    console.log(""+this.porcentaje)
  }

}
