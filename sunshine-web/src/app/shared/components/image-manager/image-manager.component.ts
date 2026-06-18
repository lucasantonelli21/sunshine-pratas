import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IconComponent } from '../icon/icon.component';

export interface ManagedImage {
  id: string;
  url: string;
  order: number;
}

@Component({
  selector: 'app-image-manager',
  standalone: true,
  imports: [FormsModule, IconComponent],
  template: `
    <div class="image-manager">
      <div class="image-list" [class.empty]="images.length === 0">
        @if (images.length === 0) {
          <div class="no-images">
            <app-icon name="image" [size]="32" />
            <p>Nenhuma imagem adicionada</p>
          </div>
        }
        @for (image of images; track image.id; let i = $index) {
          <div class="image-item">
            <div class="image-preview">
              <img [src]="image.url" [alt]="'Imagem ' + (i + 1)" (error)="onImageError($event)" />
            </div>
            <div class="image-info">
              <span class="image-order">{{ i + 1 }}</span>
              <span class="image-url" [title]="image.url">{{ image.url }}</span>
            </div>
            <div class="image-actions">
              <button type="button" title="Mover para cima" [disabled]="i === 0" (click)="moveUp(i)">
                <app-icon name="chevron-up" [size]="14" />
              </button>
              <button type="button" title="Mover para baixo" [disabled]="i === images.length - 1" (click)="moveDown(i)">
                <app-icon name="chevron-down" [size]="14" />
              </button>
              <button type="button" class="remove" title="Remover" (click)="remove(i)">
                <app-icon name="trash-2" [size]="14" />
              </button>
            </div>
          </div>
        }
      </div>

      <div class="add-image">
        <input
          type="url"
          [(ngModel)]="newUrl"
          placeholder="https://exemplo.com/imagem.jpg"
          (keydown.enter)="$event.preventDefault(); add()"
        />
        <button type="button" (click)="add()" [disabled]="!newUrl.trim()">
          <app-icon name="plus" [size]="16" />
          Adicionar
        </button>
      </div>
    </div>
  `,
  styles: [`
    .image-manager {
      display: grid;
      gap: 12px;
    }

    .image-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      border: 1px solid #eaecf0;
      border-radius: 8px;
      overflow: hidden;
    }

    .image-list.empty {
      background: #f9fafb;
    }

    .no-images {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 24px;
      color: #98a2b3;
      text-align: center;

      p {
        margin: 0;
        font-size: 0.875rem;
      }
    }

    .image-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      background: #fff;
      border-bottom: 1px solid #eaecf0;

      &:last-child {
        border-bottom: 0;
      }
    }

    .image-preview {
      width: 48px;
      height: 48px;
      flex-shrink: 0;
      border-radius: 6px;
      overflow: hidden;
      background: #f2f4f7;
      border: 1px solid #eaecf0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }

    .image-info {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .image-order {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      flex-shrink: 0;
      border-radius: 50%;
      background: var(--color-primary-100);
      color: var(--color-primary-800);
      font-size: 0.75rem;
      font-weight: 700;
    }

    .image-url {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.8125rem;
      color: #667085;
    }

    .image-actions {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        padding: 0;
        border: 1px solid #d0d5dd;
        border-radius: 5px;
        background: #fff;
        color: #344054;
        cursor: pointer;
        transition: background 0.12s;
        font: inherit;

        &:hover:not(:disabled) {
          background: #f9fafb;
        }

        &:disabled {
          opacity: 0.4;
          cursor: default;
        }

        &.remove {
          border-color: #fecdca;
          background: #fff5f5;
          color: #b42318;

          &:hover:not(:disabled) {
            background: #fee4e2;
          }
        }
      }
    }

    .add-image {
      display: flex;
      gap: 8px;

      input {
        flex: 1;
        min-height: 38px;
        padding: 8px 12px;
        border: 1px solid #cfd6e2;
        border-radius: 6px;
        font: inherit;
        font-size: 0.875rem;
        color: #101828;
        background: #fff;

        &:focus {
          outline: 3px solid color-mix(in srgb, var(--color-primary-500) 30%, transparent);
          border-color: var(--color-primary-600);
        }

        &::placeholder {
          color: #98a2b3;
        }
      }

      button {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        min-height: 38px;
        padding: 0 14px;
        border: 0;
        border-radius: 6px;
        background: var(--color-primary-700);
        color: #fff;
        font: inherit;
        font-size: 0.875rem;
        font-weight: 600;
        white-space: nowrap;
        cursor: pointer;
        transition: background 0.12s;

        &:hover:not(:disabled) {
          background: var(--color-primary-800);
        }

        &:disabled {
          opacity: 0.5;
          cursor: default;
        }
      }
    }
  `],
})
export class ImageManagerComponent {
  @Input() images: ManagedImage[] = [];
  @Output() imagesChange = new EventEmitter<ManagedImage[]>();

  newUrl = '';

  add(): void {
    const url = this.newUrl.trim();
    if (!url) return;
    this.emit([...this.images, { id: crypto.randomUUID(), url, order: this.images.length }]);
    this.newUrl = '';
  }

  moveUp(index: number): void {
    if (index === 0) return;
    const arr = [...this.images];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    this.emit(arr);
  }

  moveDown(index: number): void {
    if (index === this.images.length - 1) return;
    const arr = [...this.images];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    this.emit(arr);
  }

  remove(index: number): void {
    this.emit(this.images.filter((_, i) => i !== index));
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }

  private emit(images: ManagedImage[]): void {
    this.imagesChange.emit(images.map((img, i) => ({ ...img, order: i })));
  }
}
