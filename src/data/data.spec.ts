import { Title } from 'data/title';
import { Link } from 'data/link';
import {Slideshow} from './slideshow';
import {Type} from './type';
import {Settings} from './settings';
import {Description} from './description';

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
        let link = Link.create({});
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

})

describe('Settings test', () => {
  
  it('should create a predefined settings object', () => {
    let settings = Settings.create();
    // astea trebuie scoase
    expect(settings.defaultTemplateUrl).toEqual("https://www.blackline.com/path/to/default-template.html");
    expect(settings.templateStyle).toEqual(".custom-class { font-size: 24px; color: #2e7ac1; }");
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


