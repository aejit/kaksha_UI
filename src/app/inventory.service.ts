import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProdinvnt } from './prodinvnt';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private _url: string = "http://localhost:3000/data";
  // private _url: string = 'assets/data/product.json';
  public INIT_DATA = [];
  constructor(private http: HttpClient) { }

  public Productdata = new BehaviorSubject(this.INIT_DATA);
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };



  getproducts(){
    return this.http.get<IProdinvnt[]>(this._url) // ; use semi colon to end the execution here 
                // .map(res => res.json);   //to convert the json into usable format
                .subscribe(data => {
                  this.INIT_DATA = data;
                  this.Productdata.next(data);  
    },
    error => {
      alert(error.message);
    }

    );
  }

 
  addproducts(hero:IProdinvnt ){
    this.httpOptions.headers =
    this.httpOptions.headers.set('Authorization', 'my-new-auth-token');
    let updata = JSON.stringify(hero);
    return this.http.post<IProdinvnt[]>(this._url,updata,this.httpOptions).subscribe(
          (data) =>{ 
          this.INIT_DATA.unshift(data);
          this.Productdata.next(this.INIT_DATA);
          },
          error => {
            alert(error.message);
          });
    
    // .subscribe(
      
    // );
  }

  modifyproducts(hero:IProdinvnt): Observable<void> {
    return this.http.put<void>(`${this._url}/${hero.id}`,hero,this.httpOptions).pipe(
      tap((data: any) => {
            this.INIT_DATA.forEach((ele,i)=>{ 
             if (this.INIT_DATA[i].id == data.id){
              this.INIT_DATA[i] = data;
              console.log(this.INIT_DATA[i]);
          }
        });
        this.Productdata.next(this.INIT_DATA);
      console.log(`id of updated item=${hero.id}`)
    }));
    }
    errorHandler(error : HttpErrorResponse){
    return throwError(error.message || "server error");
  }
}
