import { ChangeDetectionStrategy, Component, inject, input, OnInit, output, signal } from '@angular/core';
import { GetAllBarbershopsUseCase } from '@barbershop-app/client/appointment/application';
import { BarbershopDto } from '@barbershop-app/shared/types';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-select-barbershop',
  imports: [NgClass],
  templateUrl: './select-barbershop.html',
  styleUrl: './select-barbershop.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectBarbershop implements OnInit {
  private getAllBarbershopsUseCase = inject(GetAllBarbershopsUseCase);
  barbershops = signal<BarbershopDto[]>([]);
  selectedBarbershopOutput = output<number>();
  selectedBarbershopId = input.required<number>();

  onClick(id: number) {
    this.selectedBarbershopOutput.emit(id);
  }

  async ngOnInit() {
    this.getAllBarbershopsUseCase.execute().subscribe({
      next: (res) => this.barbershops.set(res),
    });
  }
}
