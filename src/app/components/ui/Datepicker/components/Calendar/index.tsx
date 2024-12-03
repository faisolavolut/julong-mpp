import dayjs from "dayjs";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { CALENDAR_SIZE, DATE_FORMAT } from "../../constants";
import DatepickerContext from "../../contexts/DatepickerContext";
import {
  formatDate,
  getDaysInMonth,
  getFirstDayInMonth,
  getFirstDaysInMonth,
  getLastDaysInMonth,
  getNumberOfDay,
  loadLanguageModule,
  nextMonth,
  previousMonth,
} from "../../helpers";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleChevronLeftIcon,
  DoubleChevronRightIcon,
  RoundedButton,
} from "../utils";

import Days from "./Days";
import Months from "./Months";
import Week from "./Week";
import Years from "./Years";

import { DateType } from "../../types";

interface Props {
  date: dayjs.Dayjs;
  minDate?: DateType | null;
  maxDate?: DateType | null;
  onClickPrevious: () => void;
  onClickNext: () => void;
  changeMonth: (month: number) => void;
  changeYear: (year: number) => void;
  mode?: "monthly" | "daily";
  onMark?: (day: number, date: Date) => any;
}

const Calendar: React.FC<Props> = ({
  date,
  minDate,
  maxDate,
  onClickPrevious,
  onClickNext,
  changeMonth,
  changeYear,
  onMark,
  mode = "daily",
}) => {
  // Contexts
  const {
    period,
    changePeriod,
    changeDayHover,
    showFooter,
    changeDatepickerValue,
    hideDatepicker,
    asSingle,
    i18n,
    startWeekOn,
    input,
  } = useContext(DatepickerContext);
  loadLanguageModule(i18n);

  // States
  const [showMonths, setShowMonths] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const [year, setYear] = useState(date.year());
  useEffect(() => {
    if (mode === "monthly") {
      setShowMonths(true);
      hideYears();
    }
  }, []);
  // Functions
  const previous = useCallback(() => {
    return getLastDaysInMonth(
      previousMonth(date),
      getNumberOfDay(getFirstDayInMonth(date).ddd, startWeekOn)
    );
  }, [date, startWeekOn]);

  const current = useCallback(() => {
    return getDaysInMonth(formatDate(date));
  }, [date]);

  const next = useCallback(() => {
    return getFirstDaysInMonth(
      previousMonth(date),
      CALENDAR_SIZE - (previous().length + current().length)
    );
  }, [current, date, previous]);

  const hideMonths = useCallback(() => {
    showMonths && setShowMonths(false);
  }, [showMonths]);

  const hideYears = useCallback(() => {
    showYears && setShowYears(false);
  }, [showYears]);

  const clickMonth = useCallback(
    (month: number) => {
      setTimeout(() => {
        changeMonth(month);
        if (mode === "daily") {
          setShowMonths(!showMonths);
        } else {
          hideDatepicker();
          clickDay(1, month, date.year());
        }
      }, 250);
    },
    [changeMonth, showMonths]
  );

  const clickYear = useCallback(
    (year: number) => {
      setTimeout(() => {
        changeYear(year);
        setShowYears(!showYears);
        if (mode === "monthly") {
          setShowMonths(true);
          clickDay(1, date.month() + 1, year);
        }
      }, 250);
    },
    [changeYear, showYears]
  );

  const clickDay = useCallback(
    (day: number, month = date.month() + 1, year = date.year()) => {
      const fullDay = `${year}-${month}-${day}`;
      let newStart;
      let newEnd = null;
      function chosePeriod(start: string, end: string) {
        const ipt = input?.current;
        changeDatepickerValue(
          {
            startDate: dayjs(start).format(DATE_FORMAT),
            endDate: dayjs(end).format(DATE_FORMAT),
          },
          ipt
        );
        hideDatepicker();
      }

      if (period.start && period.end) {
        if (changeDayHover) {
          changeDayHover(null);
        }
        changePeriod({
          start: null,
          end: null,
        });
      }

      if ((!period.start && !period.end) || (period.start && period.end)) {
        if (!period.start && !period.end) {
          changeDayHover(fullDay);
        }
        newStart = fullDay;
        if (asSingle) {
          newEnd = fullDay;
          chosePeriod(fullDay, fullDay);
        }
      } else {
        if (period.start && !period.end) {
          // start not null
          // end null
          const condition =
            dayjs(fullDay).isSame(dayjs(period.start)) ||
            dayjs(fullDay).isAfter(dayjs(period.start));
          newStart = condition ? period.start : fullDay;
          newEnd = condition ? fullDay : period.start;
        } else {
          // Start null
          // End not null
          const condition =
            dayjs(fullDay).isSame(dayjs(period.end)) ||
            dayjs(fullDay).isBefore(dayjs(period.end));
          newStart = condition ? fullDay : period.start;
          newEnd = condition ? period.end : fullDay;
        }

        if (!showFooter) {
          if (newStart && newEnd) {
            chosePeriod(newStart, newEnd);
          }
        }
      }

      if (!(newEnd && newStart) || showFooter) {
        changePeriod({
          start: newStart,
          end: newEnd,
        });
      }
    },
    [
      asSingle,
      changeDatepickerValue,
      changeDayHover,
      changePeriod,
      date,
      hideDatepicker,
      period.end,
      period.start,
      showFooter,
      input,
    ]
  );

  const clickPreviousDays = useCallback(
    (day: number) => {
      const newDate = previousMonth(date);
      clickDay(day, newDate.month() + 1, newDate.year());
      onClickPrevious();
    },
    [clickDay, date, onClickPrevious]
  );

  const clickNextDays = useCallback(
    (day: number) => {
      const newDate = nextMonth(date);
      clickDay(day, newDate.month() + 1, newDate.year());
      onClickNext();
    },
    [clickDay, date, onClickNext]
  );

  // UseEffects & UseLayoutEffect
  useEffect(() => {
    setYear(date.year());
  }, [date]);

  // Variables
  const calendarData = useMemo(() => {
    return {
      date: date,
      days: {
        previous: previous(),
        current: current(),
        next: next(),
      },
    };
  }, [current, date, next, previous]);
  const minYear = React.useMemo(
    () => (minDate && dayjs(minDate).isValid() ? dayjs(minDate).year() : null),
    [minDate]
  );
  const maxYear = React.useMemo(
    () => (maxDate && dayjs(maxDate).isValid() ? dayjs(maxDate).year() : null),
    [maxDate]
  );

  return (
    <div className="w-full md:w-[296px] md:min-w-[296px]">
      <div
        className={cx(
          "flex items-stretch space-x-1.5 px-2 py-1.5",
          css`
            border-bottom: 1px solid #d1d5db;
          `
        )}
      >
        {!showMonths && !showYears && (
          <div className="flex-none">
            <RoundedButton roundedFull={true} onClick={onClickPrevious}>
              <ChevronLeftIcon className="h-5 w-5" />
            </RoundedButton>
          </div>
        )}

        {showYears && (
          <div className="flex-none">
            <RoundedButton
              roundedFull={true}
              onClick={() => {
                setYear(year - 12);
              }}
            >
              <DoubleChevronLeftIcon className="h-5 w-5" />
            </RoundedButton>
          </div>
        )}

        <div className=" flex flex-1 items-stretch space-x-1.5">
          <div className="w-1/2 flex items-stretch">
            <RoundedButton
              onClick={() => {
                setShowMonths(!showMonths);
                hideYears();
              }}
            >
              <>{calendarData.date.locale(i18n).format("MMM")}</>
            </RoundedButton>
          </div>

          <div className="w-1/2 flex items-stretch">
            <RoundedButton
              onClick={() => {
                setShowYears(!showYears);
                hideMonths();
              }}
            >
              <div className="py-2">{calendarData.date.year()}</div>
            </RoundedButton>
          </div>
        </div>

        {showYears && (
          <div className="flex-none">
            <RoundedButton
              roundedFull={true}
              onClick={() => {
                setYear(year + 12);
              }}
            >
              <DoubleChevronRightIcon className="h-5 w-5" />
            </RoundedButton>
          </div>
        )}

        {!showMonths && !showYears && (
          <div className="flex-none">
            <RoundedButton roundedFull={true} onClick={onClickNext}>
              <ChevronRightIcon className="h-5 w-5" />
            </RoundedButton>
          </div>
        )}
      </div>
      <div className={cx("mt-0.5 min-h-[285px]")}>
        {showMonths && (
          <Months
            currentMonth={calendarData.date.month() + 1}
            clickMonth={clickMonth}
          />
        )}

        {showYears && (
          <Years
            year={year}
            minYear={minYear}
            maxYear={maxYear}
            currentYear={calendarData.date.year()}
            clickYear={clickYear}
          />
        )}

        {!showMonths && !showYears && (
          <>
            <Week />

            <Days
              calendarData={calendarData}
              onClickPreviousDays={clickPreviousDays}
              onClickDay={clickDay}
              onClickNextDays={clickNextDays}
              onIcon={(day, date) => {
                if(typeof onMark === "function"){
                  return onMark(day, date)
                }
                return <></>
                if (new Date().getDate() === day)
                  return (
                    <div className="absolute inset-y-0 left-0 -translate-y-1/2 -translate-x-1/2">
                      <div className="w-full h-full flex flex-row items-center justif-center px-0.5">
                       !
                      </div>
                    </div>
                  );
                return <></>
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Calendar;