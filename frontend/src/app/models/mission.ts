export interface Mission {
  id: number;
  description: string;
  destination: string;
  capacite_minimale: number | null;
  type_vehicule: string;
  date_depart: string;
  date_retour: string;
}
