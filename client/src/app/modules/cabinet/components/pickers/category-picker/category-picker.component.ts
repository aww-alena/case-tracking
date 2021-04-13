import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';
@Component({
  selector: 'app-category-picker',
  templateUrl: './category-picker.component.html',
  styleUrls: ['./category-picker.component.css']
})
export class CategoryPickerComponent implements OnInit {

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
    'Отдых / Велье',
    'Хобби'];

  spheresOfLifeEn = [
    'Family / Friends',
    'Relationships / Love',
    'Career / Study',
    'Wealth / Finance',
    'Health / Fitness',
    'Spiritual / Self-time',
    'Fun / Recreation',
    'Hobbies'];

  selectable = true;
  removable = true;

  categories: Array<string> = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  chartClicked(e: any): void {
    console.log(e);
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
