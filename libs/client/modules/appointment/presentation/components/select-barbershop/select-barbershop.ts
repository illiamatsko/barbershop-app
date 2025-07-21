import { ChangeDetectionStrategy, Component, inject, input, OnInit, output, signal } from '@angular/core';
import { GetAllBarbershopsUseCase } from '@barbershop-app/client/appointment/application';
import { BarbershopDto } from '@barbershop-app/shared/domain';
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

  selectedBarbershopId = input.required<number>();
  selectedBarbershopIdOutput = output<number>();

  onClick(id: number) {
    this.selectedBarbershopIdOutput.emit(id);
  }

  async ngOnInit() {
    this.getAllBarbershopsUseCase.execute().subscribe({
      next: (res) => this.barbershops.set(res),
    });
  }
}
