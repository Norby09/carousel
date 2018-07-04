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
        // expect(title).toEqual(jasmine.objectContaining({cssClass : "", style: "", text: ""}));
    });

    it('should create a title object', () => {
        let title = Title.create({cssClass : 'pull-right', style : 'inline', text : 'This is a random text'});
        expect(title.cssClass).toEqual("pull-right");
        expect(title.style).toEqual("inline");
        expect(title.text).toEqual("This is a random text");
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
        let link = Link.create({ cssClass: "pull-right", style: "inline", text: "This is a random text", tooltip: " ", url: "https://pages.blackline.com/best-practice-summits.html",});
        expect(link.cssClass).toEqual("pull-right");
        expect(link.style).toEqual("inline");
        expect(link.text).toEqual("This is a random text");
        expect(link.tooltip).toEqual(" ");
        expect(link.url).toEqual("https://pages.blackline.com/best-practice-summits.html");
    });
});
describe('Slideshow test', () => {
  it('should create an empty slideshow object', () => {
    let slideshow = Slideshow.create({});
    expect(slideshow.autoplay).toEqual(0);
    expect(slideshow.interval).toEqual(100);
    expect(slideshow.restart).toEqual(100);
  })
  it('should create a slideshow object with values', () => {
    let slideshows = Slideshow.create({autoplay: 1000, interval: 200, restart: 200});
    expect(slideshows.autoplay).toEqual(1000);
    expect(slideshows.interval).toEqual(200);
    expect(slideshows.restart).toEqual(200);
  });
});
describe('Type test', () => {
  it('should create a predefined type object', () => {
    let type = Type.create({});
    expect(type.standard).toEqual(1);
    expect(type.custom).toEqual(2);
    expect(type.customTemplate).toEqual(3);
  })
})
describe('Settings test', () => {
  it('should create a predefined settings object', () => {
    let settings = Settings.create();
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
    const description = Description.create({cssClass: "const", style: "inline", text: "text"});
    expect(description.cssClass).toEqual("const");
    expect(description.style).toEqual("inline");
    expect(description.text).toEqual("text");
  });
});


