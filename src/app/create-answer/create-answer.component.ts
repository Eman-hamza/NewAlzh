import { Component, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../Services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
var counter=0;
@Component({
  selector: 'app-create-answer',
  templateUrl: './create-answer.component.html',
  styleUrls: ['./create-answer.component.scss']
})
export class CreateAnswerComponent {
  constructor(private fb: FormBuilder,private admin:AdminService,private toast:ToastrService,private route:ActivatedRoute,private router:Router,private builder:FormBuilder)
  {}
    AnswerFom:FormGroup=this.builder.group({
    questionID:this.route.snapshot.paramMap.get("id"),
    ans: new FormControl(null,Validators.required),
    score:new FormControl(null,Validators.required),
    TestId:this.admin.x,
  });
  //  we:any;
    // testid=<any>this.AnswerFom.get('TestId')?.value;
  AddAnthor(AnswerFom:any){
    counter=counter+1;
    if(counter>3){
      this.router.navigate(["createQuestion"]);
    }
    else{
    var id=<any>this.AnswerFom.get('questionID');
    console.log(id.value);
    console.log("counterrrr",counter)
    this.admin.AddAnswer(this.AnswerFom.value).subscribe({
      next: (beers) => {
      //  this.we=beers;
        // console.log("we",this.we)
        //how to equal formControl with 
        this.router.navigate(["createAnswer",id.value]);
         console.log("Answer Added Successfully");
         this.toast.info("Answer Added Successfully")

         AnswerFom.get('score').reset();     
         AnswerFom.get('ans').reset(); 
      },
      error: (e) => {
          console.log(e)
      },
     })
    }
   }
   
   AddAnthorques(AnswerFom:any){
        // this.router.navigate(["createQuestion",this.we]);
   }
}
