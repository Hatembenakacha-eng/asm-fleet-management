export interface Mission {
  id: number;
  destination: string;
  capacite_minimale: number | null;
  type_vehicule: string | null;
  date_debut: string;
  date_fin: string;
  statut: 'planifiee' | 'en_cours' | 'terminee';
}
