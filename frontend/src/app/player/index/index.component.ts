import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PlayerService } from '../player.service';
import { Player } from '../player';
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  players: Player[] = [];
  constructor(public playerService: PlayerService, private router: Router) {}
  ngOnInit(): void {
    console.log(this.router.url);
    console.log(window.location.href);
    this.playerService.getAll().subscribe((data: any) => {
      this.players = data;
      console.log(this.players);
    });
  }

  deletePost(id: number) {
    this.playerService.delete(id).subscribe((res) => {
      this.players = this.players.filter((item) => item.id !== id);
      console.log('Player deleted successfully!');
    });
  }
}
