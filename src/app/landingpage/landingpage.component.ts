import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})


export class LandingpageComponent implements OnInit {

  imagesList = [];
  constructor() { 
    for (let i = 0; i < 1; i++) {
    const url = '../../assets/images/ByQ2vr.jpg?random=' + (i +1);
    this.imagesList[i] = {
      url: url,
      show: false
  };
}
}
isActive = false; 


  ngOnInit() {
    
  }

}
