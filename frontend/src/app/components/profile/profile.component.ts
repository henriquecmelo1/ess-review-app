import { Component, Input, OnInit } from '@angular/core';
import { User } from 'app/models/userModel';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { ContentModel } from '../../models/content';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() user: User = {} as User; // The user that can be followed
  @Input() currentUser: User = {} as User; // Logged in user
  followingCount$: Observable<number> = of(0);
  followerCount$: Observable<number> = of(0);
  isFollowing$: Observable<boolean> = of(false);
  followers$: Observable<User[]> = of([]);
  following$: Observable<User[]> = of([]);
  contentDto = new ContentModel();
  username: string | null = null;
  email: string | null = null;
  id: number= 0;
  followButtonText: string = 'Seguir';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.user.id;

    this.authService.getUserData().subscribe({
      next: (currentUser) =>{
        this.username = currentUser.username;
        this.email = currentUser.email
        this.id = currentUser.id
      },
      error: (error) =>{
        console.error("Erro ao obter o usuário", error);
      }
    })

    // Verifies if the currently logged in user is following this user.
    this.userService.isFollowing(this.id, userId).subscribe((isFollowing: boolean) => {
      this.isFollowing$ = of(isFollowing);
    });

    // Retrieves the follower count for the user's profile.
    this.userService.getFollowersCount(this.id).subscribe((count: number) => {
      this.followerCount$ = of(count);
    });

    this.userService.getFollowingCount(this.id).subscribe((count: number) => {
      this.followingCount$ = of(count);
    });

    // Retrieves the user's followers.
    this.userService.getFollowers(this.id).subscribe((followers: User[]) => {
      this.followers$ = of(followers);
    });

    // Retrieves the users that this user is following.
    this.userService.getFollowing(this.id).subscribe((following: User[]) => {
      this.following$ = of(following);
    });
  }


  toggleFollow() {
    const userId = this.user.id;
    const currentUserId = this.id;
  
    this.userService.isFollowing(currentUserId, userId).subscribe((isFollowing: boolean) => {
      if (isFollowing) {
        // Unfollow the user
        this.userService.removeFollower(userId, currentUserId).subscribe(() => {
          this.isFollowing$ = of(false);
          this.followerCount$ = this.followerCount$.pipe(map(count => count - 1));
          this.followButtonText = 'Seguir'; // Atualiza o texto do botão para "Seguir"
        });
      } else {
        // Follow the user
        this.userService.addFollower(userId, currentUserId).subscribe(() => {
          this.isFollowing$ = of(true);
          this.followerCount$ = this.followerCount$.pipe(map(count => count + 1));
          this.followButtonText = 'Parar de Seguir'; // Atualiza o texto do botão para "Parar de Seguir"
        });
      }
    });
  }

  Content(contentDto: ContentModel) {
    return this.authService.createContent(contentDto).subscribe();
  }

  redirectToHome(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

  redirectToCreateContent(event: Event) {
    event.preventDefault();
    this.router.navigate(['create-content']);
  }
  redirectToFollowingPage(event: Event) {
    event.preventDefault();
    this.router.navigate(['/following']); // Substitua '/seguindo' pelo URL real da sua página "Seguindo".
  }

  redirectToFollowersPage(event: Event) {
    event.preventDefault();
    this.router.navigate(['/followers']); // Substitua '/seguidores' pelo URL real da sua página "Seguidores".
  }
}
