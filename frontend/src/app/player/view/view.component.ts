import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../player.service';
import { Player } from './../player';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent {
  id!: number;
  name!: string;
  team!: string;
  position!: string;
  pnumber!: number;
  nationality!: string;
  age!: number;
  form!: FormGroup;
  player!: Player;

  constructor(
    public playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['playerId'];

    this.playerService.find(this.id).subscribe((data: any) => {
      this.player = data;
    });
  }
}
