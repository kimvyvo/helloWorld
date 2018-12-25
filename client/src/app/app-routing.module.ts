import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TextComponent } from './text/text.component';
import { DrawComponent } from './draw/draw.component';
import { ErrorComponent } from './error/error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'dashboard/:id', component: DashboardComponent, children: [
    { path: 'text', component: TextComponent },
    { path: 'draw', component: DrawComponent },
    { path: 'welcome', component: WelcomeComponent },
  ] },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

