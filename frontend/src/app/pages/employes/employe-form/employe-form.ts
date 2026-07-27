import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employee';

@Component({
  selector: 'app-employe-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employe-form.html' })
  
export class EmployeForm implements OnInit {
  private service = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  id: number | null = null;
  nom = ''; specialite = ''; contact = ''; disponible = true;
  erreurs: string[] = [];

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) { this.id = +idParam; this.service.getOne(this.id).subscribe(res => Object.assign(this, res.data)); }
  }
  onSubmit() {
    const payload = { nom: this.nom, specialite: this.specialite, contact: this.contact, disponible: this.disponible };
    const obs = this.id ? this.service.update(this.id, payload) : this.service.create(payload);
    obs.subscribe(() => this.router.navigate(['/employes']));
  }
  annuler(): void {
  this.router.navigate(['/employes']);
}
}
