import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment.model';

@Injectable({
    providedIn: 'root',
})
export class AppointmentService {
    private appointments: Appointment[] = [];
    private nextId = 1;

    getAppointments(): Appointment[] {
        return this.appointments;
    }

    bookAppointment(name: string, email: string, time: Date): Appointment {
        const appointment: Appointment = { id: this.nextId++, name, email, time };
        this.appointments.push(appointment);
        return appointment;
    }

    isTimeAvailable(time: Date): boolean {
        return !this.appointments.some(
            (appt) => appt.time.getTime() === time.getTime()
        );
    }
}
