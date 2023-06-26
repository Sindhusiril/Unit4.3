import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TennisService {

  constructor(private webReqService: WebRequestService) { }

  getPlayers() {
    return this.webReqService.get('list');
  }

  addPlayer(data: any) {
    return this.webReqService.post('addPlayer', data);
  }

  deletePlayer(plant_name: string) {
    return this.webReqService.delete(`deletePlayer/${plant_name}`);
  }

  updatePlayer(name: string | undefined, data: any) {
    return this.webReqService.patch(`updatePlayer/${name}`, data)
  }

  sortBy(col: String) {
    if (col == "Age") {
      return this.webReqService.get('sortByAge');
    } else if (col == "Titles") {
      return this.webReqService.get('sortByTitles');
    } else {
      return this.webReqService.get('sortByRanking');
    }
  }
}