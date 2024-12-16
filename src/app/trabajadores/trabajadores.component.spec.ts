import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrabajadoresComponent } from './trabajadores.component';
import { JsonService } from '../services/json.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('TrabajadoresComponent', () => {
  let component: TrabajadoresComponent;
  let fixture: ComponentFixture<TrabajadoresComponent>;
  let jsonServiceMock: jasmine.SpyObj<JsonService>;

  beforeEach(async () => {
    const mockJsonService = jasmine.createSpyObj('JsonService', ['getJsonData', 'actualizaTrabajadorOelimina', 'eliminarTodo']);

    await TestBed.configureTestingModule({
      imports: [TrabajadoresComponent, HttpClientModule, FormsModule], // Aquí se mueve a imports
      providers: [{ provide: JsonService, useValue: mockJsonService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TrabajadoresComponent);
    component = fixture.componentInstance;
    jsonServiceMock = TestBed.inject(JsonService) as jasmine.SpyObj<JsonService>;

     jsonServiceMock.getJsonData.and.returnValue(
      of([
        { id: 1, nombre: 'francsico', edad: 30, puesto: 'tecnico electrico', obra: 'codelco' },
        { id: 2, nombre: 'francsico', edad: 25, puesto: 'ingeniero electrico', obra: 'codelco' },
      ])
    );
    fixture.detectChanges();  
  });

  it('Crea el component de trabajadores simulado', () => {
    expect(component).toBeTruthy();
  });

  it('Eliminar trabajador segun ID de la', () => {
     jsonServiceMock.actualizaTrabajadorOelimina.and.returnValue(of(null));

     component.eliminarTrabajador(1);

     expect(jsonServiceMock.actualizaTrabajadorOelimina).toHaveBeenCalledWith([
      { id: 2, nombre: 'francsico', edad: 25, puesto: 'ingeniero electrico', obra: 'codelco' },
    ]);

     expect(component.trabajadores.length).toBe(1);
    expect(component.trabajadores[0].id).toBe(2);
  });
});