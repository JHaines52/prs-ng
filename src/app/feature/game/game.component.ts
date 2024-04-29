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
  board: string[][] = [];
  baseUrl = 'http://localhost:8080/api/tictactoe';

  constructor(private gameSvc: GameService,
  ) { }

  ngOnInit(): void {
    this.resetGame();
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
  makeMove(x: number, y: number): void {
    this.http.post<string>(`${this.baseUrl}/move`, {x, y}).subscribe(
      response => {
        this.getBoardState();
      },
      error => console.error('Error making move:', error)
    );
  }

  resetGame(): void {
    this.http.get<string>(`${this.baseUrl}/reset`).subscribe(
      response => {
        this.getBoardState();
      },
      error => console.error('Error resetting game:', error)
    );
  }

  getBoardState(): void {
    // Add a method to fetch the board state if you decide to store the state on the backend
  }
}


}
