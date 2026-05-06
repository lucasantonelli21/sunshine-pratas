import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="empty-state">
      <div class="icon-wrap">
        <app-icon [name]="icon" [size]="48" />
      </div>
      <h3>{{ title }}</h3>
      @if (message) {
        <p>{{ message }}</p>
      }
      @if (actionLabel) {
        <button type="button" (click)="action.emit()">{{ actionLabel }}</button>
      }
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 14px;
      padding: 72px 32px;
      text-align: center;
    }
    .icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 88px;
      height: 88px;
      border-radius: 50%;
      background: var(--color-primary-100);
      color: var(--color-primary-600);
    }
    h3 {
      margin: 0;
      font-size: 1.125rem;
      color: #344054;
    }
    p {
      margin: 0;
      color: #667085;
      font-size: 0.9375rem;
      max-width: 340px;
    }
    button {
      margin-top: 4px;
      min-height: 40px;
      padding: 0 20px;
      border: 0;
      border-radius: 6px;
      background: var(--color-primary-700);
      color: #fff;
      font: inherit;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    button:hover {
      background: var(--color-primary-800);
    }
  `],
})
export class EmptyStateComponent {
  @Input() icon = 'inbox';
  @Input() title = 'Nenhum registro encontrado';
  @Input() message = '';
  @Input() actionLabel = '';
  @Output() action = new EventEmitter<void>();
}
