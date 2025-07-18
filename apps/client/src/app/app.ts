import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GetUserFromTokenUseCase } from '@barbershop-app/client/auth/application';
import { Footer } from '@barbershop-app/client/layout/presentation';
import { GetAllBarbersUseCase } from '@barbershop-app/client/barber/application';

@Component({
  imports: [RouterModule, Footer],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit{
  private getUserFromTokenUseCase = inject(GetUserFromTokenUseCase);
  private getAllBarbersUseCase = inject(GetAllBarbersUseCase);

  ngOnInit() {
    this.getUserFromTokenUseCase.execute();
    this.getAllBarbersUseCase.execute();
  }
}
