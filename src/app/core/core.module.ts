import { AgentGuard } from './agent.guards';
import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { AdminGuard } from './admin.guards';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { PublicGuard } from './public.guards';

@NgModule({
  providers: 	[AuthService, AdminGuard, AgentGuard, PublicGuard],
  imports: 		[AngularFireAuthModule]
})
export class CoreModule { }
