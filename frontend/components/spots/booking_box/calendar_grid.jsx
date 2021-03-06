import React from 'react';
import times from 'lodash/times';

export const CalendarGrid = ({ year, month, date, handleClick, className, id }) => {
  let startDay = new Date(year, month, 1).getDay();

  return (
    <div id={id} className={className}>
      {
        times((31 + startDay), (t) => {
          let tCount = ((t + 1) < startDay) ? 1 : (t + 1 - startDay);
          let countMonth = new Date(year, month, tCount).getMonth();
          let weekDay = new Date(year, month, tCount).getDay()
          let lastDay = new Date(year, (month + 1), (1 - 1)).getDate();
          let countId = (tCount < 8) ? 'first-week' : '';
          let firstRow = (tCount + startDay <= 7) ? 'first-row' : '';
          if (month === countMonth && ((t + 1) > startDay)) {
            return <div key={`t${t + 1}`}
                        id={(tCount === lastDay) ? 'last-day' : `${countId}cal-date${firstRow}`}
                        className={`calendar-day-${weekDay}`}
                        data-datestring={`${tCount}/${month}/${year}`}
                        onClick={handleClick}>
                    {tCount}
                   </div>;
          } else {
            return <div key={`t${t + 1}`}
                        className="calendar-day-zero">
                    {0}
                   </div>;
          }
        })
      }
    </div>
  )
}
