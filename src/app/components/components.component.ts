import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Link} from '../../data/link';
import {Comp} from '../../data/comp';

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
    this.comp.links.push(new Link());
  }
  onSubmitItems(event: Event) {
    event.preventDefault();
    this.sav.emit(this.comp);
  }
  saveLink(link: Link): void {
    if (!~this.comp.links.indexOf(link)) {
      this.comp.links.push(link);
    }
  }
  
}
