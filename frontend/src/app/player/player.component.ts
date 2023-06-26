import { Component } from '@angular/core';
import { TennisService } from '../tennis.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-result',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  players: any[] = [];
  popup = "none";
  func: string | undefined;
  name: string | undefined;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    ranking: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required),
    hand: new FormControl('', Validators.required),
    titles: new FormControl('', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  resetForm() {
    this.form.reset();
  }

  constructor(private tennisService: TennisService) {
    this.getPlayers();
  }

  openPopup(funcName: string, id: string = "") {
    this.popup = "block";
    this.func = funcName;
    if (typeof id !== "undefined") {
      this.name = id;
    }
  }

  closePopup() {
    this.popup = "none";
    this.func = undefined;
    this.name = undefined;
    this.resetForm();
  }

  getPlayers(): void {
    this.tennisService.getPlayers().subscribe((players: any) => {
      this.players = players;
    });
  }

  removePlayer(name: string): void {
    this.tennisService.deletePlayer(name).subscribe((response: any) => {
      this.players = this.players.filter(val => val.name !== name);
    });
  }

  sendData(): void {
    if (this.form.status === 'VALID') {
      console.log(this.form.value);
    }

    if (this.func === "add") {
      this.tennisService.addPlayer(this.form.value).subscribe((response: any) => {
        this.players = this.players.concat(response);
        this.closePopup();
      })
    }
    else if (this.func === "update") {
      this.tennisService.updatePlayer(this.name, this.form.value).subscribe((response: any) => {
        this.closePopup();
        window.location.reload();
      })
    }
  }

  sortBy(col: String): void {
    this.tennisService.sortBy(col).subscribe((players: any) => {
      this.players = players;
    });
  }

}
