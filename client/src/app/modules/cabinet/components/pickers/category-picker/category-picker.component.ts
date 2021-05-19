import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {FormControl, NgForm} from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category/category.service';
import { MessageService } from 'src/app/services/message-service/message.service';
@Component({
  selector: 'app-category-picker',
  templateUrl: './category-picker.component.html',
  styleUrls: ['./category-picker.component.css']
})
export class CategoryPickerComponent implements OnInit {

  @Input() oldCategories: string;
  @Output() changeCategories: EventEmitter<string> = new EventEmitter();

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  radius = 15.91549430918954;

  spheresOfLifeRu = [
    'Семья / Друзья',
    'Отношения / Любовь',
    'Карьера / Учеба',
    'Благосостояние / Финансы',
    'Здоровье / Спорт',
    'Духовность / Личное время',
    'Отдых / Хобби',
    'Уборка / Готовка'];

  spheresOfLifeEn = [
    'Family / Friends',
    'Relationships / Love',
    'Career / Study',
    'Wealth / Finance',
    'Health / Fitness',
    'Spiritual / Self-time',
    'Hobbies / Recreation',
    'Chores / Cleaning'];

  selectable = true;
  removable = true;
  ownCategories: Category[];

  categories: Array<string> = [];

  constructor(private categoryService: CategoryService,
              private messageService: MessageService) {}

  ngOnInit(): void {
    this.categories = (this.oldCategories) ? this.oldCategories.split(',') : [];
    this.categoryService.fetch().subscribe(categories => this.ownCategories = categories);
  }

  saveToCategories(event: any, category: string): void {

    const isExist = this.categories.includes(category);

    if (event && !isExist) {
      this.categories.push(category);
      this.changeCategories.emit(this.categories.join());
    } else if (!event && isExist) {
      const pos = this.categories.indexOf(category);
      this.categories.splice(pos, 1);
      this.changeCategories.emit(this.categories.join());
    }
  }

  submit(form: NgForm): void {

    const newCategory: Category = {name: form.value.name};
    this.categoryService.create(newCategory).subscribe(
      () => {
        this.messageService.showMessage('The category was created successfully', 'Success');
        this.ownCategories.push({name: form.value.name});
        form.reset();
      },
      (error) => {
        this.messageService.showError(error.error.message, 'Uuups! Error.');
      }
    );
  }

  isExist(category: string): boolean {
    return this.categories.includes(category);
  }

  onAddCategory(category: string): void {
    const isExist = this.categories.includes(category);

    if (!isExist) {
      this.categories.push(category);
      this.changeCategories.emit(this.categories.join());
    } else {
      const pos = this.categories.indexOf(category);
      this.categories.splice(pos, 1);
      this.changeCategories.emit(this.categories.join());
    }
  }

  remove(category: string): void {
    const index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }
}
