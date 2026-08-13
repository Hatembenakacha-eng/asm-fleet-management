import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { User } from '../../models/user';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil.html',
  styleUrl: './profil.css'
})
export class Profil implements OnInit {
  public auth = inject(Auth);
  private cdr = inject(ChangeDetectorRef);
  user: User | null = null;

  isEditingProfile = false;
  showPasswordModal = false;

  profileData = { name: '', email: '' };
  passwordData = { current_password: '', new_password: '', new_password_confirmation: '' };

  messageSuccess = '';
  messageError = '';

  ngOnInit() {
    this.auth.currentUser$.subscribe(u => {
      this.user = u;
      if (u && !this.isEditingProfile) {
        this.profileData = { name: u.name, email: u.email };
      }
      this.cdr.detectChanges();
    });
  }

  toggleEditProfile() {
    this.isEditingProfile = !this.isEditingProfile;
    if (!this.isEditingProfile && this.user) {
      this.profileData = { name: this.user.name, email: this.user.email };
    }
  }

  saveProfile() {
    this.messageSuccess = '';
    this.messageError = '';

    this.auth.updateProfile(this.profileData).subscribe({
      next: () => {
        this.isEditingProfile = false;
        this.messageSuccess = 'Profil mis à jour avec succès !';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.messageError = err.error?.message || 'Erreur lors de la mise à jour.';
        this.cdr.detectChanges();
      }
    });
  }

  togglePasswordModal() {
    this.showPasswordModal = !this.showPasswordModal;
    this.passwordData = { current_password: '', new_password: '', new_password_confirmation: '' };
  }

  updatePassword() {
    this.messageSuccess = '';
    this.messageError = '';

    if (this.passwordData.new_password !== this.passwordData.new_password_confirmation) {
      this.messageError = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.auth.updatePassword(this.passwordData).subscribe({
      next: () => {
        this.messageSuccess = 'Mot de passe modifié avec succès !';
        this.togglePasswordModal();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.messageError = err.error?.message || 'Erreur lors de la modification.';
        this.cdr.detectChanges();
      }
    });
  }
}
