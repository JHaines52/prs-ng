import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  backgroundImageURL = '/src/assets/images/home.png';
  constructor() { }

  ngOnInit(): void {

  
  }
}


