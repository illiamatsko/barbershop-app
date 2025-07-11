import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { register } from 'swiper/element/bundle';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

register();
registerLocaleData(localeUk);
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
