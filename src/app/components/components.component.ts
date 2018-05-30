import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {LinksArray} from '../../data/links-array';
import {Comp} from '../../data/comp';
import {Slide} from '../../data/slide';

@Component({
  selector: 'bl-carousel-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {
  @Input() comp: Comp = null;
  @Output() sav: EventEmitter<Comp> = new EventEmitter();
  constructor() { }
  ngOnInit() {
    if (!this.comp) {
      this.resetLink();
    }
  }
  resetLink() {
    this.comp = new Comp();
  }
  onSubmitItems(event: Event) {
    event.preventDefault();

    this.sav.emit(this.comp);
    // this.resetLink();
  }
  saveLink(link: LinksArray): void {
    if (!~this.comp.links.indexOf(link)) {
      this.adLink(link);
    }
  }
  adLink(link: LinksArray): void {
    this.comp.links.push(link);
    console.log(this.comp.links);
  }
}
