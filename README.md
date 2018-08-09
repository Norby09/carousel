# CarouselConfigurator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# User guide

## Introduction 

The Carousel Configurator is used to generate a slideshow based on data introduced in form or from a valid json provided as input. It has two main features : `import` and `export`. Every imported and exported data is going to be saved as a json in a file named `carousel-preview.json`. From this file the main application will generate the corresponding slides with the data.

## How to use the application
In order to have a valid slide show at the export json the user has to fill the form fields.

1. The SlideShow component defines the carousel's behaviour : 
    * `autoplay` : specifies if the slideshow is active or not
    * `interval` : specifies the interval in milliseconds between 2 carousel slides 
    * `restart` : if the user clicks on a specific slide, this option's value will be added to the interval value

2. The Settings component contains different settings that can be set up for the carousel : 
    * `defaultTemplateUrl`: a CDN URL to the custom template HTML.
    * `templateStyle`: a set of CSS rules, under which reusable styling can be defined, so as to avoid redundancy at component level.
    * `animation`: the desired animation to apply when transitioning between slides. Currently, the only supported value is "slide".
    
3. The Item component contains `Title`, `Description` and `Link` elements which are components for each individual slide. To create a new Item the user has to click on the `Add item` button from the end of the form. An Item can be removed with the `Remove item` button. 
For a standard carousel item the user has to provide the following information:
    * `name`:  this will be the name of the item
    * `backgroundColor`: Hex code for example #ccc
    * `backgroundUrl`: URL to the background image or null
    * `type`: defines the carousel template type. It can have 3 values : standard, custom and custom template
    

   * `Title` : for the Title component the user has to provide 3 more fields
      * `cssClass`: the name of the CSS class to apply on the element
      * `style`: CSS style applied on the element
      * `text`: The user has to select the preferred language from the dropdown and then has to insert text in the input field. This text is going to appear on the slide as the title. By clicking the plus button, more resources can be added by selecting the new language and providing the corresponding translation. 

	* `Description` : for the Description component the user has to provide 3 fields
	  * `cssClass`: the name of the CSS class to apply on the element
      * `style`: CSS style applied on the element
      * `text`: The user has to select the preferred language from the dropdown and then has to insert text in the input field. This text is going to appear on the slide as the title. By clicking the plus button, more resources can be added by selecting the new language and providing the corresponding translation. 

	* `Link` : an Item can have multiple links. A Link can be added by clicking the `add link` button. A Link can be removed with the `remove link` button. For a Link component the user has to provide 5 fields
		* `cssClass`: the name of the CSS class to apply on the element
		* `style`: CSS style applied on the link
		* `text`: The user has to select the preferred language from the dropdown and then has to insert text in the input field. This text is going to appear on the slide as the title. By clicking the plus button, more resources can be added by selecting the new language and providing the corresponding translation. 
		* `tooltip`: the text to be displayed as a tooltip when the user hovers over the link
		* `url`: the URL where the link will navigate to

## Import 
Import is one of the main features of this application. It assumes that the user has a valid json that it will enter it in the specific input. After pressing the `import button` the application will populate all the fields with the corresponding values from the json and the user will be able to apply his modifications or add any new elements if needed. If the json is not valid then pressing of the `import button` will result in throwing an error. 
## Export
The export is the second main feature of this application. For it to function properly it requires most of the inputs to be populated with appropriate and correct values. After the inputs have been filled with data the `export button` can be pressed. If everything works then on the right side the carousel with the appropiate slides and the other elements will be generated. If nothing was generated it means there was an error with the data processing, or the server side is not working properly. 
