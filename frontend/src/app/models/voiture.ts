export interface Voiture {
  id: number;
  immatriculation: string;
  marque: string;
  modele: string;
  kilometrage: number;
  statut: 'disponible' | 'en_mission' | 'en_maintenance' | 'hors_service';
  capacite: number | null;
  categorie: string | null;
  image_url?: string | null;
}
