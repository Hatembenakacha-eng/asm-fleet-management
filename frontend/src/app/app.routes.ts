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
import { VoitureForm } from './pages/voitures/voiture-form/voiture-form';
import { EmployeListe } from './pages/employes/employe-liste/employe-liste';
import { EmployeForm } from './pages/employes/employe-form/employe-form';
import { MissionListe } from './pages/missions/mission-liste/mission-liste';
import { MissionForm } from './pages/missions/mission-form/mission-form';
import { Recommandation } from './pages/recommandation/recommandation';
import { AffectationListe } from './pages/affectations/affectation-liste/affectation-liste';
import { AffectationForm } from './pages/affectations/affectation-form/affectation-form';

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
      { path: 'dashboard', component: Dashboard     },
      { path: 'voitures', component: VoitureListe     },
      { path: 'voitures/nouveau', component: VoitureForm     },
      { path: 'voitures/:id/modifier', component: VoitureForm     },
      { path: 'employes', component: EmployeListe     },
      { path: 'employes/nouveau', component: EmployeForm     },
      { path: 'employes/:id/modifier', component: EmployeForm     },
      { path: 'missions', component: MissionListe     },
      { path: 'missions/nouveau', component: MissionForm     },
      { path: 'missions/:id/modifier', component: MissionForm     },
      { path: 'missions/:id/recommandation', component: Recommandation     },
      {path: 'affectations',component: AffectationListe,canActivate: [adminGuard] },
      {path: 'affectations/nouveau',component: AffectationForm,canActivate: [adminGuard]},
      {path: 'affectations/:id/modifier',component: AffectationForm,canActivate: [adminGuard]},

    ]
  },
  { path: '**', redirectTo: 'login' }
];
