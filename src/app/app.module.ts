import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ComponentsComponent } from './components/components.component';
import { LinkComponent } from './link/link.component';
import { SingleItemComponent } from './single-item/single-item.component';
import { TitleComponent } from './title/title.component';
import { DescriptionComponent } from './description/description.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { TypesComponent } from './types/types.component';
import { SettingsComponent } from './settings/settings.component';
import { I18nComponent } from './i18n/i18n.component';


@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ComponentsComponent,
    LinkComponent,
    SingleItemComponent,
    TitleComponent,
    DescriptionComponent,
    SlideshowComponent,
    TypesComponent,
    SettingsComponent,
    I18nComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
