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
  @Input() oldNotes: string;
  @Output() addNotes: EventEmitter<string> = new EventEmitter();

  dayEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  notesForDays = false;
  formData: {id: number; text: string}[];
  singleNote = '';

  constructor() { }

  ngOnInit(): void {
    if (this.oldNotes) {

      const isJson = this.isJsonString(this.oldNotes);
      const oldData = (isJson) ? JSON.parse(this.oldNotes) : this.oldNotes;

      if (oldData.note) {
        this.singleNote = oldData.note;
      } else {
        this.notesForDays = true;
        this.formData = oldData;
      }
    }
  }

  transferData(form: NgForm): void {
    const formData = JSON.stringify(form.form.value);
    this.addNotes.emit(formData);
  }

  isJsonString(value: string): boolean {
    try {
        JSON.parse(value);
    } catch (e) {
        return false;
    }
    return true;
}

}
