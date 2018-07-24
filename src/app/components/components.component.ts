import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Link } from '../../data/link';
import { Comp } from '../../data/comp';

@Component({
  selector: 'bl-carousel-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss', '../app.component.scss']
})
export class ComponentsComponent implements OnInit {
  @Input() comp: Comp = null;
  @Input() links: Link[] = null;
  @Output() save: EventEmitter<Comp> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onSubmitItems() {
    this.save.emit(this.comp);
  }
}
