import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { InventoryService } from '../inventory.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-modifyinvnt',
  templateUrl: './modifyinvnt.component.html',
  styleUrls: ['./modifyinvnt.component.css']
})
  export class ModifyinvntComponent implements OnInit {
  
  // modifyform: FormGroup; // useful when you put modify form inside constructor 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public _inventoryService: InventoryService,public router : Router) {}
    
  modifyform = this.fb.group(
    {id: [this.data.id], //,[Validators.required,Validators.pattern('[0-9]'),Validators.minLength(1)]
    productname : [this.data.productname, [Validators.required,Validators.pattern('^[a-zA-Z0-9_]{2,50}$')]],//, [Validators.required,Validators.pattern('[A-Za-z]{6}')]
    category : [this.data.category, [Validators.required,Validators.pattern('^[a-zA-Z0-9,_-]{2,50}$')]],//, [Validators.required,Validators.pattern('[A-Za-z0-9]{5}')]
    availableunits: [this.data.availableunits,[Validators.required,Validators.pattern('^[0-9_]{2,20}$'),Validators.minLength(1)]],//,Validators.required,Validators.pattern('[0-9]')
    unitprice : [this.data.unitprice,[Validators.required,Validators.pattern('^[0-9_]{2,20}$')]],//,Validators.required,Validators.pattern('[0-9]')
    tags : [this.data.tags,[Validators.required,]],//,Validators.required
    lastupdate:[new Date().getTime()],
    location: this.fb.group({
      area:[this.data.location.area,[Validators.required,Validators.pattern('^[a-zA-Z_]{2,50}$')]],//,Validators.required,Validators.pattern('[A-Za-z]')
      zone:[this.data.location.zone,[Validators.required,Validators.pattern('^[a-zA-Z0-9_]{2,50}$')]],//,Validators.required,Validators.pattern('[A-Za-z0-9]')
      shelf:[this.data.location.shelf,[Validators.required,Validators.pattern('^[a-zA-Z0-9_-]{2,50}$')]]//,Validators.required,Validators.pattern('[A-Za-z0-9]')
    }),
    description: [this.data.description,Validators.required] //,Validators.required
  })
  
  ngOnInit() {
  }

  OnSubmitdata(data){
    this._inventoryService.modifyproducts(data.value).subscribe((data) =>{
     console.log('sucess');
    this.router.navigate(['/invntlist']);
    },
    error => {
      alert(error.message);
    }
    );
  }
}
