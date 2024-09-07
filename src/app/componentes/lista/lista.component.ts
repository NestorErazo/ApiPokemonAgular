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
obtenerHabilidadesPokemon: any;
obtenerMovimientos: any;
movesDetails: any;
moves: any;
  constructor(private pokeApi: PokeapiService) { }
  
  ngOnInit(): void {
    // Llama al servicio para obtener la lista de Pokémon
    this.pokeApi.obtenerListadoPokemones().subscribe((response: any) => {
      const urls = response.results.map((poke: any) => poke.url);
      urls.forEach((url: string) => {
        this.pokeApi.obtenerHabilidadesPokemon(url).subscribe((pokemonDetails: any) => {
          this.pokeApi.obtenerMovimientosPokemon(url).subscribe((movesDetails: any) => {
            pokemonDetails.moves = movesDetails.moves;
            this.pokemonesCompleto.push(pokemonDetails);
          });
        });
      });
    });
  }

  onCardClick(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const cards = document.querySelectorAll('.example-card');

    cards.forEach(card => card.classList.remove('clicked'));
    card.classList.add('clicked');
  }


  trackById(index: number, item: any): number {
    return item.id;
  }

  trackByMove(index: number, move: any): string {
    return move.move.name;
  }

  nextPage(nextUrl: string): void {}

  playSound(url: string) {
    const audio = new Audio(url);
    audio.play();
  }
  
}
