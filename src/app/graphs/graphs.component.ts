import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Router } from '@angular/router';
import {Chart} from 'chart.js'
 
@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  private student ;
  chart = [];
  constructor(private _inventoryService : InventoryService, public router : Router ) { }

  ngOnInit() {
    this._inventoryService.Productdata.subscribe((data)=>{
      this.student = data;
      // console.log(this.student);
      let avaunits = [];
      this.student.map((res,i)=> { 
        avaunits.push(this.student[i].availableunits);
        // this.avalunits = avaunits;
      })
        // console.log(avaunits);

        let unprice = [];
        this.student.map((res,i)=> { 
          unprice.push(this.student[i].unitprice);
          // this.uniprice = unprice;
        })
          // console.log(unprice);

          let location = [];
          this.student.map((res,i)=> { 
            location.push(this.student[i].location.area);
            // this.locationarea = location;
          })
            // console.log(location);

          this.chart = new Chart('canvas', {
            
            type: "line",
            data:{
              labels : location,
              datasets:[
                {
                  data: avaunits,
                  borderColor : "3cba9f",
                  fill: true
                }
                
              ]
            },
            options:{
              title:{
                display:true,
                text: "Number of available units at different locations"
              }, 
              legend:{
                display:false
              },
              scales:{
                xAxes:[{
                  display:true
                }],
                yAxes:[{
                  display:true
                }]
              }
            }
          })
  });
   
}
Onclick(){
  this.router.navigate(['/homepage']);
  }

}
