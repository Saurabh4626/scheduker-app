import { Component } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
    currentDate: Date = new Date();
    availableTimes: Date[] = [];
    bookedAppointments: Appointment[] = [];
    selectedDate: Date | null = null;
    selectedTime: Date | null = null;
    daysInMonth: Date[] = [];

    constructor(public appointmentService: AppointmentService) {
        this.updateBookedAppointments();
        this.updateDaysInMonth();
    }

    updateBookedAppointments() {
        this.bookedAppointments = this.appointmentService.getAppointments();
    }

    updateDaysInMonth() {
        this.daysInMonth = this.getDaysInMonth(this.currentDate);
    }

    getDaysInMonth(date: Date): Date[] {
        const days: Date[] = [];
        const month = date.getMonth();
        const year = date.getFullYear();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
            days.push(new Date(year, month, day));
        }
        return days;
    }

    selectDate(date: Date) {
        this.selectedDate = date;
        this.generateAvailableTimes();
    }

    selectTime(time: Date) {
        if (this.appointmentService.isTimeAvailable(time)) {
            this.selectedTime = time;
        }
    }

    changeMonth(increment: number) {
        this.currentDate.setMonth(this.currentDate.getMonth() + increment);
        this.updateDaysInMonth();
        this.generateAvailableTimes();
    }

    generateAvailableTimes() {
        if (!this.selectedDate) return;
        this.availableTimes = [];
        const baseTime = new Date(this.selectedDate);
        baseTime.setHours(9, 0, 0, 0); 
        for (let i = 0; i < 20; i++) {
            this.availableTimes.push(new Date(baseTime.getTime() + i * 30 * 60000));
        }
    }
}
