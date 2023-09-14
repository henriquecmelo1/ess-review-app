import { Component, Input, OnInit } from '@angular/core';
import { User } from '@prisma/client';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from 'app/services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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

  toggleFollow() {
    const userId = this.user.id;
    const currentUserId = this.currentUser.id;
  
    this.userService.isFollowing(currentUserId, userId).subscribe((isFollowing: boolean) => {
      if (isFollowing) {
        // Deixar de seguir o usuário
        this.userService.removeFollower(userId, currentUserId).subscribe(() => {
          this.isFollowing$ = of(false);
          this.followerCount$ = this.followerCount$.pipe(map(count => count - 1));
        });
      } else {
        // Seguir o usuário
        this.userService.addFollower(userId, currentUserId).subscribe(() => {
          this.isFollowing$ = of(true);
          this.followerCount$ = this.followerCount$.pipe(map(count => count + 1));
        });
      }
    });
  }
}
