import { Voiture } from './voiture';
import { Mission } from './mission';
import { Employee } from './employee';

export interface Affectation {
  id: number;
  voiture_id: number;
  mission_id: number;
  technicien_id: number | null;
  cree_par: number;
  voiture?: Voiture;
  mission?: Mission;
  employee?: Employee;
  date_debut: string;
  date_fin: string | null;
  kilometrage_depart: number | null;
  kilometrage_retour: number | null;
  statut: 'active' | 'terminee' | 'annulee';
  created_at: string;
}
