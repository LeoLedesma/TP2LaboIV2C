import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { HistoriaClinicaService } from 'src/app/services/historia-clinica.service';
import { HistoriaClinica } from '../../models/historiaClinica';
import { UsuariosService } from '../../services/usuarios.service';



@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent implements OnInit {

  historia!: HistoriaClinica
  openAll = true
  especialistasId: string[] = []
  especialistas: Usuario[] = [];
  
  @ViewChild('invoice') invoiceElement!: ElementRef;
  constructor(private auth: AuthService, private historiaClinica: HistoriaClinicaService, private usuariosService: UsuariosService) { }
  ngOnInit(): void {
    this.historiaClinica.getByPaciente(this.auth.usuarioLogueado!.id_user).then(data => {
      data.registros.forEach(element => element.fecha = new Date((element.fecha as unknown as Timestamp).toMillis()))

      this.historia = data
      console.log(this.historia)

      this.especialistasId = data.registros.map(registro => registro.id_especialista!)
      this.getEspecialistas();
    })
  }

  step = -1;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  private getEspecialistas() {
    this.usuariosService.getUsuarios(this.especialistasId).then(data => {
      this.especialistas = data
    })
  }

  getEspecialista(id_especialista: string) {
    return this.especialistas.find(e => e.id_user == id_especialista)!.nombre + " " + this.especialistas.find(e => e.id_user == id_especialista)!.apellido
  }


  // async GenerarPDF()
  // {
  //   let diaGeneracion = new Date();    
  //   let propiedades : Array<string[]> = [['Especialista', 'Especialidad','Fecha','Altura','Peso', 'Temperatura','Presiones', 'Otros datos']];
  //   let datos: Array<any> = []

  //   for(let registro of this.historia.registros)
  //   {
  //     let fila = [this.getEspecialista(registro.id_especialista!), registro.especialidad, registro.fecha.toLocaleDateString(), registro.altura, registro.peso, registro.temperatura, 'Diastolica: ' + registro.presion.diastolica + ' Sistolica: ' + registro.presion.sistolica, registro.claveValor.join(', ').replace(/,/g, '\n')];
  //     datos.push(fila);
  //   }

  //   // let pdf = {

  //   // }

  //   const pdf = pdfMake.createPdf


  // }

  public generatePDF(): void {

    // this.accordion.openAll()
    html2canvas(this.invoiceElement.nativeElement, { scale: 3 }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 200;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
      PDF.html(this.invoiceElement.nativeElement.innerHTML)
      PDF.save('angular-invoice-pdf-demo.pdf');
    });
    // this.accordion.closeAll()
  }



}
