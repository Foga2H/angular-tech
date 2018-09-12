import { NgModule } from '@angular/core';
import { 
    MatCardModule, 
    MatToolbarModule, 
    MatGridListModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatTabsModule,
    MatSelectModule
} from '@angular/material';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatGridListModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatSelectModule
    ],
    exports: [
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatGridListModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatSelectModule
    ]
})

export class MaterialModule {}