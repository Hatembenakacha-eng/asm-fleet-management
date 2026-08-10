import { Voiture } from './voiture';
import { Mission } from './mission';
import { Employee } from './employee';

export interface Affectation {
  id: number;

  voiture_id: number;
  mission_id: number;
  employee_id: number;
  cree_par: number;

  statut: string;
  date_debut: string;
  date_fin: string;

  voiture?: Voiture;
  mission?: Mission;
  employee?: Employee;

  created_at?: string;
  updated_at?: string;
}
