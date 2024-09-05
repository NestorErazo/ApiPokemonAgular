import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../../servicios/pokeapi.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [HttpClientModule,MatCardModule, MatButtonModule],
  providers: [PokeapiService],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent implements OnInit {
  listapokemones: any;
  pokemonesCompleto: any[] = []
  constructor(private pokeapi:PokeapiService){}
  
  ngOnInit(): void {
    this.pokeapi.obtenerListadoPokemones().subscribe({
        next: (data: any)=>{
          this.listapokemones = data;
          this.listapokemones.results.forEach( (element: any) => {
          this.pokeapi.obtenerListadoPokemones(element.url).subscribe({
            next: (data: any) => {
              this.pokemonesCompleto.push(data)
            console.log(this.pokemonesCompleto);  
          },
        })
        });
      console.log(this.listapokemones);
      console.log(this.pokemonesCompleto)
       },
         error: (error: any) => {console.log(error)}
        })
      }
      

nextPage(nextUrl: string): void { }

playSound(soundSource: string){
  const audio = new Audio();
  audio.src = soundSource;
  audio.load();
  audio.play();
    
    }
  }
  