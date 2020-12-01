import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { MatDialog } from '@angular/material';
import { ModifyinvntComponent } from '../modifyinvnt/modifyinvnt.component';
import {Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-inventlist',
  templateUrl: './inventlist.component.html',
  styleUrls: ['./inventlist.component.css']
})

export class InventlistComponent implements OnInit {

  private student = [];
  private sortedData = [];
  public errorMsg;
  
  selectcurrency = '';
  currencies = ['USD', 'EUR', 'INR', 'GBP'];

  displayedColumns: string[] = ['id','productname', 'category', 'availableunits', 'unitprice','lastupdate','location'];

  constructor(private _inventoryService : InventoryService,public dialog: MatDialog,public router: Router) {}

  dataSource = new MatTableDataSource(this.student);

  

  ngOnInit() {
    this._inventoryService.Productdata.subscribe((data)=>{
      this.student = data;
      this.dataSource.data = this.student;
      this.sortedData = this.student.slice();
      error => this.errorMsg = error;
    });
    
  }

    
    pageIndex:number = 0;
    pageSize:number = 5;
    lowValue:number = 0;
    highValue = this.pageSize;    
    
    pageEvent: PageEvent;

  getPaginatorData(event){
     if(event.pageIndex === this.pageIndex + 1){
        this.lowValue = this.lowValue + this.pageSize;
        this.highValue =  this.highValue + this.pageSize;
       }
    else if(event.pageIndex === this.pageIndex - 1){
       this.lowValue = this.lowValue - this.pageSize;
       this.highValue =  this.highValue - this.pageSize;
      }   
    else if(event.pageIndex === 0){
       this.lowValue = 0;
       this.highValue = this.pageSize;
    }
    else {
      this.lowValue = this.student.length - this.pageSize;
      this.highValue = this.student.length;
   }
       this.pageIndex = event.pageIndex;
 }


IdSort(){
  this.student.sort(function(a, b){
        return b.id - a.id;
});
}
NameSort(){
  
    this.student.sort( function( a, b ) {
      a = a.productname.toLowerCase();
      b = b.productname.toLowerCase();
  
      return a > b ? -1 : a < b ? 1 : 0;
  });
    }

OpenDialog(row){
  const dialogref = this.dialog.open(ModifyinvntComponent, {width :'500px', data: row});
  // console.log(row);
  // dialogref.afterClosed().subscribe(result => {
  //   console.log(`reusult :${result}`);
  // })
}

// Sortbydate(){
//   this.student.sort(function(a, b){
//     return b.lastupdate - a.lastupdate;
// });
// }
sortData(sort: Sort) {
  const data = this.student.slice();
  if (!sort.active || sort.direction === '') {
    this.sortedData = data;
    return;
  }

  this.sortedData = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'id': return compare(a.id, b.id, isAsc);
      case 'productname': return compare(a.productname, b.productname, isAsc);
      case 'availableunits': return compare(a.availableunits, b.availableunits, isAsc);
      case 'unitprice': return compare(a.unitprice, b.unitprice, isAsc);
      case 'lastupdate': return compare(a.lastupdate, b.lastupdate, isAsc);
      default: return 0;
    }
  });
}

OnClickHome(){
  this.router.navigate(['/homepage']);
}

OnClickAdd(){
  this.router.navigate(['/editlist']);
}

OnClickGraph(){
  this.router.navigate(['/graph']);
}

// Onclickcurr(event:any){
//   this.selectcurrency == event.target.value;
  
// }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}




