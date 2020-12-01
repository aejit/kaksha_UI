import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginpageComponent } from './loginpage/loginpage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { InventlistComponent } from './inventlist/inventlist.component';
import { EditlistComponent } from './editlist/editlist.component';
import { GraphsComponent } from './graphs/graphs.component';
import { LandingpageComponent } from './landingpage/landingpage.component';


const routes: Routes = [{path:'', redirectTo: '/landingpage', pathMatch:'full'},
                        {path: 'landingpage', component:LandingpageComponent},
                        // {path:'loginpage', component:LoginpageComponent},
                        {path:'homepage',component:HomepageComponent},
                        {path:'invntlist', component:InventlistComponent},
                        {path:'editlist',component:EditlistComponent},
                        {path:'graph',component:GraphsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
