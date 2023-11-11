import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

interface CarpetaNode {
  nombre: string;
  raiz: string;
  creador: string;
  deleted: boolean;
  children?: CarpetaNode[];
  documentos?: Documento[];
}

interface Documento {
  nombre: string;
  tipo: string;
  raiz: string;
  contenido: string;
  creador: string;
  deleted: boolean;
}

interface FlatNode {
  expandable: boolean;
  name: string;
  type: string;
  level: number;
}

@Component({
  selector: 'tree-flat-overview-example',
  templateUrl: 'tree-flat-overview-example.html',
  // styleUrls: ['tree-flat-overview-example.css'],
})
export class TreeFlatOverviewExample {
  private _transformer = (node: CarpetaNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.nombre,
      type: 'folder',
      level: level,
    };
  }

  treeControl = new FlatTreeControl<FlatNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    const carpeta: CarpetaNode = {
      nombre: 'My Cloud',
      raiz: 'raiz1',
      creador: 'usuario1',
      deleted: false,
      children: [
        {
          nombre: 'Documents',
          raiz: 'raiz1',
          creador: 'usuario1',
          deleted: false,
          children: [
            { nombre: 'Resume.txt', raiz: 'raiz1', creador: 'usuario1', deleted: false },
            { nombre: 'Portfolio.html', raiz: 'raiz1', creador: 'usuario1', deleted: false }
          ]
        },
        {
          nombre: 'Photos',
          raiz: 'raiz1',
          creador: 'usuario1',
          deleted: false,
          children: [
            { nombre: 'Vacation.jpg', raiz: 'raiz1', creador: 'usuario1', deleted: false },
            { nombre: 'Family.png', raiz: 'raiz1', creador: 'usuario1', deleted: false }
          ]
        }
      ]
    };

    this.dataSource.data = [carpeta];
  }

  

  hasChild = (_: number, node: FlatNode) => node.expandable;

  onNodeClick(node: CarpetaNode){
    console.log(node.nombre);
  }
     
}
