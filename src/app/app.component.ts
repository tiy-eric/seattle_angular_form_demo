import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


  model: object = {
    first_name: "Bob",
    last_name: "Smith"
  }

  studentForm: NgForm;
  @ViewChild('studentForm') currentForm: NgForm;

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    //if the form didn't change then do nothing
    if (this.currentForm === this.studentForm) { return; }
    //set the form to the current form for comparison
    this.studentForm = this.currentForm;
    //subscribe to form changes and send the changes to the onValueChanged method
    this.studentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    let form = this.studentForm.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  //start out the errors as an emtpy string
  formErrors = {
    'first_name': '',
    'last_name': ''
  };


  validationMessages = {
    'first_name': {
      'required':      'First name is required.',
      'minlength':     'Name must be at least 2 characters long.'
    },
    'last_name': {
      'required':      'Last name is required.',
      'minlength':     'Name must be at least 2 characters long.'
    }
  };


  onSubmit(){
    console.log(this.model)
  }
}
