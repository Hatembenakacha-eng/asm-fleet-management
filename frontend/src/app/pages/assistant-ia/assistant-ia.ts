import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VoitureService } from '../../services/voiture';
import { ChatService } from '../../services/chat';
import { AffectationService } from '../../services/affectation';
import { Auth } from '../../services/auth';
import { ChatStateService, MessageChat } from '../../services/chat-state';
import { Voiture } from '../../models/voiture';

@Component({
  selector: 'app-assistant-ia',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './assistant-ia.html',
  styleUrl: './assistant-ia.css'
})
export class AssistantIa implements OnInit {
  private voitureService = inject(VoitureService);
  private chatService = inject(ChatService);
  private affectationService = inject(AffectationService);
  private auth = inject(Auth);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private chatState = inject(ChatStateService);

  voitures: Voiture[] = [];
  voitureChoisie: number | null = null;
  messageLibre = '';
  loading = false;
  erreurChargement = '';

  get messages(): MessageChat[] {
    return this.chatState.messages;
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      const voitureDepuisAccueil = Number(this.route.snapshot.queryParamMap.get('voiture')) || null;

      this.voitureService.getAll('disponible').subscribe({
        next: (res: any) => {
          this.voitures = res.data || res;
          this.cdr.detectChanges();

          // Arrivée depuis la carte "Véhicules disponibles" de l'accueil : on amorce directement la demande.
          if (voitureDepuisAccueil && this.voitures.some(v => v.id === voitureDepuisAccueil)) {
            this.voitureChoisie = voitureDepuisAccueil;
            this.demanderPourVehicule();
            this.router.navigate([], { relativeTo: this.route, queryParams: {} });
          }
        },
        error: () => { this.erreurChargement = "Impossible de charger les véhicules."; this.cdr.detectChanges(); }
      });
    }
  }

  private chargerVoituresDisponibles() {
    this.voitureService.getAll('disponible').subscribe({
      next: (res: any) => { this.voitures = res.data || res; this.cdr.detectChanges(); },
      error: () => { this.erreurChargement = "Impossible de charger les véhicules."; this.cdr.detectChanges(); }
    });
  }

  envoyerLibre() {
    const texte = this.messageLibre.trim();
    if (!texte || this.loading) return;

    this.chatState.ajouter({ auteur: 'moi', texte });
    this.messageLibre = '';
    this.loading = true;
    this.cdr.detectChanges();

    this.chatService.envoyer(texte, this.messages).subscribe({
      next: (res: any) => {
        this.loading = false;

        this.chatState.ajouter({
          auteur: 'ia',
          texte: res.reponse || res.message || "Le service IA n'a pas renvoyé de réponse. Réessayez.",
          vehiculeSuggere: res.vehicule_recommande || res.vehicule || null,
          missionId: res.mission_id || null,
          destination: res.destination || '',
          dateDebut: res.date_debut || '',
          dateFin: res.date_fin || '',
          informationsCompletes: !!res.informations_completes
        });
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.chatState.ajouter({
          auteur: 'ia',
          texte: "Le service IA est momentanément indisponible."
        });
        this.cdr.detectChanges();
      }
    });
  }

  demanderPourVehicule() {
    if (!this.voitureChoisie || this.loading) return;
    const voiture = this.voitures.find(v => v.id === Number(this.voitureChoisie));
    if (!voiture) return;

    this.messageLibre =
      `Je voudrais réserver le véhicule ${voiture.marque} ${voiture.modele} (${voiture.immatriculation}).`;
    this.envoyerLibre();
  }

  faireDemande(msg: MessageChat) {
    if (!msg.vehiculeSuggere || this.loading) return;

    const vehiculeSauvegarde = msg.vehiculeSuggere;
    this.loading = true;

    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

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

    this.affectationService.create(payload).subscribe({
      next: () => {
        this.loading = false;
        msg.vehiculeSuggere = null;

        this.chargerVoituresDisponibles();

        this.chatState.ajouter({
          auteur: 'ia',
          texte: `Votre demande d'affectation pour le véhicule ${vehiculeSauvegarde.marque} a bien été enregistrée !`
        });
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.loading = false;
        this.chatState.ajouter({
          auteur: 'ia',
          texte: `Erreur : ${this.messageErreurLisible(err, "Échec de l'enregistrement de la demande.")}`
        });
        this.cdr.detectChanges();
      }
    });
  }

  private messageErreurLisible(err: any, repli: string): string {
    const message = err?.error?.message;
    return (typeof message === 'string' && message.length > 0 && message.length < 200) ? message : repli;
  }
}
