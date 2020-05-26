import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from './../api.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {
  transactionForm = new FormGroup({
    transactionId: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl(''),
    paymentMode: new FormControl(''),
    cost: new FormControl(''),
  });
  status;
  constructor(private api: ApiService) { }

  ngOnInit() {

  }
  onSubmit() {
    this.transactionForm.controls.transactionId.setValue('trans'+Math.floor((Math.random() * 1000000) + 1));
    this.api.postTranaction(this.transactionForm.value).subscribe(
      (res: any) => {
        if (res) {
          this.status = 'New Transaction is added';
        }
      },
      error => {
        console.log(error);
      }, () => { }
    );
  }

}