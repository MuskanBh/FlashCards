import { Component } from '@angular/core';
import { IFlash } from './flash.model';


function getRandomNumber() {
  return Math.floor(Math.random() * 10000);
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-flashcards';
  editing =false;
  editingId : number = 0;
  data: any ={
    id: 0,
    flag: 'correct'
  }
  flashs: IFlash[] =[{
    question:'Question 1',
    answer:'Answer 1',
    show: false,
    id: getRandomNumber(),
  },{
    question:'Question 2',
    answer:'Answer 2',
    show: false,
    id: getRandomNumber(),
  },{
    question:'Question 3',
    answer:'Answer 3',
    show: false,
    id: getRandomNumber(),
  }];
  trackbyFlashId(index : any, flash: any){
    return flash.id;
  }
  handleToggleCard(id: number){
    const flash = this.flashs.find(flash => flash.id === id);
    flash!.show= !flash?.show;
  }
  handleDelete(id:number){
    //const flash = this.flashs.find(flash => flash.id === id);
    const flashId = this.flashs.findIndex(flash => flash.id === id);
    this.flashs.splice(flashId, 1);
    console.log(id);
  }
  handleEdit(id:number){
    this.editing=true;
    this.editingId = id;
  }
  handleRememberedChanges(data : any){
    const flash = this.flashs.find(flash => flash.id === data.id);
    flash!.remembered = data.flag;
  }
}
