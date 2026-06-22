import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { RouterOutlet } from "@angular/router";
import { PanelMenu } from 'primeng/panelmenu';

@Component({
  selector: 'app-main-layout',
  imports: [MenuModule, RouterOutlet, PanelMenu],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit {
  items: MenuItem[] | undefined;


  ngOnInit(): void {
    this.items = [
      {
        label: 'Produtos',
        items: [
          {
            label: 'Lista de produtos',
            icon: 'pi pi-list'
          },
          {
            label: 'Cadastrar produto',
            icon: 'pi pi-plus-circle'
          }
        ]
      },
      {
        label: 'Catálogo',
        items: [
          {
            label: 'Visualizar catálogo',
            icon: 'pi pi-globe'
          }
        ]
      }
    ]
  }

}
