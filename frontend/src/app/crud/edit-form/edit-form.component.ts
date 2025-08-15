import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  @Input() user : any;
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();
  phoneID : boolean = false
  

  form = {
    firstname: '',
    lastname: '',
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

  constructor(private http : HttpClient){}

   ngOnInit(): void {
     this.form = this.user
   }

   submit() {
    const body = JSON.stringify(this.form);
    this.http.put(`http://localhost:3000/user/update/${this.form.phone}`, body, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (res) => {
        alert((res as any).message);
        console.log("--- submit data from child to parent")
        this.formSubmitted.emit();
      },
      error: (err) => alert(err.error.message || 'Error updating data')
    });
  }

  cancel() {
  this.cancelEdit.emit();
}

  formvalid(){
  return (this.form.firstname && this.form.lastname && this.form.phone && this.form.age && this.form.gender && this.form.address.country && this.form.address.state && this.form.address.city && this.form.address.street && this.form.address.house && this.form.address.postalcode)
  }

}
