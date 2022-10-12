import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFlash } from '../flash.model';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.css']
})
export class FlashComponent implements OnInit {
  @Input() flash: IFlash={
    id:1,
    question:'React to Angular',
    answer:'No Reaction :)',
    show:false
  }
  @Output() onToggleCard = new EventEmitter();
  toggleCard(){
    this.onToggleCard.emit(this.flash.id);
  }

  @Output() onRememberedChanges = new EventEmitter();
  markCorrect(){
    this.onRememberedChanges.emit({
      id:this.flash.id,
      flag:'correct'});
  }


  markIncorrect(){
    this.onRememberedChanges.emit({
      id:this.flash.id,
      flag:'incorrect'});
  }
  @Output() onEditFlash = new EventEmitter();
  editFlash(){
    this.onEditFlash.emit(this.flash.id);
  }
  @Output() onDeleteFlash = new EventEmitter();
  deleteFlash(){
    this.onDeleteFlash.emit(this.flash.id);
  }


  constructor() { }

  ngOnInit(): void {
  }

}
