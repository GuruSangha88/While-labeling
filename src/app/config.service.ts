import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ClientConfig } from './config.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private configSubject = new BehaviorSubject<ClientConfig | null>(null);
  config$ = this.configSubject.asObservable();

  // Static configuration for demonstration
  private staticConfigs: { [key: string]: ClientConfig } = {
    'client1': {
      clientId: 'client1',
      appTitle: 'Client One Application',
      dateFormat: 'MM/dd/yyyy',
      timeFormat: 'hh:mm a',
      buttonColor: '#007bff',
      primaryColor: '#2c3e50',
      secondaryColor: '#34495e',
      logoPath: 'assets/logos/client1-logo.png',
      theme: {
        primary: '#2c3e50',
        secondary: '#34495e',
        accent: '#3498db',
        background: '#ecf0f1'
      },
      features: {
        analytics: true,
        reporting: true,
        notifications: false
      },
      localization: {
        language: 'en',
        currency: 'USD',
        timezone: 'America/New_York'
      }
    },
    'client2': {
      clientId: 'client2',
      appTitle: 'Client Two Application',
      dateFormat: 'dd/MM/yyyy',
      timeFormat: 'HH:mm',
      buttonColor: '#28a745',
      primaryColor: '#27ae60',
      secondaryColor: '#2ecc71',
      logoPath: 'assets/logos/client2-logo.png',
      theme: {
        primary: '#27ae60',
        secondary: '#2ecc71',
        accent: '#1abc9c',
        background: '#f9f9f9'
      },
      features: {
        analytics: true,
        reporting: true,
        notifications: true
      },
      localization: {
        language: 'en',
        currency: 'EUR',
        timezone: 'Europe/London'
      }
    }
  };

  constructor() {
    const clientId = this.getClientIdFromUrl() || 'client1';
    this.loadConfig(clientId);
  }

  private getClientIdFromUrl(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('clientId');
    }
    return null;
  }

  loadConfig(clientId: string): void {
    // In a real application, you would make an HTTP request here
    // this.http.get<ClientConfig>(`/api/config/${clientId}`).subscribe(config => {
    //   this.configSubject.next(config);
    // });

    // For now, we'll use the static config
    const config = this.staticConfigs[clientId];
    if (config) {
      this.configSubject.next(config);
    } else {
      console.error(`No configuration found for client: ${clientId}`);
    }
  }

  getConfig(): ClientConfig | null {
    return this.configSubject.value;
  }

  updateConfig(config: Partial<ClientConfig>): void {
    const currentConfig = this.configSubject.value;
    if (currentConfig) {
      this.configSubject.next({ ...currentConfig, ...config });
    }
  }
}
