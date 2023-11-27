import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportsService {

  constructor() { }

  generateSpreadSheet(data:any, title:string){
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, 'Hoja 1');

    XLSX.writeFile(wb, `${title}.xlsx`);
  }
}
