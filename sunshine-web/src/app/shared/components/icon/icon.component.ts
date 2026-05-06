import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  host: { style: 'display:inline-flex;align-items:center;line-height:0' },
})
export class IconComponent {
  @Input() name = '';
  @Input() size: number | string = 20;
}
