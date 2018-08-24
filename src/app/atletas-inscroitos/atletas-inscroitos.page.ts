import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atletas-inscroitos',
  templateUrl: './atletas-inscroitos.page.html',
  styleUrls: ['./atletas-inscroitos.page.scss'],
})
export class AtletasInscroitosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public changeTabOne() {
    console.log("Click One");
  }
  public changeTabTwo() {
    console.log("Click Two");
  }
  public changeTabTree() {
    console.log("Click Tree");
  }
}
