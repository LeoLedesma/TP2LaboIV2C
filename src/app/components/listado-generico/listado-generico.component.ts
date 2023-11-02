import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-listado-generico',
  templateUrl: './listado-generico.component.html',
  styleUrls: ['./listado-generico.component.scss']
})
export class ListadoGenericoComponent implements OnInit,OnDestroy {

  _dataSource: any[] = []
  _dataSubscription!: Subscription;

  displayedColumnsName: string[] = []
  @Input() displayedColumns: { property: string, nameToShow: string }[] = [{ property: '', nameToShow: '' }];
  @Input() dataSource!: Observable<any[]>;
  @Output() onClicked: EventEmitter<any> = new EventEmitter();
  clickedRows = new Set<string>();

  ngOnInit(): void {
    this._dataSubscription = this.dataSource.subscribe(x => this._dataSource = x);

    if (this.displayedColumns) {
      this.displayedColumnsName = this.displayedColumns.map(x => x.property);
    }

  }
  ngOnDestroy(): void {
    this._dataSubscription?.unsubscribe;
  }



  getValue(element:any,column:any){    
    return element[column];
  }
  
  onClick(element:any){    
    this.clickedRows.clear()
    this.clickedRows.add(element);
    this.onClicked.emit(element);
  }


}
