import { Title } from 'data/title';
import { Link } from 'data/link';

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