export interface Voiture {
  id: number;
  immatriculation: string;
  marque: string;
  modele: string;
  kilometrage: number;
  statut: 'disponible' | 'en_mission' | 'en_maintenance' | 'hors_service'; // corrigé
  capacite: number | null;
  categorie: string | null;
}
