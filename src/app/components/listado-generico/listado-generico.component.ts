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
  @Input() actions!: {class:string,icon:string,action:string}[];
  @Output() onClicked: EventEmitter<any> = new EventEmitter();
  @Output() onActionClicked: EventEmitter<{element:any,action:string}> = new EventEmitter();
  isLoading:boolean=true;
  
  clickedRows = new Set<string>();

  ngOnInit(): void {
    this._dataSubscription = this.dataSource.subscribe(x => 
      {
        this.isLoading = false;
        this._dataSource = x
      },
      error => this.isLoading = false
      );

    if (this.displayedColumns) {
      this.displayedColumnsName = this.displayedColumns.map(x => x.property);
    }

  }
  ngOnDestroy(): void {
    this._dataSubscription?.unsubscribe;
  }



  getValue(element:any,column:any){  
    let value = element[column];

    if(typeof value === 'boolean')
    {
      value = value ? 'Si' : 'No';
    }
    
    return value;
  }
  
  onClick(element:any){        
    this.clickedRows.clear()
    this.clickedRows.add(element);
    this.onClicked.emit(element);
  }

  onActionClick(event:Event,element:any,action:string){    
    event.stopPropagation()
    this.onActionClicked.emit({element,action})    
  }


}
