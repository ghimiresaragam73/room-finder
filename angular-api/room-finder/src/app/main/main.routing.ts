import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { pathToFileURL } from "url";
import { HomeComponent } from "./home/home.component";

const mainRoutes:Routes =[
    {
        path:'',
        component:HomeComponent
    }
]

@NgModule({
    imports:[RouterModule.forChild(mainRoutes)],
    exports:[RouterModule]
})

export class  MainRoutingModule{}