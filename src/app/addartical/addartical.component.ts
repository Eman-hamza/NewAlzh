import { Component } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addartical',
  templateUrl: './addartical.component.html',
  styleUrls: ['./addartical.component.scss']
})
export class AddarticalComponent {
  constructor(private admin: AdminService,private toast:ToastrService, private route: Router, private builder: FormBuilder) { }

  formda: FormGroup = this.builder.group({
    id: new FormControl(0),
    tiltle: new FormControl(null),
    paragraph: new FormControl(null)
  })


  submitTheArtical(formda:FormGroup) {
    console.log(formda.value)
    console.log("vvvvvvv")
    this.admin.AddArtical(formda.value).subscribe({
      next: (beers) => {
        this.toast.success("Data Successuflly subimted")
        console.log("Data Successuflly subimted")
      },
      error: (e) => {
        console.log(e)
        // this.toast.error("error")
      },
    })

  }
}
