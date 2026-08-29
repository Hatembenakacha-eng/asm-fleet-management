import { Injectable } from '@angular/core';

export interface MessageChat {
  auteur: 'moi' | 'ia';
  texte: string;
  vehiculeSuggere?: any;
  missionId?: number | null;
  destination?: string;
  dateDebut?: string;
  dateFin?: string;
  informationsCompletes?: boolean;
}

const CLE_HISTORIQUE = 'asm_chat_historique';
const MESSAGE_ACCUEIL: MessageChat = {
  auteur: 'ia',
  texte: "Bonjour ! Pose-moi une question sur la flotte, ou demande une réservation directement."
};

@Injectable({ providedIn: 'root' })
export class ChatStateService {
  messages: MessageChat[] = this.chargerDepuisStockage() ?? [MESSAGE_ACCUEIL];

  ajouter(message: MessageChat): void {
    this.messages.push(message);
    this.sauvegarder();
  }

  reinitialiser(): void {
    this.messages = [MESSAGE_ACCUEIL];
    this.sauvegarder();
  }

  private sauvegarder(): void {
    sessionStorage.setItem(CLE_HISTORIQUE, JSON.stringify(this.messages));
  }

  private chargerDepuisStockage(): MessageChat[] | null {
    const brut = sessionStorage.getItem(CLE_HISTORIQUE);
    if (!brut) return null;
    try {
      const parsed = JSON.parse(brut);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
    } catch {
      return null;
    }
  }
}
