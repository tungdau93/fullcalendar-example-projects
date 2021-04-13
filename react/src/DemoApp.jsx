import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import "bootstrap/dist/css/bootstrap.css";
import response from "./response";

export default class DemoApp extends React.Component {
  state = {
    showBooking: true,
    showStylist: false,
    showDayOff: true,
    showHoliday: true,
    currentEvents: [],
    response: {},
    listEvents: [],
    styleModal: {
      top: 0,
      left: 0,
      opacity: 0,
    },
  };

  componentWillMount() {
    this.setState({
      listEvents: [
        ...response.salon.booking,
        ...response.salon.salonDayoff,
        ...response.holiday,
      ],
    });
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <div className="demo-app">
          {this.renderSidebar()}
          <div className="demo-app-main">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              showNonCurrentDates={false}
              // initialEvents={this.state.response.salon.booking} // alternatively, use the `events` setting to fetch from a feed
              select={this.handleDateSelect}
              // eventContent={renderEventContent} // custom render function
              eventClick={this.handleEventClick}
              eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
              /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
              displayEventTime={false}
              // eventDisplay={this.handleEventDisplay()}
              events={this.state.listEvents}
            />
          </div>
        </div>

        <div
          className="tungdv"
          style={{
            zIndex: 1,
            border: "1px solid #dcdcdc",
            width: "400px",
            background: "#FFFFFF",
            position: "absolute",
            borderRadius: "8px",
            boxShadow:
              "0 24px 38px 3px rgb(0 0 0 / 14%), 0 9px 46px 8px rgb(0 0 0 / 12%), 0 11px 15px -7px rgb(0 0 0 / 20%)",
            transition: "opacity 200ms ease-in-out",
            top: `${this.state.styleModal.top}px`,
            left: `${this.state.styleModal.left + 10}px`,
            opacity: `${this.state.styleModal.opacity}`,
          }}
        >
          <div className="d-flex justify-content-end">
            <span className="mr-2">Edit</span>
            <span className="mr-2">Delete</span>
            <span
              className="mr-2"
              onClick={this.handleHideModal}
              style={{ cursor: "pointer" }}
            >
              Close
            </span>
          </div>
          <div>
            <div>tungdv</div>
            <div>tungdv</div>
            <div>tungdv</div>
            <div>tungdv</div>
            <div>tungdv</div>
            <div>tungdv</div>
            <div>tungdv</div>
          </div>
        </div>
      </div>
    );
  }

  renderSidebar() {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className="demo-app-sidebar-section d-flex align-items-center">
          <input
            className="mr-2"
            type="checkbox"
            id="booking"
            checked={this.state.showBooking}
            onChange={this.handleShowBooking}
          />
          <label htmlFor="booking" className="mb-0">
            Booking
          </label>
        </div>

        <div className="demo-app-sidebar-section d-flex align-items-center">
          <input
            className="mr-2"
            type="checkbox"
            id="stylist"
            checked={this.state.showStylist}
            onChange={this.handleShowStylist}
          />
          <label htmlFor="stylist" className="mb-0">
            Stylist
          </label>
        </div>

        <div className="demo-app-sidebar-section d-flex align-items-center">
          <input
            className="mr-2"
            type="checkbox"
            id="showDayOff"
            checked={this.state.showDayOff}
            onChange={this.handleShowDayOff}
          />
          <label htmlFor="showDayOff" className="mb-0">
            Day Off
          </label>
        </div>

        <div className="demo-app-sidebar-section d-flex align-items-center">
          <input
            className="mr-2"
            type="checkbox"
            id="showHoliday"
            checked={this.state.showHoliday}
            onChange={this.handleShowHoliday}
          />
          <label htmlFor="showHoliday" className="mb-0">
            Holiday
          </label>
        </div>

        {/* <div className="demo-app-sidebar-section">
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
        </div> */}
      </div>
    );
  }

  handleHideModal = () => {
    this.setState({
      styleModal: {
        opacity: 0,
      },
    });
  };

  handleShowBooking = () => {
    this.setState({
      showBooking: !this.state.showBooking,
      listEvents: !this.state.showBooking
        ? [...this.state.listEvents, ...response.salon.booking]
        : this.deleteElementArray("booking"),
    });
  };

  handleShowStylist = () => {
    this.setState({
      showStylist: !this.state.showStylist,
    });
  };

  handleShowDayOff = () => {
    this.setState({
      showDayOff: !this.state.showDayOff,
      listEvents: !this.state.showDayOff
        ? [...this.state.listEvents, ...response.salon.salonDayoff]
        : this.deleteElementArray("off"),
    });
  };

  handleShowHoliday = () => {
    this.setState({
      showHoliday: !this.state.showHoliday,
      listEvents: !this.state.showHoliday
        ? [...this.state.listEvents, ...response.holiday]
        : this.deleteElementArray("holiday"),
    });
  };

  deleteElementArray = (type) => {
    return this.state.listEvents.filter((item) => item.type !== `${type}`);
  };

  handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  handleEventClick = (clickInfo) => {
    // console.log(clickInfo);
    this.setState({
      styleModal: {
        top: clickInfo.jsEvent.clientY,
        left: clickInfo.jsEvent.clientX,
        opacity: 1,
      },
    });
  };

  handleEvents = (events) => {
    this.setState({
      currentEvents: events,
    });
  };

  handleEventDisplay = () => {
    if (this.state.showBooking || this.state.showHoliday) return "auto";
    return "none";
  };
}

function renderEventContent(eventInfo) {
  return (
    <div className="d-flex">
      <div className="mr-1">{eventInfo.timeText}</div>
      <div className="ml-1">{eventInfo.event.title}</div>
    </div>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}
