import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('goals',[
      transition('* => *',[
        query(':enter', style({opacity:0}), {optional: true}),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35%)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1})

          ]))
        ]), {optional: true}),
        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35%)', offset: .3}),
            style({opacity: 0, transform: 'translateY(-75%)', offset: 1})

          ]))
        ]), {optional: true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  itemCount: number = 4;
  btnText: string = "Add an Item 2"
  goalText: string = 'My first life goal'
  goals = ['My first life goal', 'I want to climb a mountain', 'Go ice skiing'];

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.goal.subscribe(res =>  this.goals = res)
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals)
  }

  addItem(){
    this.goals.push(this.goalText);
    this.goalText = "";
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals)

  }

  removeItem(index){
    var d = this.goals.splice(index, 1);
    this.goalText = d[0];
    this._data.changeGoal(this.goals)
  }
}
