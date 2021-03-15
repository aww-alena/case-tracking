import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabinet-layout',
  templateUrl: './cabinet-layout.component.html',
  styleUrls: ['./cabinet-layout.component.css']
})
export class CabinetLayoutComponent implements OnInit {

  links = [
    {url: '/affairs', name: 'Affairs'},
    {url: '/affairs/create', name: 'Create affair'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
