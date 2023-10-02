import { Component, Input, OnInit } from '@angular/core';
import { User } from '@prisma/client';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { ContentModel } from '../../models/content';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  @Input() user: User = {} as User; // O usuário que pode ser seguido
  @Input() currentUser: User = {} as User; // usuário logado
  followingCount$: Observable<number> = of(0);
  followerCount$: Observable<number> = of(0);
  isFollowing$: Observable<boolean> = of(false);
  followers$: Observable<User[]> = of([]);
  following$: Observable<User[]> = of([]);
  contentDto = new ContentModel();
  username: string | null = null;
  email: string | null = null;
  movies: ContentModel[] = [];
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}
  ngOnInit() {
    const userId = this.user.id;
    const currentUserId = this.currentUser.id;

    this.authService.getUserData().subscribe({
      next: (user) =>{
        this.username = user.username;
        this.email = user.email
      },
      error: (error) =>{
        console.error("Erro ao obter o usuário", error);
      }
    })
    this.authService.getMovie()
    .subscribe({
      next: (movie) => {
        this.movies = Array.isArray(movie) ? movie : [movie];
      },
      error: (error) =>{
        console.error("Erro ao obter o usuário", error);
      }
    })

    // Verifica se o usuário atualmente logado está seguindo este usuário.
    this.userService.isFollowing(currentUserId, userId).subscribe((isFollowing: boolean) => {
      this.isFollowing$ = of(isFollowing);
    });

    // Recupera a contagem de seguidores para o perfil do usuário.
    this.userService.getFollowersCount(currentUserId).subscribe((count: number) => {
      this.followerCount$ = of(count);
    });

    this.userService.getFollowingCount(currentUserId).subscribe((count: number) => {
      this.followingCount$ = of(count);
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

  get followButtonLabel(): Observable<string> {
    return this.isFollowing$.pipe(
      map(isFollowing => (isFollowing ? 'Parar de seguir' : 'Seguir'))
    );
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
      
    })}
    
  Content(contentDto: ContentModel){
    return this.authService.createContent(contentDto).subscribe()
  }
  redirectToHome(event: Event){
    event.preventDefault();
    this.router.navigate(['/']);
  }
  redirectToCreateContent(event: Event){
    event.preventDefault();
    this.router.navigate(['create-content']);
  }
  redirectToEditAccount(event: Event){
    event.preventDefault();
    this.router.navigate(['edit-account']);
  }

  logout() {
    localStorage.removeItem('jwtToken');
  
    this.router.navigate(['home']);
  }
}
