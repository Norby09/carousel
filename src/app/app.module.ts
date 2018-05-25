import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { SlideComponent } from './slide/slide.component';
import { SlideActionComponent } from './slide-action/slide-action.component';
import { CarouselElementComponent } from './carousel-element/carousel-element.component';
import { ComponentsComponent } from './components/components.component';
import { LinkComponent } from './link/link.component';


@NgModule({
  declarations: [
    AppComponent,
    SlideComponent,
    SlideActionComponent,
    CarouselElementComponent,
    ComponentsComponent,
    LinkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
