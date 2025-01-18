import { Component } from '@angular/core';
import {TuiRoot} from '@taiga-ui/core';

@Component({
  imports: [TuiRoot],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'front';
}
