import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  title: string = 'Giants, Wizards, Elves';
  message?: string = undefined;
  constructor(private gameSvc: GameService,
  ) { }

  ngOnInit(): void {
  }

  play(userChoice: string): void {
    this.gameSvc.playGame(userChoice).subscribe({
      next: (response) => {
        this.message = response.message;
      },
        error: (err) => {
          this.message = 'Invalid choice. Please try again.'+ err.message;
        },
        complete: () => {},
      });
  }
}
