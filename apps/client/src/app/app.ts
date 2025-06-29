import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './shared/components/header/header';
import {Footer} from "./shared/components/footer/footer";
import { AuthService } from './core/auth/auth.service';

@Component({
  imports: [RouterModule, Header, Footer],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit{
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.getUserFromToken()
  }
}
