import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlaticonService {

  private apiUrl: string = "https://cdn-icons-png.flaticon.com/512/";

  constructor(private http: HttpClient) { }

  async getImage(category: string) {
    let iconId: string | number;

    switch (category) {
      case "society_and_culture":
        iconId = "2483/2483851.png";
        break;
      case "film_and_tv":
        iconId = '7293/7293033.png'
        break;
      case "music":
        iconId = '4516/4516819.png'
        break;
      case "science":
        iconId = '2117/2117782.png'
        break;
      case "entertainment":
        iconId = "143/7143983.png"
        break;
      case "general_knowledge":
        iconId = "12282/12282443.png"
        break;
      case "history":
        iconId = "3172/3172747.png"
        break;
      case "sport_and_leisure":
        iconId = "439/4439426.png";
        break;
      case "geography":
        iconId = "290/290336.png";
        break;
      case "arts_and_literature":
        iconId = "1048/1048944.png";
        break;
      default:
        iconId = "7293/7293033.png"
        break;
    }

    return this.http.get(this.apiUrl + iconId, { responseType: 'blob' })    
  }
}
