import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {LinksArray} from '../../data/links-array';
import {Comp} from '../../data/comp';
import {Slide} from '../../data/slide';
import {ArrayLikeObservable} from 'rxjs/observable/ArrayLikeObservable';

@Component({
  selector: 'bl-carousel-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss', '../app.component.scss']
})
export class ComponentsComponent implements OnInit {
  @Input() comp: Comp = null;
  @Output() sav: EventEmitter<Comp> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if (!this.comp) {
      this.comp = new Comp();
    }
    this.adLink(new LinksArray());
  }
  onSubmitItems(event: Event) {
    event.preventDefault();
    this.sav.emit(this.comp);
  }
  saveLink(link: LinksArray): void {
    if (!~this.comp.links.indexOf(link)) {
      this.adLink(link);
    }
  }
  adLink(link: LinksArray): void {
    this.comp.links.push(link);
  }
}
