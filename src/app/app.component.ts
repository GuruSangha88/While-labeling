import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './config.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private configService = inject(ConfigService);
  private platformId = inject(PLATFORM_ID);
  config$ = this.configService.config$;
  currentDate = new Date();

  ngOnInit() {
    // Apply theme colors when config changes
    this.config$.subscribe(config => {
      if (config && isPlatformBrowser(this.platformId)) {
        document.documentElement.style.setProperty('--primary-color', config.theme.primary);
        document.documentElement.style.setProperty('--secondary-color', config.theme.secondary);
        document.documentElement.style.setProperty('--accent-color', config.theme.accent);
        document.documentElement.style.setProperty('--background-color', config.theme.background);
        document.title = config.appTitle;
      }
    });
  }

  formatDate(date: Date, format: string): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    // Replace format placeholders with actual values
    return format
      .replace('dd', day)
      .replace('MM', month)
      .replace('yyyy', year.toString());
  }
}
