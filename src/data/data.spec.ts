import { Title } from 'data/title';
import { Link } from 'data/link';
import { Slideshow } from './slideshow';
import { Type } from './type';
import { Settings } from './settings';
import { Description } from './description';
import { Comp } from './comp';
import { Language } from './language';
import { Resource } from './resource';

describe('Title test' , () => {

    it('should create an empty title object', () => {
        let title = Title.create({});
        expect(title.cssClass).toEqual("");
        expect(title.style).toEqual("");
        expect(title.text).toEqual("");
    });

    it('should create a title object', () => {
        const config = {cssClass : 'pull-right', style : 'inline', text : 'This is a random text'};
        let title = Title.create(config);
        expect(title.cssClass).toEqual(config.cssClass);
        expect(title.style).toEqual(config.style);
        expect(title.text).toEqual(config.text);
    });
});

describe('Link test' , () => {

    it('should create an empty link object', () => {
        let link = Link.create();
        expect(link.cssClass).toEqual("");
        expect(link.style).toEqual("");
        expect(link.text).toEqual("");
        expect(link.tooltip).toEqual("");
        expect(link.url).toEqual("");
    });

    it('should create a link object', () => {
        const config = { cssClass: "pull-right", style: "inline", text: "This is a random text", tooltip: " ", url: "https://pages.blackline.com/best-practice-summits.html"};
        let link = Link.create(config);
        expect(link.cssClass).toEqual(config.cssClass);
        expect(link.style).toEqual(config.style);
        expect(link.text).toEqual(config.text);
        expect(link.tooltip).toEqual(config.tooltip);
        expect(link.url).toEqual(config.url);
    });
});

describe('Slideshow test', () => {

  it('should create an empty slideshow object', () => {
    let slideshow = Slideshow.create({});
    expect(slideshow.autoplay).toEqual(0);
    expect(slideshow.interval).toEqual(100);
    expect(slideshow.restart).toEqual(100);
  });

  it('should create a slideshow object with values', () => {
    const config = {autoplay: 1000, interval: 200, restart: 200};
    let slideshows = Slideshow.create(config);
    expect(slideshows.autoplay).toEqual(config.autoplay);
    expect(slideshows.interval).toEqual(config.interval);
    expect(slideshows.restart).toEqual(config.restart);
  });
});

describe('Type test', () => {

  it('should create a predefined type object', () => {
    let type = Type.create({});
    expect(type.standard).toEqual(1);
    expect(type.custom).toEqual(2);
    expect(type.customTemplate).toEqual(3);
  });

});

describe('Settings test', () => {
  it('should create a predefined settings object', () => {
    const settings = Settings.create();
    expect(settings.defaultTemplateUrl).toEqual("");
    expect(settings.templateStyle).toEqual("");
    expect(settings.animation).toEqual("slide");
  });
  it('should create an settings object with given values', () => {
    const config = {defaultTemplateUrl: "Default Template", templateStyle: "theStyle"};
    const settings = Settings.create(config);
    expect(settings.defaultTemplateUrl).toEqual(config.defaultTemplateUrl);
    expect(settings.templateStyle).toEqual(config.templateStyle);
    expect(settings.animation).toEqual("slide");
  });
});

describe('Description test', () => {

  it('should create an empty description object', () => {
    const description = Description.create();
    expect(description.cssClass).toEqual("");
    expect(description.style).toEqual("");
    expect(description.text).toEqual("");
  });

  it('should create a description object with values', () => {
    const config = {cssClass: "const", style: "inline", text: "text"};
    const description = Description.create(config);
    expect(description.cssClass).toEqual(config.cssClass);
    expect(description.style).toEqual(config.style);
    expect(description.text).toEqual(config.text);
  });

});
describe('Resource test', () => {
  it('should create an empty resource object', () => {
    const resource = Resource.create();
    expect(resource.name).toEqual("");
    expect(resource.value).toEqual("");
  });
  it('should create a resource object with values', () => {
    const config = {name: "description", value: "title"};
    const resource = Resource.create(config);
    expect(resource.name).toEqual(config.name);
    expect(resource.value).toEqual(config.value);
  });
});


describe('Language test', () => {

  it('should create an empty language object', () => {
    const language = Language.create();
    expect(language.name).toEqual("");
    expect(language.resources).toEqual([]);
  });

  it('should create a language object with given values', () => {
    const config = { name : 'en', resources : [ new Resource({name: "description1", value: "This is description1"}), new Resource({name: "description2", value: "This is description2"})] };
    const language = Language.create(config);
    expect(language.name).toEqual(config.name);
    expect(language.resources).toEqual(config.resources);

  });
});

describe('Component test', () => {

  it('should create an empty component object', () => {
    const component = Comp.create();
    expect(component.title).toEqual(Title.create({}));
    expect(component.description).toEqual(Description.create({}));
    expect(component.links).toEqual([]);
  });

  it('should create an empty component object in constructor', () => {
    const component = new Comp();
    expect(component.title).toEqual(Title.create({}));
    expect(component.description).toEqual(Description.create({}));
    expect(component.links).toEqual([]);
  });

  it('should create a component object with given values', () => {
    const title = Title.create({ cssClass : 'form-control', style : 'inline-block', text : 'Title 1'});
    const description = Description.create({ cssClass : 'form-control', style : 'inline-block', text : 'Description 1'});

    const component = Comp.create({title : title, description : description , links : []});
    expect(component.title).toEqual(title);
    expect(component.description).toEqual(description);
    expect(component.links).toEqual([]);
  });

  it('should add an empty link to the component object', () => {
    const component = Comp.create();
    component.addLink();
    expect(component.links.length).toEqual(1);
  });

  it('should save the new link', () => {
    const component = Comp.create();
    component.saveLink(Link.create({}));
    expect(component.links.length).toEqual(1);
  });

  it('shouldn`t save the link if it already exists', () => {
    const component = Comp.create();
    const link = Link.create({ cssClass: "pull-right", style: "inline", text: "This is a random text", tooltip: " ", url: "https://pages.blackline.com/best-practice-summits.html"});
    component.saveLink(link);
    expect(component.links.length).toEqual(1);
    component.saveLink(link);
    expect(component.links.length).toEqual(1);
  });

});
