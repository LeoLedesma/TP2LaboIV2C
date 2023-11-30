import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { HistoriaClinica } from 'src/app/models/historiaClinica';
import { Usuario } from 'src/app/models/usuario';


@Component({
  selector: 'app-listado-historia',
  templateUrl: './listado-historia.component.html',
  styleUrls: ['./listado-historia.component.scss']
})
export class ListadoHistoriaComponent implements OnInit, OnChanges {
  
  @Input() historia!: HistoriaClinica    
  @Input() especialistas: Usuario[] = [];
  @ViewChild('invoice') invoiceElement!: ElementRef;
  date:Date = new Date()
  
  constructor() { }

  ngOnInit(): void {   
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['historia']?.currentValue !== changes['historia']?.previousValue) {    
     this.historia = changes['historia']?.currentValue
    }

  }

  getEspecialista(id: string) {
    let especialista = this.especialistas.find(e => e.id_user === id)
    if (especialista) {
      return especialista.nombre + " " + especialista.apellido
    }
    return 'S/D'
  }

  getEspecialistasNombre() {
    return this.especialistas.filter(e => e.nombre + " " + e.apellido)
  }

  getPresion(presion:{sistolica:number,diastolica:number}){
    return presion.sistolica + "/" + presion.diastolica
  }

  getClaves(claveValor:{clave:string,valor:string}[]){
    
    let hola = claveValor.map(e => e.clave + ': ' + e.valor)
    
    .join(', ').replace(/,/g, '\n')
    
    return hola
  }

  
  public generatePDF(): void {

    // this.accordion.openAll()
    console.log(this.invoiceElement.nativeElement)
    let element = this.invoiceElement.nativeElement as HTMLElement;
    


    html2canvas(this.invoiceElement.nativeElement, { scale: 3 }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 200;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
      PDF.html(this.invoiceElement.nativeElement.innerHTML)
      PDF.save('Historia clinica.pdf');
    });
    // this.accordion.closeAll()
  }


}
