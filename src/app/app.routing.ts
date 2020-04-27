import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BoardComponent} from './board/board.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'board/:id', component: BoardComponent},

  {path: '**', component: HomeComponent}
];

export const Router = RouterModule
  .forRoot(appRoutes);
