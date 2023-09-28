import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../localstorage.service';
import { Observable, Subscription, interval, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class APIComponent implements OnInit,OnDestroy {
  localStorageService: any;
  intervalSubscription: Subscription = new Subscription;
  routeSubscription: Subscription = new Subscription;
       
  constructor(private http:HttpClient,private local:LocalStorageService,private route:ActivatedRoute)
  {}
   
  ngOnInit()
  {
    const values = of(1,2,3);

    const myObserver = {
      next: (x: number) => console.log('Observer got a next value: ' + x),
      error: (err: Error) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
    
    // Execute with the observer object
    values.subscribe(myObserver);

    this.getData();
    this.getClimate();
    this.getPollution();

   this.routeSubscription = this.route.data.subscribe(
    (data: any) =>
    {
      console.log("This is observable example");
      console.log(data);
    }
   ) // memory usage is done more becoz it gets printed always in the console without stopping 
  }
  ngOnDestroy()
  {
      this.intervalSubscription.unsubscribe(); //this is done when we move into another 
      this.routeSubscription.unsubscribe(); //component it will stop from printing the count value
  }
  
  datas:any;
  climate:any;
  air:any;
  showClimate:boolean=false;
  showData:boolean=false;
  showAir:boolean=false;

  clearClimateData() {
    this.localStorageService.remove('climateData');
    this.climate = null;
  }

  public getData()
  {
    return this.http.get<any>("https://jsonplaceholder.typicode.com/posts").
    subscribe(
      (data) => {
        console.log("Response is received");
        console.log(data[0].title);              //to get only 1st data title
        //this.datas=data;                       //to get all the data
        this.datas = data.slice(0,3).map((d: { title: any; }) => (d.title));   // to get specific data only
      },
      (error) =>
      {
        console.log("Something happend",error);
      }
    );
  }

  public getClimate()
  {
      return this.http.get<any>("https://api.openweathermap.org/data/2.5/weather?lat=12.91&lon=77.63&appid=7f866dc3dfd5c2eb46ab4957227b2fe5").
      subscribe(
        (climateData) => {
            console.log("Response got for Climate data");
            this.climate = climateData;
            console.log(climateData);

            //this.localStorageService.set('climateData', climateData);
        },
        (error) => {
          console.log("NO data",error);
        }
      );
  }

  public getPollution()
  {
      return this.http.get<any>("https://api.openweathermap.org/data/2.5/air_pollution?lat=12.91&lon=77.63&appid=7f866dc3dfd5c2eb46ab4957227b2fe5").
      subscribe
      (
        (airData) => {
            console.log("Response got for Air pollution data");
            this.air = airData;
            console.log(airData);
        },
        (error) => {
          console.log("NO data",error);
        }
      );
  }
  toDisplayClimate()
  {
    this.showClimate = !this.showClimate;
  }
  toDisplayData()
  {
     this.showData = !this.showData;
  }
  toDisplayAir()
  {
     this.showAir = !this.showAir;
  }
}
