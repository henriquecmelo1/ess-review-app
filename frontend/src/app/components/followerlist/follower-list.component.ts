import { Component, Input, OnInit, NgModule } from '@angular/core';
import { User } from '@prisma/client';
import { Observable, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'follower-list',
  templateUrl: './follower-list.component.html',
  styleUrls: ['./follower-list.component.scss']
})
export class FollowersListComponent implements OnInit {
  @Input() currentUser: User = {} as User; // Usuário logado
  id: number | null = null; // Adicione esta propriedade

  followerCount$: Observable<number> = of(0);
  isFollowing$: Observable<boolean> = of(false);
  followers$: Observable<User[]> = of([]);
  following$: Observable<User[]> = of([]);

  constructor(private userService: UserService, private authService: AuthService) {} // Corrija a injeção do serviço AuthService

  ngOnInit() {
    const currentUserId = this.currentUser.id; // Obtém o ID do usuário logado

    this.authService.getUserData().subscribe({
      next: (currentUser) => {
        this.id = currentUser.id;
      },
      error: (error) => {
        console.error("Erro ao obter o usuário", error);
      }
    });

    // Verifica se o usuário logado está seguindo este usuário (você pode manter esse trecho, se necessário).
    this.userService.isFollowing(currentUserId, currentUserId).subscribe((isFollowing: boolean) => {
      this.isFollowing$ = of(isFollowing);
    });

    // Recupera a contagem de seguidores para o perfil do usuário logado.
    this.userService.getFollowersCount(currentUserId).subscribe((count: number) => {
      this.followerCount$ = of(count);
    });

    // Recupera os seguidores do usuário logado.
    this.userService.getFollowers(currentUserId).subscribe((followers: User[]) => {
      this.followers$ = of(followers);
    });

    // Recupera os usuários que o usuário logado está seguindo.
    this.userService.getFollowing(currentUserId).subscribe((following: User[]) => {
      this.following$ = of(following);
    });
  }
}

@NgModule({
  declarations: [FollowersListComponent],
  imports: [CommonModule],
  exports: [FollowersListComponent]
})
export class FollowersListModule {}
