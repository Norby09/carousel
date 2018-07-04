import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListComponent } from './itemList.component';

import { Item } from 'data/item';
import { Comp } from 'data/comp';
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
        .toEqual(JSON.stringify({"items":[{"components":{"links":[],"description":{"cssClass":"","style":"","text":""},"title":{"cssClass":"","style":"","text":""}},"id":1}],"slideshow":{"interval":100,"restart":100,"autoplay":0},"types":{"standard":1,"custom":2,"customTemplate":3},"settings":{"defaultTemplateUrl":"https://www.blackline.com/path/to/default-template.html","templateStyle":".custom-class { font-size: 24px; color: #2e7ac1; }","animation":"slide"},"i18n":{"":{"":""}}}));
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
        .toEqual(JSON.stringify({"items":[{"components":{"links":[{ "cssClass": "pull-right", "style": "block", "text": "@link1", "tooltip": " ", "url": " " }],"description":{"cssClass":"form-control","style":"inline","text":"@description1"},"title":{"cssClass":"form-group","style":"inline-block","text":"@title1"}},"id":1}],"slideshow":{"interval":100,"restart":100,"autoplay":0},"types":{"standard":1,"custom":2,"customTemplate":3},"settings":{"defaultTemplateUrl":"https://www.blackline.com/path/to/default-template.html","templateStyle":".custom-class { font-size: 24px; color: #2e7ac1; }","animation":"slide"},"i18n":{"":{"":""}}}));
    });

    it('should export default data in json format', () => {

      expect(component.export())
        .toEqual(JSON.stringify({"items":[{"components":{"links":[],"description":{"cssClass":"","style":"","text":""},"title":{"cssClass":"","style":"","text":""}},"id":1}],"slideshow":{"interval":100,"restart":100,"autoplay":0},"types":{"standard":1,"custom":2,"customTemplate":3},"settings":{"defaultTemplateUrl":"https://www.blackline.com/path/to/default-template.html","templateStyle":".custom-class { font-size: 24px; color: #2e7ac1; }","animation":"slide"},"i18n":{"":{"":""}}}));
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
    it('should return true on valid input', () => {
      expect(component.import('{\n' +
        ' "types": {\n' +
        '  "standard": 1,\n' +
        '  "custom": 2,\n' +
        '  "customTemplate": 3\n' +
        ' },\n' +
        ' "settings": {\n' +
        '  "templateStyle": ".bl--login-carousel-slide-background{background-position:bottom center;}.bl--login-carousel-slide-content{top:70px;}.bl--mkt-itb-title{padding:260px 50px 0 50px;text-transform:none;font-size:40px;line-height:48px;margin-bottom:10px;font-weight:bold;}.bl--mkt-itb-description{color:#BABABA;margin-bottom:42px;line-height:24px;font-size:20px;font-weight:300;padding:0 50px 0 50px;}.bl--mkt-itb-button{font-size:14px;color:#fff;font-weight:bold;line-height:18px;padding:12px 20px;background:#117CBF;border:none;}.bl--mkt-itb-button:hover{color: #fff; background: #00A7EA;} @media all and (min-width: 481px) and (max-width: 768px) { .bl--mkt-itb-title { padding-top: 0; } }"\n' +
        ' },\n' +
        ' "items": [{\n' +
        '  "backgroundColor": "#000",\n' +
        '  "backgroundUrl": "https://static1.blackline.com/fcs-fe-resources/carousel/Intercompany_banner_2089x1468.jpg",\n' +
        '  "components": {\n' +
        '   "title": {\n' +
        '    "cssClass": "bl--mkt-itb-title",\n' +
        '    "text": "@title1",\n' +
        '    "type": 1\n' +
        '   },\n' +
        '   "description": {\n' +
        '    "cssClass": "bl--mkt-itb-description",\n' +
        '    "text": "@description1",\n' +
        '    "type": 2\n' +
        '   },\n' +
        '   "links": [{\n' +
        '    "cssClass": "bl--mkt-itb-button",\n' +
        '    "text": "@registerNow1",\n' +
        '    "url": "https://www.blackline.com/resources/webinars/may-product-release-webinar-increase-visibility-control-and-accuracy",\n' +
        '    "type": 3\n' +
        '   }]\n' +
        '  },\n' +
        '  "id": 1,\n' +
        '  "type": 1\n' +
        ' }, {\n' +
        '  "backgroundColor": "#000",\n' +
        '  "backgroundUrl": "https://static1.blackline.com/fcs-fe-resources/carousel/BestPracticeSummit_banner_2089x1468.jpg",\n' +
        '  "components": {\n' +
        '   "title": {\n' +
        '    "cssClass": "bl--mkt-itb-title",\n' +
        '    "text": "@title2",\n' +
        '    "type": 1\n' +
        '   },\n' +
        '   "description": {\n' +
        '    "cssClass": "bl--mkt-itb-description",\n' +
        '    "text": "@description2",\n' +
        '    "type": 2\n' +
        '   },\n' +
        '   "links": [{\n' +
        '    "cssClass": "bl--mkt-itb-button",\n' +
        '    "text": "@attend1",\n' +
        '    "url": "https://pages.blackline.com/best-practice-summits.html",\n' +
        '    "type": 3\n' +
        '   }]\n' +
        '  },\n' +
        '  "id": 2,\n' +
        '  "type": 1\n' +
        ' }, {\n' +
        '  "backgroundColor": "#000",\n' +
        '  "backgroundUrl": "https://static1.blackline.com/fcs-fe-resources/carousel/BlackLineUStore.jpg",\n' +
        '  "components": {\n' +
        '   "title": {\n' +
        '    "cssClass": "bl--mkt-itb-title",\n' +
        '    "text": "@title3",\n' +
        '    "type": 1\n' +
        '   },\n' +
        '   "description": {\n' +
        '    "cssClass": "bl--mkt-itb-description",\n' +
        '    "text": "@description3",\n' +
        '    "type": 2\n' +
        '   },\n' +
        '   "links": [{\n' +
        '    "cssClass": "bl--mkt-itb-button",\n' +
        '    "text": "@reserveSeat",\n' +
        '    "url": "https://www.blackline.com/services/training",\n' +
        '    "type": 3\n' +
        '   }]\n' +
        '  },\n' +
        '  "id": 3,\n' +
        '  "type": 1\n' +
        ' }],\n' +
        ' "slideshow": {\n' +
        '  "autoPlay": true,\n' +
        '  "interval": 5000,\n' +
        '  "restart": 2000\n' +
        ' },\n' +
        ' "i18n": {\n' +
        '  "en": {\n' +
        '   "@title1": "May Product Release: See What’s New",\n' +
        '   "@description1": "May 15, 2018 – 12:00 PM ET/9:00 AM PT",\n' +
        '   "@registerNow1": "REGISTER NOW",\n' +
        '   "@title2": "BlackLine\'\'s Best Practices Summit is Coming to a City Near You",\n' +
        '   "@description2": "Metrics Matter: Turning Numbers into Knowledge",\n' +
        '   "@attend1": "ATTEND A SUMMIT",\n' +
        '   "@title3": "BlackLine U Store Now Open for Business",\n' +
        '   "@description3": "Access CPE annual e-learning passes and seats to live BlackLine U classes",\n' +
        '   "@reserveSeat": "RESERVE A SEAT"\n' +
        '  }\n' +
        ' }\n' +
        '}')).toEqual(true);
    });

  });

});
