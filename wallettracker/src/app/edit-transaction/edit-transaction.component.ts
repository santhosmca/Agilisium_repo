import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';
import { ApiService } from './../api.service';
import { Observable } from 'rxjs';


import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss']
})
export class EditTransactionComponent implements OnInit {
  transactionForm = new FormGroup({
    transactionId: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl(''),
    paymentMode: new FormControl(''),
    cost: new FormControl(''),
  });
  status;
  constructor(private router: Router,private route: ActivatedRoute,private api: ApiService) { }

  ngOnInit() {


    this.route.paramMap.subscribe(
      params => {

    this.api.getTranaction(params.get('id')).subscribe(
      (res: any) => {
        if (res.length > 0) {
          this.transactionForm.controls.transactionId.setValue(res[0].transactionId);
          this.transactionForm.controls.date.setValue(res[0].date);
          this.transactionForm.controls.description.setValue(res[0].description);
          this.transactionForm.controls.paymentMode.setValue(res[0].paymentMode);
          this.transactionForm.controls.cost.setValue(res[0].cost);

        }
      },
      error => {
        console.log(error);
      }, () => { }
    );
 });
  }
  onSubmit() {
    this.api.updateTranaction(this.transactionForm.value).subscribe(
      (res: any) => {
        if (res) {
          this.status = 'Transaction is updated';
        }
      },
      error => {
        console.log(error);
      }, () => { }
    );
}

}