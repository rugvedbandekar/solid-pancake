import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { InventoryComponent } from './inventory.component';

@NgModule({
  declarations: [InventoryComponent],
  imports: [CommonModule, InventoryRoutingModule, MaterialModule, RouterModule],
})
export class InventoryModule {}
