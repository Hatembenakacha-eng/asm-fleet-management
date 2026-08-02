import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from '../../services/mission';

@Component({ selector: 'app-recommandation', standalone: true, imports: [], templateUrl: './recommandation.html' })
export class Recommandation implements OnInit {
  private service = inject(MissionService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  resultat: any = null; loading = true; erreur = '';

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.service.recommander(id).subscribe({
      next: (res) => { this.resultat = res; this.loading = false; this.cdr.detectChanges(); },
      error: (err) => { this.erreur = err.error?.message || 'Erreur.'; this.loading = false; this.cdr.detectChanges(); }
    });
  }
}
