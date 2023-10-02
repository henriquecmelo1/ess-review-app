import { Component, Input, OnInit, NgModule } from '@angular/core';
import { User } from '@prisma/client';
import { Observable, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'following-list',
  templateUrl: './following-list.component.html',
  styleUrls: ['./following-list.component.scss']
})
export class FollowingListComponent implements OnInit {
  @Input() currentUser: User = {} as User;
  id: number | null = null;

  followerCount$: Observable<number> = of(0);
  isFollowing$: Observable<boolean> = of(false);
  followers$: Observable<User[]> = of([]);
  following$: Observable<User[]> = of([]);

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    const currentUserId = this.currentUser.id;

    this.authService.getUserData().subscribe({
      next: (currentUser) => {
        this.id = currentUser.id;
      },
      error: (error) => {
        console.error("Erro ao obter o usuário", error);
      }
    });

    this.userService.isFollowing(currentUserId, currentUserId).subscribe((isFollowing: boolean) => {
      this.isFollowing$ = of(isFollowing);
    });

    this.userService.getFollowersCount(currentUserId).subscribe((count: number) => {
      this.followerCount$ = of(count);
    });

    this.userService.getFollowers(currentUserId).subscribe((followers: User[]) => {
      this.followers$ = of(followers);
    });

    this.userService.getFollowing(currentUserId).subscribe((following: User[]) => {
      this.following$ = of(following);
    });
  }
}

@NgModule({
  declarations: [FollowingListComponent],
  imports: [CommonModule],
  exports: [FollowingListComponent]
})
export class FollowingListModule {}
