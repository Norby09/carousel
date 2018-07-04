import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListComponent } from './itemList.component';

import { Item } from 'data/item';
import { Slideshow } from 'data/slideshow';
import { Type } from 'data/type';
import { Settings } from 'data/settings';
import { Language } from 'data/language';
import { Resource } from 'data/resource';
import { SettingsComponent } from '../settings/settings.component';
import { TypesComponent } from '../types/types.component';
import { SlideshowComponent } from '../slideshow/slideshow.component';
import { I18nComponent } from '../i18n/i18n.component';
import { ItemComponent } from '../item/item.component';

import { FormsModule } from '@angular/forms';
import { ComponentsComponent } from '../components/components.component';
import { TitleComponent } from '../title/title.component';
import { LinkComponent } from '../link/link.component';
import { DescriptionComponent } from '../description/description.component';
import { LanguagesService } from '../languages.service';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      providers: [ LanguagesService ],
      declarations: [ ItemListComponent,
                      SettingsComponent,
                      TypesComponent,
                      SlideshowComponent,
                      I18nComponent,
                      ItemComponent,
                      ComponentsComponent,
                      TitleComponent,
                      LinkComponent,
                      DescriptionComponent
                   ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should export data in json format', () => {


    // items: this.items, slideshow: this.slideshow, types: this.type, settings: this.setting, i18n: this.languageObj

    // var languages = [];
    // languages.push( Language.create({ name  : 'en', resources : new Array<Resource>( new Resource({name : '@title1', value : 'This is title1'}), new Resource({name : '@description1', value : 'This is description1'}))}) );
    // languages.push( Language.create({ name  : 'fr', resources : new Array<Resource>( new Resource({name : '@title2', value : 'This is title2'}), new Resource({name : '@description2', value : 'This is description2'}))}) );
    // component.languages = languages;

    // let items = [];
    // items.push(new Item({id : 1}));
    // items.push(new Item({id : 2}));
    // component.items = items;

    // let slideshow = [];
    // let types = [];
    // let setting = [];
    // let languageObj = Object;

    // component.slideshow = new Slideshow({});
    // component.type = new Type();
    // component.setting = new Settings();
    // component.languageObj = Object.create({});

    expect(component.export()).toEqual(JSON.stringify({"items":[{"components":{"links":[],"description":{"cssClass":"","style":"","text":""},"title":{"cssClass":"","style":"","text":""}},"id":1}],"slideshow":{"interval":100,"restart":100,"autoplay":0},"types":{"standard":1,"custom":2,"customTemplate":3},"settings":{"defaultTemplateUrl":"https://www.blackline.com/path/to/default-template.html","templateStyle":".custom-class { font-size: 24px; color: #2e7ac1; }","animation":"slide"},"i18n":{"":{"":""}}}));


  });
});
