import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Note } from 'src/app/interfaces/note';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-note-to-day',
  templateUrl: './note-to-day.component.html',
  styleUrls: ['./note-to-day.component.css']
})
export class NoteToDayComponent implements OnInit {

  @Input() schedule: FormControl;
  @Output() addNotes: EventEmitter<string> = new EventEmitter();

  dayEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  notesForDays: false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.schedule);
  }

  transferData(form: NgForm): void {
    const formData = JSON.stringify(form.form.value);
    this.addNotes.emit(formData);
  }

}
