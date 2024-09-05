import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  urlApi='https://pokeapi.co/api/v2/pokemon/'
  
 constructor(private http: HttpClient) { }

 obtenerListadoPokemones(url: any){
  
  return this.http.get(this.urlApi);
  
  }

  // Método para obtener detalles de un Pokémon específico usando la URL
obtenerDetallePokemon(url: string) {
  return this.http.get(url);
}
}
