import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon-template',
  templateUrl: './icon-template.component.html',
  styleUrls: ['./icon-template.component.css']
})
export class IconTemplateComponent implements OnInit {

  @Input() color: string;
  @Input() icon: string;

  constructor() { }

  ngOnInit(): void {
  }

}
