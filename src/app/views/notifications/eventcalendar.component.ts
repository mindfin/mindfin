import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format
} from 'date-fns';
import { Observable } from 'rxjs';
import { colors } from '../demo-utils/colors';

interface calendar {
  title: string;
  start: string;
  primary: string;
  secondary: string;
}

function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';

  return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
}

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'eventcalendar.component.html'
})
export class EventCalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events$: Observable<Array<CalendarEvent<{ film: calendar }>>>;

  activeDayIsOpen: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    
  this.http
      .get('https://bank.mindfin.co.in/callapi/getEvent')
      .pipe(
        map(({ results }: { results: calendar[] }) => {
          console.log('test1', results)
          return results.map((film: calendar) => {
            console.log('test2')
            return {
              title: film.title,
              start: new Date(
                film.start + getTimezoneOffsetString(this.viewDate)
              ),
              // end: new Date(
              //   film.end + getTimezoneOffsetString(this.viewDate)
              // ),
              color:
              {
                primary: film.primary,
                secondary: film.secondary
              },
              draggable: false,
              
            };
          });
        })
      );
  }

  dayClicked({
    date,
    events
  }: {
    date: Date;
    events: Array<CalendarEvent<{ film: calendar }>>;
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  // eventClicked(event: CalendarEvent<{ film: Film }>): void {
  //   window.open(
  //     `https://www.themoviedb.org/movie/${event.meta.film.id}`,
  //     '_blank'
  //   );
  // }
}
