import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GetUserFromTokenUseCase } from '@barbershop-app/client/auth/application';
import { Footer } from '@barbershop-app/client/layout/presentation';
import { GetAllBarbersUseCase } from '@barbershop-app/client/barber/application';
import { GetAllServicesUseCase } from '@barbershop-app/client/service/application';
import { GetAllBarbershopsUseCase } from '@barbershop-app/client/appointment/application';

@Component({
  imports: [RouterModule, Footer],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit{
  private getUserFromTokenUseCase = inject(GetUserFromTokenUseCase);
  private getAllBarbershopsUseCase = inject(GetAllBarbershopsUseCase);
  private getAllBarbersUseCase = inject(GetAllBarbersUseCase);
  private getAllServicesUseCase = inject(GetAllServicesUseCase);

  ngOnInit() {
    this.getUserFromTokenUseCase.execute();
    this.getAllBarbershopsUseCase.execute();
    this.getAllBarbersUseCase.execute();
    this.getAllServicesUseCase.execute();
  }
}
