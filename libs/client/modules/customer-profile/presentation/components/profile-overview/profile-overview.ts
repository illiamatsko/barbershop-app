import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { UserDto } from '@barbershop-app/shared/domain';
import { NgxMaskPipe } from 'ngx-mask';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-profile-overview',
  imports: [FormsModule, NgxMaskPipe],
  templateUrl: './profile-overview.html',
  styleUrl: './profile-overview.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileOverview {
  user = input.required<Omit<UserDto, 'id'> & { id: number | null }>();
  initials = computed(() =>
    this.user().firstName.charAt(0) + this.user().lastName.charAt(0)
  );
}
