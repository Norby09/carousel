import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { SlideComponent } from './slide/slide.component';
import { SlideActionComponent } from './slide-action/slide-action.component';
import { ItemComponent } from './item/item.component';
import { ComponentsComponent } from './components/components.component';
import { LinkComponent } from './link/link.component';
import { SingleItemComponent } from './single-item/single-item.component';
import { TitleComponent } from './title/title.component';
import { DescriptionComponent } from './description/description.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { TypesComponent } from './types/types.component';
import { SettingsComponent } from './settings/settings.component';



@NgModule({
  declarations: [
    AppComponent,
    SlideComponent,
    SlideActionComponent,
    ItemComponent,
    ComponentsComponent,
    LinkComponent,
    SingleItemComponent,
    TitleComponent,
    DescriptionComponent,
    SlideshowComponent,
    TypesComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
