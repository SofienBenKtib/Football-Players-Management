import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { PlayerService } from '../player.service';
import { Player } from '../player';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
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
    this.form = new FormGroup({
      name: new FormControl(''),
      team: new FormControl(''),
      position: new FormControl(''),
      pnumber: new FormControl(''),
      nationality: new FormControl(''),
      age: new FormControl(''),
    });
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    console.log(this.form.value);
    this.playerService
      .update(this.id, this.form.value)
      .subscribe((res: any) => {
        console.log('Player updated successfully!');
        this.router.navigateByUrl('player/index');
      });
  }
}
