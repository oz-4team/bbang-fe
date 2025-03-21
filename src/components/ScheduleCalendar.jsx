import React from "react";
import Calendar from "react-calendar";

const ScheduleCalendar = () => {
  return (
    <div>
      <Calendar
        calendarType="gregory"
        locale="ko"
        view="month"
        prev2Label={null}
        next2Label={null}
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }

        // onClickDay={navigateToDetails}
      />
    </div>
  );
};

export default ScheduleCalendar;
