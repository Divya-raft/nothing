import { Injectable, OnInit } from '@angular/core';
import { Observable, Subscription, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomObservableService {

  constructor() { }
  private intervalSubscription: Subscription = new Subscription;
  createObservable()
  {
    let ownObservable = Observable.create((observer: {
      complete: any;
      error: any; next: (arg0: number) => void; }) =>{
      let count =0;
        const changeInterval = setInterval(() => {
          observer.next(count);
          if(count > 5)   //but here we are explicitly providing error to it
          {
             //observer.error("Greater than 10");  //to stop the function we can give complete()
             observer.complete();
          }
          count++;
  
          if(count==20)              //used to stop the interval by applying condition
          {
            clearInterval(changeInterval);
          }
          
          return () =>
          {
              clearInterval(changeInterval);
          };
  
        },1000);
    });
    this.intervalSubscription = ownObservable.pipe(filter((data: number) => data %2 ==0),
    map((data:number) =>
    {  //if we need to manipulate anything u need to use in pipe
      return 'count is '+ data;
    }))
    .subscribe((data: any) => {
      console.log(data);
    },(error: any) =>
    {
      console.log("Catched the error",error);  //here the error is displayed in normal format
    }
    // ()=>
    // {
    //   console.log("completed");
    // }
    )
  }
  unsubscribeFrom()
  {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe(); //this is done when we move into another 
       //component it will stop from printing the count value
      }
  }

 

}
