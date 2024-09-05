import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../../servicios/pokeapi.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [HttpClientModule, MatCardModule, MatButtonModule],
  providers:[PokeapiService],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent implements OnInit{
  listaPokemones: any;
  pokemonesCompleto : any []=[]
  constructor(private pokeApi: PokeapiService) { }
  
  ngOnInit(): void {
    this.pokeApi.obtenerListadoPokemones().subscribe({
      next: (data: any) => {

        this.listaPokemones = data;
        this.listaPokemones.results.forEach((element:any) => {
          this.pokeApi.obtenerUnPokemon(element.url).subscribe({
            next: (data: any) =>{
              this.pokemonesCompleto.push(data)
            },
          })
        });
        console.log(this.listaPokemones)
        console.log(this.pokemonesCompleto)
      },
      error:(err:any) => { console.log(err)}
   })
  }
  
  nextPage(nextUrl: string): void {}

playSound(soundSource: string){
const audio = new Audio();
audio.src = soundSource;
audio.load();
audio.play();
  }
  
}
