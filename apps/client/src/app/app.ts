import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './shared/components/header/header';
import {Footer} from "./shared/components/footer/footer";

@Component({
  imports: [RouterModule, Header, Footer],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected title = 'client';
}
