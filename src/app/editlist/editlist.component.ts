import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-editlist',
  templateUrl: './editlist.component.html',
  styleUrls: ['./editlist.component.css']
})
export class EditlistComponent implements OnInit {

  public editdata;

  constructor(private fb: FormBuilder,private router : Router,private _inventoryService : InventoryService) {
  }


  editform = this.fb.group(
    {id: ['',[Validators.required,Validators.pattern('^[0-9_]{2,15}$')]],
    productname : ['', [Validators.required,Validators.pattern('^[a-zA-Z_]{2,50}$')]],
    category : ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9_-]{2,20}$')]],
    availableunits: ['',[Validators.required,Validators.pattern('^[0-9_]{2,20}$')]],
    unitprice : ['',[Validators.required,Validators.pattern('^[0-9_]{2,20}$')]],
    tags : ['',Validators.required],
    lastupdate:[new Date().getTime()],
    location: this.fb.group({
      area:['',[Validators.required,Validators.pattern('^[a-zA-Z_]{2,50}$')]],
      zone:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9_]{2,50}$')]],
      shelf:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9_-]{2,50}$')]]
    }),
    description: ['',Validators.required]
  })
  
  ngOnInit() {
  }

  OnSubmit(){
    console.log(this.editform.value);
    this.editform.value.tags = this.editform.value.tags.split(',');
    console.log(this.editform.value);
    this._inventoryService.addproducts(this.editform.value)
    console.log('sucess'),
    this.router.navigate(['/invntlist']);
    error => console.log('Error',error); 
  }

  Onclick(){
    this.router.navigate(['/homepage']);
    }
  
}



