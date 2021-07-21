import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStateOfWeek]'
})
export class StateOfWeekDirective implements OnInit {

  @Input('appStateOfWeek') state: string;

  constructor(private el: ElementRef, private r: Renderer2) { }

  ngOnInit(): void {
    this.setClass();
  }

  private setClass(): void {

    let className = (this.state === 'current') ? 'current ' :
                    (this.state === 'future') ? 'future ' :
                      (this.state === 'good') ? 'good ' :
                      (this.state === 'normal') ? 'normal ' :
                      (this.state === 'bad') ? 'bad ' : '';

    className += this.el.nativeElement.getAttribute('class');

    this.r.setAttribute(this.el.nativeElement, 'class', className);
  }

}
