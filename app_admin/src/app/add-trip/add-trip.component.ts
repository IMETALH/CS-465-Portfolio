import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {
  addTripForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
    this.addTripForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', [Validators.required, Validators.min(1)]],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.addTripForm.valid) {
      this.tripService.addTrip(this.addTripForm.value).subscribe({
        next: (data) => {
          console.log('Trip added:', data);
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Error adding trip:', err);
        },
      });
    }
  }

  // Access form fields
  get f() {
    return this.addTripForm.controls;
  }
}
