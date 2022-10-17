import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { IFlash } from './flash.model';
import { FlashService } from './flash.service';

function getRandomNumber() {
  return Math.floor(Math.random() * 10000);
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'ng-flashcards';
  editing =false;
  editingId : number = 0;
  flash : any ={
    question:'',
    answer:''
  }
  data: any ={
    id: 0,
    flag: 'correct'
  }
  flash$!: Observable<IFlash[]>;
  flashs;
  subscription: any;
  constructor (private flashservice: FlashService){
    this.flashs = this.flashservice.flashs;
  }
  ngOnInit(){
    this.flash$ = this.flashservice.flashs$
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  @ViewChild('flashForm',{static: false}) flashForm!: NgForm;
  trackbyFlashId(index : any, flash: any){
    return flash.id;
  }
  handleSubmit(): void{
    this.flashservice.addFlash(this.flash);
    this.handleClear();
  }
  handleClear(){
    this.flash = {
      question:'',
      answer:''
    };
    this.flashForm.reset();
  }
  handleToggleCard(id: number){
    this.flashservice.toggleFlash(id);
  }
  handleDelete(id:number){
    //const flash = this.flashs.find(flash => flash.id === id);
    const flashId = this.flashs.findIndex(flash => flash.id === id);
    this.flashs.splice(flashId, 1);
    console.log(id);
  }
  handleEdit(id:number): void{
    this.editing=true;
    this.editingId = id;
    const flash = this.flashs.find(flash => flash.id === id);
    this.flash.question= flash?.question;
    this.flash.answer = flash?.answer;
  }
  handleRememberedChanges(data : any){
    this.flashservice.rememberedChange(data);
  }
  handleUpdate(){
    this.flashservice.updateFlash(this.editingId,this.flash);
    this.handleCancel();
  }
  handleCancel(){
    this.editing=false;
    this.editingId = 0;
    this.handleClear();
  }
}
