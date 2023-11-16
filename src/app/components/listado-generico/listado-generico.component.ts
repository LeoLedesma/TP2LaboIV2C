import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-listado-generico',
  templateUrl: './listado-generico.component.html',
  styleUrls: ['./listado-generico.component.scss']
})
export class ListadoGenericoComponent implements OnInit,OnDestroy,AfterViewInit {

  _dataSource!: MatTableDataSource<any>;
  _dataSubscription!: Subscription;

  displayedColumnsName: string[] = []
  @Input() displayedColumns: { property: string, nameToShow: string }[] = [{ property: '', nameToShow: '' }];
  @Input() dataSource!: Observable<any[]>;
  @Input() actions!: {class:string,icon:string,action:string}[];
  @Input() paginator: boolean = false
  @Output() onClicked: EventEmitter<any> = new EventEmitter();
  @Output() onActionClicked: EventEmitter<{element:any,action:string}> = new EventEmitter();
  @ViewChild('showFirstLastButtons') _paginator!: MatPaginator;
  isLoading:boolean=true;
  
  clickedRows = new Set<string>();

  ngOnInit(): void {

    this._dataSubscription = this.dataSource.subscribe(x => 
      {
        this.isLoading = false;
        this._dataSource = new MatTableDataSource<any>(x);
        this._dataSource.paginator = this._paginator;
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

  ngAfterViewInit() {
      
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
