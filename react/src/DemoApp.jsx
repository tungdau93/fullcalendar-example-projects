import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import "bootstrap/dist/css/bootstrap.css";
import response from "./response";
import { Card } from "react-bootstrap";

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
    event: {},
    modalSettingColor: false,
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
              initialView="timeGridWeek"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              showNonCurrentDates={false}
              allDaySlot={false}
              select={this.handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={this.handleEventClick}
              eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
              /* you can update a remote database when these fire:
              eventAdd={function(){}}
              eventChange={function(){}}
              eventRemove={function(){}}
              */
              navLinks={true}
              displayEventTime={true}
              displayEventEnd={false}
              events={this.state.listEvents}
              eventTimeFormat={{
                hour: "numeric",
                minute: "2-digit",
                meridiem: "uppercase",
              }}
              slotLabelFormat={{
                hour: "numeric",
                minute: "2-digit",
                omitZeroMinute: false,
                meridiem: "uppercase",
              }}
            />
          </div>
        </div>

        <div
          className="tungdv px-2 py-2"
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
            <span
              className="mr-2"
              onClick={this.handleDeleteBooking}
              style={{ cursor: "pointer" }}
            >
              Delete
            </span>
            <span onClick={this.handleHideModal} style={{ cursor: "pointer" }}>
              Close
            </span>
          </div>
          <div>
            <div>
              <span>customer 1 </span>
              <span> - </span>
              <span>stylist 1</span>
              <div>time</div>
            </div>
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

        <div className="demo-app-sidebar-section align-items-center">
          <div>Stylist</div>
          <div>
            <div className="d-flex justify-content-between">
              <div>
                <input
                  className="mr-2"
                  type="checkbox"
                  id="stylist"
                  checked={this.state.showStylist}
                  onChange={this.handleShowStylist}
                />
                <label htmlFor="stylist" className="mb-0">
                  Stylist 1
                </label>
              </div>
              <div style={{ position: "relative" }}>
                <svg
                  height="12px"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="ellipsis-v"
                  className="svg-inline--fa fa-ellipsis-v fa-w-6"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 192 512"
                  onClick={this.handleModalSettingColor}
                >
                  <path
                    fill="currentColor"
                    d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"
                  ></path>
                </svg>

                {this.state.modalSettingColor ? (
                  <Card style={{ position: "absolute", width: "130px" }}>
                    <Card.Header>Setting color</Card.Header>
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                        <span
                          className="dot-red"
                          onClick={(event) => {
                            this.handleSetColor("red", event);
                          }}
                        ></span>
                        <span
                          className="dot-green"
                          onClick={(event) => {
                            this.handleSetColor("green", event);
                          }}
                        ></span>
                        <span
                          className="dot-pink"
                          onClick={(event) => {
                            this.handleSetColor("pink", event);
                          }}
                        ></span>
                        <span
                          className="dot-gray"
                          onClick={(event) => {
                            this.handleSetColor("gray", event);
                          }}
                        ></span>
                      </div>
                    </Card.Body>
                  </Card>
                ) : null}
              </div>
            </div>

            {/* <div className="d-flex justify-content-between">
              <div>
                <input
                  className="mr-2"
                  type="checkbox"
                  id="stylist"
                  checked={this.state.showStylist}
                  onChange={this.handleShowStylist}
                />
                <label htmlFor="stylist" className="mb-0">
                  Stylist 2
                </label>
              </div>
              <svg
                height="12px"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="ellipsis-v"
                className="svg-inline--fa fa-ellipsis-v fa-w-6"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192 512"
              >
                <path
                  fill="currentColor"
                  d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"
                ></path>
              </svg>
            </div> */}
          </div>
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
      </div>
    );
  }

  handleModalSettingColor = () => {
    this.setState({
      modalSettingColor: !this.state.modalSettingColor,
    });
  };

  handleSetColor = (color, event) => {
    this.setState({
      modalSettingColor: false,
    });

    const listNoChangeColor = this.state.listEvents.filter(
      (item) => item.stylistCd + "" !== 1 + ""
    );
    const listChangeColor = this.state.listEvents.filter(
      (item) => item.stylistCd + "" === 1 + ""
    );

    listChangeColor.map((item) => {
      item.color = color;
    });

    this.setState({
      listEvents: [...listNoChangeColor, ...listChangeColor],
    });
  };

  handleHideModal = () => {
    this.setState({
      styleModal: {
        opacity: 0,
      },
    });
  };

  handleDeleteBooking = () => {
    const result = this.state.listEvents.filter(
      (item) => item.id + "" !== this.state.event.id + ""
    );
    this.setState({
      listEvents: result,
    });
    this.handleHideModal();
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
    console.log(clickInfo);
    this.setState({
      styleModal: {
        top: clickInfo.jsEvent.clientY,
        left: clickInfo.jsEvent.clientX,
        opacity: 1,
      },
      event: clickInfo.event,
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
    <div
      className="d-flex px-1"
      style={{ height: "15px", overflow: "hidden", whiteSpace: "nowrap" }}
    >
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
