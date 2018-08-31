import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
  })
};
const apiUrl = "localhost:8000/api/";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private http: HttpClient
  ) { 

  }

  getClassroom(): Observable<any> {
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  getAtletaById(id: string): Observable<any> {
    const url = `${apiUrl}atletas/${id}`;
  return this.http.get(url/*, httpOptions*/).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  postAtleta(data): Observable<any> {
    let api = 'nombres='+data.nombres+'&apellidos='+data.apellidos+'&dpi='+data.dpi+'&genero='+data.genero+'&telefono='+data.telefono+'&fecha_nacimiento='+data.fecha_nacimiento+'&email='+data.email+'&descripcion='+data.descripcion+'&id_categoria='+data.id_categoria+'&pais='+data.pais+'&direccion='+data.direccion;
    const url = `${apiUrl}Registro?${api}`;
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  updateClassroom(id: string, data): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  deleteAtleta(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCategorias(): Observable<any> {
    const url = `${apiUrl}categorias/`;
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  getCompeticion(): Observable<any> {
    const url = `${apiUrl}competicion/`;
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getAtletas(): Observable<any> {
    const url = `${apiUrl}atletas/`;
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
}
