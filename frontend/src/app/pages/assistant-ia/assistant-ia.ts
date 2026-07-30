import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MissionService } from '../../services/mission';
import { ChatService } from '../../services/chat';
import { AffectationService } from '../../services/affectation';
import { Mission } from '../../models/mission';

interface MessageChat {
  auteur: 'moi' | 'ia';
  texte: string;
  vehiculeSuggere?: any;
  missionId?: number;
}

@Component({
  selector: 'app-assistant-ia',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './assistant-ia.html',
  styleUrl: './assistant-ia.css'
})
export class AssistantIa implements OnInit {
  private missionService = inject(MissionService);
  private chatService = inject(ChatService);
  private affectationService = inject(AffectationService);
  private router = inject(Router);

  missions: Mission[] = [];
  missionChoisie: number | null = null;
  messageLibre = '';
  messages: MessageChat[] = [
    { auteur: 'ia', texte: "Bonjour ! Pose-moi une question sur la flotte, ou choisis une mission pour une recommandation précise." }
  ];
  loading = false;
  erreurChargement = '';

  ngOnInit() {
    this.missionService.getAll().subscribe({
      next: (res: any) => this.missions = res.data || res,
      error: () => this.erreurChargement = "Impossible de charger les missions."
    });
  }

  // --- SOLUTION 1 : Envoi du message avec l'historique complet ---
  envoyerLibre() {
    const texte = this.messageLibre.trim();
    if (!texte || this.loading) return;

    this.messages.push({ auteur: 'moi', texte });
    this.messageLibre = '';
    this.loading = true;

    // Transmet le message ET l'historique des échanges
    this.chatService.envoyer(texte, this.messages).subscribe({
      next: (res) => {
        this.loading = false;
        this.messages.push({ auteur: 'ia', texte: res.reponse });
      },
      error: () => {
        this.loading = false;
        this.messages.push({
          auteur: 'ia',
          texte: "Le service IA est momentanément indisponible."
        });
      }
    });
  }

  // Demande de recommandation de véhicule pour une mission
  demanderRecommandation() {
    if (!this.missionChoisie || this.loading) return;
    const mission = this.missions.find(m => m.id === Number(this.missionChoisie))!;

    this.messages.push({
      auteur: 'moi',
      texte: `Quel véhicule pour la mission "${mission.destination}" ?`
    });

    this.loading = true;

    this.missionService.recommander(this.missionChoisie).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.succes && res.vehicule_recommande) {
          this.messages.push({
            auteur: 'ia',
            texte: `🚗 Véhicule recommandé : ${res.vehicule_recommande.marque} ${res.vehicule_recommande.modele} (${res.vehicule_recommande.immatriculation}) — ${res.justification || 'Disponible pour les dates prévues.'}`,
            vehiculeSuggere: res.vehicule_recommande,
            missionId: mission.id
          });
        } else {
          this.messages.push({
            auteur: 'ia',
            texte: res.message || "Aucun véhicule correspondant trouvé."
          });
        }
      },
      error: (err) => {
        this.loading = false;
        this.messages.push({
          auteur: 'ia',
          texte: err.error?.message || "Erreur lors de la recommandation."
        });
      }
    });
  }

  // --- SOLUTION 2 : Action explicite pour valider/réserver la mission ---
  faireDemande(msg: MessageChat) {
    if (!msg.vehiculeSuggere || !msg.missionId) return;

    this.loading = true;
    const payload = {
      mission_id: msg.missionId,
      voiture_id: msg.vehiculeSuggere.id,
      statut: 'en_attente' // ou 'active' selon votre logique
    };

    this.affectationService.create(payload).subscribe({
      next: () => {
        this.loading = false;
        this.messages.push({
          auteur: 'ia',
          texte: `✅ Votre demande d'affectation pour le véhicule ${msg.vehiculeSuggere.marque} ${msg.vehiculeSuggere.modele} a été enregistrée avec succès !`
        });
      },
      error: (err) => {
        this.loading = false;
        this.messages.push({
          auteur: 'ia',
          texte: err.error?.message || "Échec de l'enregistrement de la demande d'affectation."
        });
      }
    });
  }
}
