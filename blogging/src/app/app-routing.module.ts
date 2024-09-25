import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Task 1: Import components here
import { HomepageComponent } from  './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { ReadComponent } from './read/read.component';
import { CreateEditComponent } from './create-edit/create-edit.component';

const routes: Routes = [
  // Task 1: Add routes here
  {path:"blogs", component: HomepageComponent},
  {path:"", component: HomepageComponent},
  {path:"create", component: CreateEditComponent},
  {path:"adminlogin",component:AdminComponent},
  {path:"profile", component: ProfileComponent},
  {path:"read/:id", component: ReadComponent, },
  {path:"edit/:id", component: CreateEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
