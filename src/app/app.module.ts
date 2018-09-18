import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { TableComponent } from './table/table.component';
import { AdduserComponent } from './adduser/adduser.component';
import { UserslistComponent } from './userslist/userslist.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: ':name/index', component: IndexComponent },
  { path: ':name/table', component: TableComponent },
  { path: ':name/table/edit/:id', component: TableComponent },
  { path: ':name/adduser', component: AdduserComponent },
  { path: ':name/userslist', component: UserslistComponent },
  { path: ':name/userslist/edit/:id', component: UserslistComponent },
];

@NgModule({
  declarations: [AppComponent, IndexComponent, TableComponent, LoginComponent, AdduserComponent, UserslistComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes,{ enableTracing: true }), HttpModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
