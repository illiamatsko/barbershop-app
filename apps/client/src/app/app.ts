import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GetUserFromTokenUseCase } from '@barbershop-app/client/auth/application';
import { Footer } from '@barbershop-app/client/layout/presentation';

@Component({
  imports: [RouterModule, Footer],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit{
  private getUserFromTokenUseCase = inject(GetUserFromTokenUseCase);

  ngOnInit() {
    this.getUserFromTokenUseCase.execute();
  }
}
