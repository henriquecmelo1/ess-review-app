import { Component, Input, OnInit, NgModule } from '@angular/core'; // Importe o NgModule
import { User } from '@prisma/client';
import { Observable, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'follower-list',
  templateUrl: './follower-list.component.html',
  styleUrls: ['./follower-list.component.scss']
})
export class FollowersListComponent implements OnInit {
  @Input() user: User = {} as User; // O usuário que pode ser seguido
  @Input() currentUser: User = {} as User; // usuário logado

  followerCount$: Observable<number> = of(0);
  isFollowing$: Observable<boolean> = of(false);
  followers$: Observable<User[]> = of([]);
  following$: Observable<User[]> = of([]);

  constructor(private userService: UserService) {}

  ngOnInit() {
    const userId = this.user.id;
    const currentUserId = this.currentUser.id;

    // Verifica se o usuário atualmente logado está seguindo este usuário.
    this.userService.isFollowing(currentUserId, userId).subscribe((isFollowing: boolean) => {
      this.isFollowing$ = of(isFollowing);
    });

    // Recupera a contagem de seguidores para o perfil do usuário.
    this.userService.getFollowersCount(currentUserId).subscribe((count: number) => {
      this.followerCount$ = of(count);
    });

    // Recupera os seguidores do usuário.
    this.userService.getFollowers(currentUserId).subscribe((followers: User[]) => {
      this.followers$ = of(followers);
    });

    // Recupera os usuários que este usuário está seguindo.
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