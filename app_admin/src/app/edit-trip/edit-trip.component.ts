import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  editTripForm!: FormGroup; // Use the `!` operator to indicate the form will be initialized
  submitted = false;
  private tripCode: string | null = null; // Variable for storing the trip code

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) { }

  ngOnInit() {
    this.tripCode = localStorage.getItem('tripCode');
    if (!this.tripCode) {
      alert("Couldn't find the trip code!");
      this.router.navigate(['']);
      return;
    }

    console.log(`EditTripComponent#onInit found tripCode: ${this.tripCode}`);

    this. editTripForm = this.formBuilder.group({
      _id: [],
      code: [this.tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    console.log(`EditTripComponent#onInit calling TripDataService#getTrip('${this.tripCode}')`);
    this.tripService.getTrip(this.tripCode).subscribe({
      next: (data) => {
        console.log('Fetched trip data:', data);
        if (data) {
          this. editTripForm.patchValue(data); // Directly patch form with fetched data
        } else {
          console.error('Received empty or null trip data');
        }
      },
      error: (err) => {
        console.error('Error fetching trip data:', err);
        alert('Failed to fetch trip data. Redirecting to home.');
        this.router.navigate(['']);
      },
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this. editTripForm.valid) {
      console.log(`EditTripComponent#onSubmit calling TripDataService#updateTrip`);
      this.tripService.updateTrip(this. editTripForm.value).subscribe({
        next: (data) => {
          console.log('Trip updated successfully:', data);
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Error updating trip:', err);
          alert('Failed to update the trip.');
        },
      });
    }
  }

  deleteTrip(): void {
    console.log(`TripEditComponent#deleteTrip calling TripDataService#deleteTrip('${this.tripCode}')`);
  
    // If the trip code exists, call the deleteTrip method from the service
    if (this.tripCode) {
      this.tripService.deleteTrip(this.tripCode).subscribe({
        next: (response) => {
          console.log('Trip successfully deleted:', response);
          // Clear the form and navigate the user away from the current page
          this.editTripForm.reset();
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error deleting trip:', err);
          alert('Failed to delete the trip. Please try again.');
        }
      });
    } else {
      console.error('TripEditComponent#deleteTrip failed, tripCode is null');
      this.router.navigate(['/']);
    }
  }
  
  // Get the form short name to access the form fields
  get f() {
    return this. editTripForm.controls;
  }
}
