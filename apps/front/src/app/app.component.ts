import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LifestyleWidgetConfigService } from '@lifestyle-dashboard/lifestyle-widget-config-service';
import { TuiRoot } from '@taiga-ui/core';

@Component({
  imports: [RouterOutlet, TuiRoot],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent implements OnInit {
  private readonly lifestyleConfigService = inject(
    LifestyleWidgetConfigService,
  );

  ngOnInit() {
    this.lifestyleConfigService.init();
  }
}
