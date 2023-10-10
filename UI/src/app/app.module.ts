import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './services/config.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCommonModule } from '@angular/material/core';
import { LayoutModule } from '@angular/cdk/layout';
import { CdkDrag, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FilterStatusPipe } from './services/filter-status.pipe';
import { ListComponent } from './list/list.component';

export function initConfig(configService: ConfigService) {
  return () => configService.loadConfig().toPromise();
}

@NgModule({
  declarations: [AppComponent, TodoComponent, FilterStatusPipe, ListComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    // MatListModule,

    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,

    MatInputModule,
    MatCommonModule,
    LayoutModule,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    MatSnackBarModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
