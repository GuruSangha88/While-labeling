// src/app/config.model.ts
export interface ClientConfig {
    clientId: string;
    appTitle: string;
    dateFormat: string;
    timeFormat: string;
    buttonColor: string;
    primaryColor: string;
    secondaryColor: string;
    logoPath: string;
    theme: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
    };
    features: {
      [key: string]: boolean;
    };
    localization: {
      language: string;
      currency: string;
      timezone: string;
    };
  }
