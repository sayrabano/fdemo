import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Cuisine } from './cuisine';
import { Http, RequestOptions , Headers } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class CuisineService {

    baseUrl : String = '';
    cuisineList : Cuisine[];
    cart : Cuisine[] = [];


    constructor(private _httpClient: HttpClient, private http: Http, private router : Router) { }

    title: string = "Cuisine Management System";

    getMessage(): string {
        return "Cuisine List";
    }

    getAllCuisines(): Observable<any> {

        // return this._httpClient.get<Cuisine[]>("http://localhost:3002/cuisines");
        let url = "http://localhost:9090/product";//this.baseUrl + "getAdminData/" + adminId;

        // create an instance of Header object.
       let headers = new Headers();
 
       // get token from localStorage.
       let token = localStorage.getItem('token');

    //    let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYXZhaW51c2UiLCJleHAiOjE2MjE5NzQ1NjEsImlhdCI6MTYyMTk1NjU2MX0.FXRVeXEjJF7ReeGYcKlQvP_U_8hCwyviL_VryIQdWGRHVJi1-o3_cPSILqMV-f2xQ2ZiFr2UsPJqUrSQO75e8g";//localStorage.getItem('token');
 
       // Append Authorization header.
       headers.append('Authorization' , 'Bearer ' + token);
 
       // create object of RequestOptions[ and include that in it.
       let options = new RequestOptions( { headers : headers } );
 
       return this.http.get(url , options);



    }

   

    getCuisineById(id: number) : Observable<Cuisine> {
        return this._httpClient.get<Cuisine>("http://localhost:9090/product/" + id);
    }

    getCuisineList(){
        return this.cuisineList;
    }

    saveProductDetails(cuisine : Cuisine) : Observable<any>
    {
        
        
        let url = "http://localhost:9090/product";//this.baseUrl + "getAdminData/" + adminId;

        // create an instance of Header object.
       let headers = new Headers();
 
       // get token from localStorage.
       let token = localStorage.getItem('token');

    //    let token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYXZhaW51c2UiLCJleHAiOjE2MjE5NzQ1NjEsImlhdCI6MTYyMTk1NjU2MX0.FXRVeXEjJF7ReeGYcKlQvP_U_8hCwyviL_VryIQdWGRHVJi1-o3_cPSILqMV-f2xQ2ZiFr2UsPJqUrSQO75e8g";//localStorage.getItem('token');
 
       // Append Authorization header.
       headers.append('Authorization' , 'Bearer ' + token);
 
       // create object of RequestOptions and include that in it.
       let options = new RequestOptions( { headers : headers } );
 
       return this.http.post(url , cuisine, options);


        // //let url = this.baseUrl + "saveAdmin";
        // return this.http.post("http://localhost:9090/product", cuisine);
    }

    deletProductById(id : number) : Observable<any>
    {
        //let url = this.baseUrl + "saveAdmin";
        return this._httpClient.delete("http://localhost:9090/product/" + id);
        //sssreturn this.getAllCuisines();
    }

    
    getSelectedItems(){
        
        for(let cuisine of this.cuisineList){
            if(cuisine.quantity>0){
                if(!this.cart.includes(cuisine)){
                    this.cart.push(cuisine);
                }
            }
        }
        
        return this.cart;
    }

    getCart(){
        return this.cart;
    }
}