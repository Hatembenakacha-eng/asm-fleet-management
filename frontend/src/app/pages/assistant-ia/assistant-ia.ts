import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MissionService } from '../../services/mission';
import { ChatService } from '../../services/chat';
import { AffectationService } from '../../services/affectation';
import { Auth } from '../../services/auth';
import { Mission } from '../../models/mission';

interface MessageChat {
  auteur: 'moi' | 'ia';
  texte: string;
  vehiculeSuggere?: any;
  missionId?: number | null;
  destination?: string;
  dateDebut?: string;
  dateFin?: string;
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
  private auth = inject(Auth);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  missions: Mission[] = [];
  missionChoisie: number | null = null;
  messageLibre = '';
  messages: MessageChat[] = [
    { auteur: 'ia', texte: "Bonjour ! Pose-moi une question sur la flotte, ou demande une réservation directement." }
  ];
  loading = false;
  erreurChargement = '';

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.chargerMissions();
    }
  }

  chargerMissions() {
    this.missionService.getAll().subscribe({
      next: (res: any) => { this.missions = res.data || res; this.cdr.detectChanges(); },
      error: () => { this.erreurChargement = "Impossible de charger les missions."; this.cdr.detectChanges(); }
    });
  }

  envoyerLibre() {
    const texte = this.messageLibre.trim();
    if (!texte || this.loading) return;

    this.messages.push({ auteur: 'moi', texte });
    this.messageLibre = '';
    this.loading = true;
    this.cdr.detectChanges(); // Affiche immédiatement le message envoyé + l'indicateur de chargement

    this.chatService.envoyer(texte, this.messages).subscribe({
      next: (res: any) => {
        this.loading = false;

        const nouveauMessage: MessageChat = {
          auteur: 'ia',
          texte: res.reponse || res.message,
          vehiculeSuggere: res.vehicule_recommande || res.vehicule || null,
          missionId: res.mission_id || null,
          destination: res.destination || '',
          dateDebut: res.date_debut || '',
          dateFin: res.date_fin || ''
        };

        this.messages.push(nouveauMessage);
        this.cdr.detectChanges(); // Affiche la réponse de l'IA sans attendre une interaction

        // Si l'IA signale une réservation automatique
        if (res.auto_reserver && nouveauMessage.vehiculeSuggere) {
          this.faireDemande(nouveauMessage);
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.messages.push({
          auteur: 'ia',
          texte: "Le service IA est momentanément indisponible."
        });
        this.cdr.detectChanges();
      }
    });
  }

  demanderRecommandation() {
    if (!this.missionChoisie || this.loading) return;
    const mission = this.missions.find(m => m.id === Number(this.missionChoisie))!;

    this.messages.push({
      auteur: 'moi',
      texte: `Quel véhicule pour la mission "${mission.destination}" ?`
    });

    this.loading = true;
    this.cdr.detectChanges();

    this.missionService.recommander(this.missionChoisie).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.succes && res.vehicule_recommande) {
          this.messages.push({
            auteur: 'ia',
            texte: `🚗 Véhicule recommandé : ${res.vehicule_recommande.marque} ${res.vehicule_recommande.modele} (${res.vehicule_recommande.immatriculation})`,
            vehiculeSuggere: res.vehicule_recommande,
            missionId: mission.id,
            destination: mission.destination
          });
        } else {
          this.messages.push({
            auteur: 'ia',
            texte: res.message || "Aucun véhicule correspondant trouvé."
          });
        }
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.loading = false;
        this.messages.push({
          auteur: 'ia',
          texte: err.error?.message || "Erreur lors de la recommandation."
        });
        this.cdr.detectChanges();
      }
    });
  }

  // Traitement et envoi sécurisé de la demande vers Laravel
  faireDemande(msg: MessageChat) {
    if (!msg.vehiculeSuggere || this.loading) return;

    const vehiculeSauvegarde = msg.vehiculeSuggere;
    this.loading = true;

    // Dates par défaut sécurisées au format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    // Nettoyage pour remplacer les chaînes non valides comme "non_precisee"
    const validerValeur = (val: string | undefined, fallback: string) => {
      return (val && val.trim() !== '' && val !== 'non_precisee') ? val : fallback;
    };

    const payload = {
      voiture_id: vehiculeSauvegarde.id,
      mission_id: msg.missionId || 0,
      destination: validerValeur(msg.destination, 'Mission locale'),
      date_debut: validerValeur(msg.dateDebut, today),
      date_fin: validerValeur(msg.dateFin, tomorrow),
      statut: 'en_attente'
    };

    console.log('🚀 Envoi effectif de la réservation à Laravel :', payload);

    this.affectationService.create(payload).subscribe({
      next: (res: any) => {
        this.loading = false;
        msg.vehiculeSuggere = null; // Supprime le bouton une fois la demande validée en BDD

        this.chargerMissions(); // Actualiser la liste

        this.messages.push({
          auteur: 'ia',
          texte: `✅ [BDD Confirmée] La demande d'affectation pour le véhicule ${vehiculeSauvegarde.marque} a été enregistrée avec succès dans la base de données !`
        });
        this.cdr.detectChanges(); // Affiche immédiatement la confirmation, sans quoi la demande "semble" ne jamais partir
      },
      error: (err: any) => {
        this.loading = false;
        console.error('❌ Échec Laravel :', err);
        this.messages.push({
          auteur: 'ia',
          texte: `❌ Erreur BDD : ${err.error?.message || "Échec de l'enregistrement dans la base de données."}`
        });
        this.cdr.detectChanges();
      }
    });
  }
}
