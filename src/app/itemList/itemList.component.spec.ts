import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListComponent } from './itemList.component';

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
import { Title } from 'data/title';
import { Description } from 'data/description';
import { Link } from 'data/link';

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

  describe('Export test', () => {

    it('should export default data in json format', () => {

      expect(component.export())
        .toEqual(JSON.stringify({"items":[{"components":{"links":[],"description":{"cssClass":"","style":"","text":""},"title":{"cssClass":"","style":"","text":""}},"id":1}],"slideshow":{"interval":100,"restart":100,"autoplay":0},"types":{"standard":1,"custom":2,"customTemplate":3},"settings":{"animation":"slide","defaultTemplateUrl":"","templateStyle":""},"i18n":{"":{"":""}}}));
    });

    it('should export given data in json format', () => {

      
      component.items[0].components.description = Description.create({cssClass: "form-control" , style: "inline" , text: "@description1" });
      component.items[0].components.title = Title.create( {cssClass: "form-group", style: "inline-block", text: "@title1"});
      component.items[0].components.links.push(Link.create({ cssClass: "pull-right", style: "block", text: "@link1", tooltip: " ", url: " "}));

      component.slideshow = new Slideshow({});
      component.type = new Type({});
      component.setting = new Settings({});

      component.languages.push( Language.create({ name  : '', resources : new Array<Resource>( new Resource({name : '', value : ''}))}) );

      expect(component.export())
        .toEqual(JSON.stringify({"items":[{"components":{"links":[{ "cssClass": "pull-right", "style": "block", "text": "@link1", "tooltip": " ", "url": " " }],"description":{"cssClass":"form-control","style":"inline","text":"@description1"},"title":{"cssClass":"form-group","style":"inline-block","text":"@title1"}},"id":1}],"slideshow":{"interval":100,"restart":100,"autoplay":0},"types":{"standard":1,"custom":2,"customTemplate":3},"settings":{"animation":"slide","defaultTemplateUrl":"","templateStyle":""},"i18n":{"":{"":""}}}));
    });

    it('should return an error message', () => {

      expect(component.export("text"))
        .toEqual("Unknown export format text");
    });
  });

  describe('Import test', () => {

    it('should return false on unknown format', () => {
      expect(component.import('', 'text')).toEqual(false);
    });

    it('should throw an error on invalid json', () => {
      expect(component.import('"title":{"cssClass":"","style":"","text":""},"id":1')).toEqual(false);
    });

    it('should parse the input json', () => {
      component.import('{"items":[{"components":{"links":[],"description":{"cssClass":"","style":"","text":""},"title":{"cssClass":"","style":"","text":""}},"id":1}],"slideshow":{"interval":100,"restart":100,"autoplay":0},"types":{"standard":1,"custom":2,"customTemplate":3},"settings":{"defaultTemplateUrl":"","templateStyle":"","animation":"slide"},"i18n":{"":{"":""}}}');

      expect(component.slideshow).toEqual({interval: 100, restart: 100, autoplay: 0});
      expect(component.type).toEqual({standard:1, custom:2, customTemplate:3});
      expect(component.setting).toEqual({ defaultTemplateUrl: "", templateStyle: "", animation: "slide" });
    });
  });

});
