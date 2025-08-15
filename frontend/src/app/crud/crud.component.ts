import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
})
export class CrudComponent implements OnInit {
  form = {
    fname: '',
    lname: '',
    phone : '',
    age : '',
    gender : '',
    address : {
      country : '',
      state : '',
      city : '',
      street : '',
      house : '',
      postalcode : ''
    }
  };
  dataList: any[] = [];
  editing:boolean = false
  editingPhone = ''

  addstatus = true
  watchstatus = false
  showEditForm = false;
  selectedUser: any = {};
  showActions : boolean = false
  

  
  constructor(private http : HttpClient, private router : Router){}

  ngOnInit(): void {
    this.getData()
  }
  
  getData(){
    this.http.get<any[]>('http://localhost:3000/user/display').subscribe(data => {
      this.dataList = data.map(user=>({
        ...user,
        showActions : false,
      }))
    }
    )
  }
  submit(){
    let addData = JSON.stringify(this.form)
      this.http.post('http://localhost:3000/user/add', addData, { headers : { 'content-type' : 'application/json' } }).subscribe({
      next : res => {
        alert((res as any).message)
         this.formreset()
         this.getData()
      },
      error : err=> alert(err.error.message || 'Data Add Error')
    })
  }
  delete(phone : string){
    if(confirm('Are you sure to delete data??')){
      this.http.delete(`http://localhost:3000/user/delete/${phone}`).subscribe({
        next : (res)=> {
          alert((res as any).message)
          this.getData()
        },
        error : err => alert(err.error.message || 'error in delete!')
      })
    }
  }
  edit(user:any){
    this.showEditForm = true;
    this.selectedUser = JSON.parse(JSON.stringify(user))
    console.log("----edit", this.selectedUser, this.showEditForm)
    console.log("sending data from parent to child")
  }


onFormSubmit(){
  this.getData()
  this.showEditForm = false
}
  formreset(){
    this.form = {
    fname: '',
    lname: '',
    phone : '',
    age : '',
    gender : '',
    address : {
      country : '',
      state : '',
      city : '',
      street : '',
      house : '',
      postalcode : ''
    }
  };
  }
  formvalid(){
  return (this.form.fname && this.form.lname && this.form.phone && this.form.age && this.form.gender && this.form.address.country && this.form.address.state && this.form.address.city && this.form.address.street && this.form.address.house && this.form.address.postalcode)
  }
  adddata(){
    this.addstatus = true
    this.watchstatus = false
  }
  watchdata(){
    this.addstatus = false
    this.watchstatus = true
  }
}
