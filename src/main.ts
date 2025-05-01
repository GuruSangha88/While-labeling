import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; // Import correctly

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()] // Only this, no other HttpClientModule
}).catch(err => console.error(err));
