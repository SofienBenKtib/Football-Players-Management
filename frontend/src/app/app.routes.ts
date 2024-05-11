import { Routes } from '@angular/router';
import { IndexComponent } from './player/index/index.component';
import { ViewComponent } from './player/view/view.component';
import { CreateComponent } from './player/create/create.component';
import { EditComponent } from './player/edit/edit.component';

export const routes: Routes = [
  { path: 'player', redirectTo: 'player/index', pathMatch: 'full' },
  { path: 'player/index', component: IndexComponent },
  { path: 'player/create', component: CreateComponent },
  { path: 'player/:playerId/view', component: ViewComponent },
  { path: 'player/:playerId/edit', component: EditComponent },
];
