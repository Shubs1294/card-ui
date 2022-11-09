import { Component, OnInit } from '@angular/core';
import { Card } from 'src/models/card.model';
import { CardsService } from './service/cards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cards';
  cards:Card[]=[];
  card:Card={
    id:'',
    cardholderName:'',
    cardNumber:'',
    expiryMonth:'',
    expiryYear:'',
    cvc:'',
  }
  constructor(private cardservice:CardsService){

  }
  ngOnInit(): void {
   this.getAllCards();
  }
  getAllCards(){
    this.cardservice.getAllCards()
    .subscribe(
      response=>{
        this.cards=response;
      }
    );
  }
  onSubmit(){
    if(this.card.id ===''){
      this.cardservice.addCard(this.card)
      .subscribe(
         Response=>{
       this.getAllCards();
       this.card={
         id:'',
         cardholderName:'',
         cardNumber:'',
         expiryMonth:'',
         expiryYear:'',
         cvc:'',
       }
         }
       ); 
    }else{
      this.updateCard(this.card);
    }
   
    
  }
 
  // updateCard(card: Card) {
  //   throw new Error('Method not implemented.');
  // }
  deleteCard(id:string){
    this.cardservice.deleteCard(id)
    .subscribe(
      Response=>{
        this.getAllCards();
      }
    )
  }
  populateForm(card:Card){
    this.card=card;
  }
  updateCard(card:Card){
    this.cardservice.updateCard(card)
    .subscribe(
      Response=>{
        this.getAllCards();
      }
    )
  }
}
