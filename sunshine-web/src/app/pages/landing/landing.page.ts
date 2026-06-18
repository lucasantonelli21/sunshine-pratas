import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { API_BASE_URL } from '../../core/api.config';
import { IconComponent } from '../../shared/components/icon/icon.component';

interface PublicProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  typeLabel: string;
  genderLabel: string;
  materialLabel: string;
  images: Array<{ url: string; order: number }>;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, IconComponent],
  templateUrl: './landing.page.html',
  styleUrl: './landing.page.scss',
})
export class LandingPage implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  readonly products = signal<PublicProduct[]>([]);
  readonly loadingProducts = signal(true);
  readonly mobileMenuOpen = signal(false);
  readonly currentYear = new Date().getFullYear();

  ngOnInit(): void {
    this.http
      .get<{ data: PublicProduct[] }>(`${this.apiBaseUrl}/products`)
      .pipe(map((r) => r.data))
      .subscribe({
        next: (products) => {
          this.products.set(products);
          this.loadingProducts.set(false);
        },
        error: () => {
          this.loadingProducts.set(false);
        },
      });
  }

  firstImage(product: PublicProduct): string | null {
    if (!product.images?.length) return null;
    const sorted = [...product.images].sort((a, b) => a.order - b.order);
    return sorted[0]?.url ?? null;
  }

  toggleMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  scrollTo(id: string): void {
    this.mobileMenuOpen.set(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
