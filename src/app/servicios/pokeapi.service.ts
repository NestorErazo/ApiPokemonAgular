import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  urlApi='https://pokeapi.co/api/v2/pokemon/'

  constructor(private http: HttpClient) { }


  obtenerListadoPokemones(limit: number = 100): Observable<any> {
    return this.http.get(`${this.urlApi}?limit=${limit}`);
  }
  
  obtenerUnPokemon(url: string): Observable<any> {
    return this.http.get(url);
  }
  
  obtenerHabilidadesPokemon(url: string): Observable<any> {
    return this.http.get(url);
  }
  
  obtenerMovimientosPokemon(url: string): Observable<any> {
    return this.http.get(url);
  }

}
export class ListaModule {}

