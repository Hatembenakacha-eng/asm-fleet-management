import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MissionService } from '../../services/mission';
import { ChatService } from '../../services/chat';
import { Mission } from '../../models/mission';

interface MessageChat { auteur: 'moi' | 'ia'; texte: string; }

@Component({ selector: 'app-assistant-ia', standalone: true, imports: [FormsModule], templateUrl: './assistant-ia.html' })
export class AssistantIa implements OnInit {
  private missionService = inject(MissionService);
  private chatService = inject(ChatService);

  missions: Mission[] = [];
  missionChoisie: number | null = null;
  messageLibre = '';
  messages: MessageChat[] = [{ auteur: 'ia', texte: "Bonjour ! Pose-moi une question sur la flotte, ou choisis une mission pour une recommandation précise." }];
  loading = false;
  erreurChargement = '';

  ngOnInit() {
    this.missionService.getAll().subscribe({
      next: res => this.missions = res.data,
      error: () => this.erreurChargement = "Impossible de charger les missions."
    });
  }

  envoyerLibre() {
    const texte = this.messageLibre.trim();
    if (!texte || this.loading) return;
    this.messages.push({ auteur: 'moi', texte });
    this.messageLibre = '';
    this.loading = true;
    this.chatService.envoyer(texte).subscribe({
      next: (res) => { this.loading = false; this.messages.push({ auteur: 'ia', texte: res.reponse }); },
      error: () => { this.loading = false; this.messages.push({ auteur: 'ia', texte: "Le service IA est momentanément indisponible." }); }
    });
  }

  demanderRecommandation() {
    if (!this.missionChoisie || this.loading) return;
    const mission = this.missions.find(m => m.id === this.missionChoisie)!;
    this.messages.push({ auteur: 'moi', texte: `Quel véhicule pour la mission "${mission.destination}" ?` });
    this.loading = true;
    this.missionService.recommander(this.missionChoisie).subscribe({
      next: (res) => {
        this.loading = false;
        const texte = res.succes
          ? `🚗 ${res.vehicule_recommande.marque} ${res.vehicule_recommande.modele} (${res.vehicule_recommande.immatriculation}) — ${res.justification} [${res.source === 'ia' ? 'IA' : 'secours'}]`
          : res.message;
        this.messages.push({ auteur: 'ia', texte });
      },
      error: (err) => { this.loading = false; this.messages.push({ auteur: 'ia', texte: err.error?.message || "Erreur lors de la recommandation." }); }
    });
  }
}
