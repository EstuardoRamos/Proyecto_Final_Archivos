import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Carpeta from '../../interfaces/carpeta.interface';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector: 'app-select-carpeta',
  templateUrl: './select-carpeta.component.html',
  styleUrls: ['./select-carpeta.component.css']
})
export class SelectCarpetaComponent {
  treeControl = new NestedTreeControl<Carpeta>(carpeta => carpeta.carpetas);
  dataSource = new MatTreeNestedDataSource<Carpeta>();

  // Simula una estructura de carpetas y documentos
  carpeta: Carpeta = {
    nombre: 'Carpeta Principal',
    raiz: 'raiz1',
    creador: 'usuario1',
    deleted: false,
    carpetas: [
      {
        nombre: 'Subcarpeta 1',
        raiz: 'raiz1',
        creador: 'usuario1',
        deleted: false,
        carpetas: [],  // Puedes agregar carpetas y documentos según sea necesario
        documentos: []
      }
    ],
    documentos: [
      {
        nombre: 'Documento 1',
        tipo: 'txt',
        raiz: 'raiz1',
        contenido: 'Contenido del documento 1',
        creador: 'usuario1',
        deleted: false
      }
    ]
  };

  constructor(
    public dialogRef: MatDialogRef<SelectCarpetaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.dataSource.data = this.carpeta.carpetas ?? [];
  }

  //hasChild = (_: number, carpeta: Carpeta) => !!carpeta.carpetas?.length || !!carpeta.documentos?.length;
  hasChild = (_: number, carpeta: Carpeta) => !!carpeta.carpetas?.length || !!carpeta.documentos?.length;

  crear() {
    // Lógica para crear una carpeta
  }

  cancelar() {
    // Lógica para cancelar
  }
}
