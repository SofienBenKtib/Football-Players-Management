import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { PlayerService } from '../player.service';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  form!: FormGroup;
  constructor(public playerService: PlayerService, private router: Router) {}
  ngOnInit(): void {
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
    this.playerService.create(this.form.value).subscribe((res: any) => {
      console.log('Post created successfully!');
      this.router.navigateByUrl('player/index');
    });
  }
}
