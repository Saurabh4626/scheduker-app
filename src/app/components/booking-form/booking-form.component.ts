import { Component, Input } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
    selector: 'app-booking-form',
    templateUrl: './booking-form.component.html',
    styleUrls: ['./booking-form.component.scss'],
})
export class BookingFormComponent {
    @Input() time: Date | null = null;
    name = '';
    email = '';
    emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    constructor(private appointmentService: AppointmentService) { }

    book() {
        if (!this.name) {
            alert('Please enter your name.');
        } else if (!this.emailPattern.test(this.email)) {
            alert('Please enter a valid email address.');
        } else {
            if (this.time) {
                this.appointmentService.bookAppointment(this.name, this.email, this.time);
                this.name = '';
                this.email = '';
            } else {
                alert('Please time slot.');
            }
        }
    }
}
