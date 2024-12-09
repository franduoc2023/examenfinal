import { Component, OnInit } from '@angular/core';
import { JsonService } from '../services/json.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';   
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trabajadores',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule],   
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent implements OnInit {
  trabajadores: { id: number; nombre: string; edad: number; puesto: string; obra: string }[] = [];

  nuevoTrabajador = {id: 0,nombre: '',edad: 0,puesto: '',obra: ''};


  constructor(private jsonService: JsonService) { }

  ngOnInit(): void {
    this.jsonService.getJsonData().subscribe(data => {
       this.trabajadores = data;
     });
  }


 

eliminarTrabajador(id: number): void {
   let trabajadoresActualizados = this.trabajadores.filter((trabajador) => trabajador.id !== id);

   this.jsonService.actualizaTrabajadorOelimina(trabajadoresActualizados).subscribe(
    () => {
       this.trabajadores = trabajadoresActualizados;
     },
  
  );
  }

  nuevoTrabajadorCrear(): void {
     let estasONo = this.trabajadores.findIndex(trabajador => trabajador.id === this.nuevoTrabajador.id);
  
    if (estasONo >= 0) {
       this.trabajadores[estasONo] = { ...this.nuevoTrabajador };
    } else {
       this.trabajadores.push({ ...this.nuevoTrabajador });
    }
  
   
     this.jsonService.actualizaTrabajadorOelimina(this.trabajadores).subscribe(
      () => {
          this.nuevoTrabajador = { id: 0, nombre: '', edad: 0, puesto: '', obra: '' };
      },
  
    );

}
eliminarTodo(): void {
  this.jsonService.eliminarTodo().subscribe(
    () => {
      this.trabajadores = []; 
     },
  
  );
}

}




