import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin.guard';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Layout } from './layout/layout';
import { Accueil } from './pages/accueil/accueil';
import { Dashboard } from './pages/dashboard/dashboard';
import { AssistantIa } from './pages/assistant-ia/assistant-ia';
import { Profil } from './pages/profil/profil';
import { VoitureListe } from './pages/voitures/voiture-liste/voiture-liste';
import { EmployeListe } from './pages/employes/employe-liste/employe-liste';
import { MissionListe } from './pages/missions/mission-liste/mission-liste';
import { Recommandation } from './pages/recommandation/recommandation';
import { AffectationListe } from './pages/affectations/affectation-liste/affectation-liste';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: '', component: Layout, canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
      { path: 'accueil', component: Accueil },
      { path: 'assistant-ia', component: AssistantIa },
      { path: 'profil', component: Profil },
      { path: 'dashboard', component: Dashboard, canActivate: [adminGuard]     },
      { path: 'voitures', component: VoitureListe     },
      { path: 'employes', component: EmployeListe, canActivate: [adminGuard]     },
      { path: 'missions', component: MissionListe     },
      { path: 'missions/:id/recommandation', component: Recommandation     },
      {path: 'affectations',component: AffectationListe,canActivate: [adminGuard] },

    ]
  },
  { path: '**', redirectTo: 'login' }
];
