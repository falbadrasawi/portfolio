import React, { useEffect, useRef, useState } from 'react';
import styles from './Consultation.module.css';
import {
  EMAILJS_CONSULTATION_CONFIRM_TEMPLATE_ID,
  EMAILJS_CONSULTATION_TEMPLATE_ID,
  EMAILJS_OWNER_EMAIL,
  sendEmail,
} from '../lib/email';

const CONSULTATION_MODE_OPTIONS = [
  {
    value: 'Virtual Consultation',
    label: 'Virtual Consultation',
    description: 'Meet online and review the project remotely.',
  },
  {
    value: 'Phone Consultation',
    label: 'Phone Consultation',
    description: 'Discuss the project over a scheduled phone call.',
  },
  {
    value: 'In-Person Consultation (Florida Only)',
    label: 'In-Person (Florida Only)',
    description: 'Available only for Florida-based meetings.',
  },
];

const PROJECT_TYPE_OPTIONS = [
  'Website Design',
  'Website Development',
  'Web Application',
  'Mobile App',
  'Product Design',
  'UX Audit',
  'Other',
];

const TIME_ZONE_OPTIONS = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Phoenix',
  'UTC',
];

const TIME_SLOT_OPTIONS = [
  { value: '09:00', label: '9:00 AM' },
  { value: '09:30', label: '9:30 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '10:30', label: '10:30 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '11:30', label: '11:30 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '12:30', label: '12:30 PM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '13:30', label: '1:30 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '14:30', label: '2:30 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '15:30', label: '3:30 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '16:30', label: '4:30 PM' },
];

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const FULL_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});
const MONTH_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
});

function getTodayDateValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, '0');
  const day = `${today.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function parseDateValue(dateValue) {
  return new Date(`${dateValue}T12:00:00`);
}

function formatDateValue(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function formatDisplayDate(dateValue) {
  return FULL_DATE_FORMATTER.format(parseDateValue(dateValue));
}

function getMonthStart(dateLike) {
  const baseDate =
    typeof dateLike === 'string' ? parseDateValue(dateLike) : dateLike;

  return new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
}

function shiftMonth(date, offset) {
  return new Date(date.getFullYear(), date.getMonth() + offset, 1);
}

function formatMonthLabel(date) {
  return MONTH_FORMATTER.format(date);
}

function buildCalendarDays(monthDate, selectedDate, minDate) {
  const firstDayOfMonth = getMonthStart(monthDate);
  const gridStart = new Date(firstDayOfMonth);
  gridStart.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);

    const dateValue = formatDateValue(date);

    return {
      dateValue,
      dayNumber: date.getDate(),
      inCurrentMonth: date.getMonth() === monthDate.getMonth(),
      isDisabled: dateValue < minDate,
      isSelected: dateValue === selectedDate,
      isToday: dateValue === getTodayDateValue(),
    };
  });
}

function getDefaultTimeZone() {
  const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return TIME_ZONE_OPTIONS.includes(browserTimeZone)
    ? browserTimeZone
    : 'America/New_York';
}

function createInitialFormData() {
  return {
    name: '',
    email: '',
    consultationMode: CONSULTATION_MODE_OPTIONS[0].value,
    phoneNumber: '',
    meetingLocation: '',
    parkingInstructions: '',
    projectType: PROJECT_TYPE_OPTIONS[0],
    date: '',
    time: '',
    timeZone: getDefaultTimeZone(),
    notes: '',
  };
}

export default function Consultation() {
  const [formData, setFormData] = useState(() => createInitialFormData());
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const minDate = getTodayDateValue();
  const [calendarMonth, setCalendarMonth] = useState(() => getMonthStart(minDate));
  const calendarRef = useRef(null);
  const inPersonSelected =
    formData.consultationMode === 'In-Person Consultation (Florida Only)';
  const phoneNumberRequired =
    formData.consultationMode === 'Phone Consultation' ||
    inPersonSelected;
  const selectedDateLabel = formData.date
    ? formatDisplayDate(formData.date)
    : 'Select a date';
  const calendarDays = buildCalendarDays(calendarMonth, formData.date, minDate);
  const earliestMonth = getMonthStart(minDate);
  const previousMonthDisabled =
    calendarMonth.getFullYear() === earliestMonth.getFullYear() &&
    calendarMonth.getMonth() === earliestMonth.getMonth();

  useEffect(() => {
    if (!calendarOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!calendarRef.current?.contains(event.target)) {
        setCalendarOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setCalendarOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [calendarOpen]);

  const validate = () => {
    const validationErrors = {};

    if (!formData.name.trim()) validationErrors.name = 'Name is required';

    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = 'Enter a valid email address';
    }

    if (phoneNumberRequired && !formData.phoneNumber.trim()) {
      validationErrors.phoneNumber = 'Phone number is required for phone or in-person consultations';
    }

    if (inPersonSelected && !formData.meetingLocation.trim()) {
      validationErrors.meetingLocation = 'Meeting location is required for in-person consultations';
    }

    if (!formData.date) {
      validationErrors.date = 'Select a consultation date';
    } else if (formData.date < minDate) {
      validationErrors.date = 'Select today or a future date';
    }

    if (!formData.time) validationErrors.time = 'Select a preferred time';
    if (!formData.timeZone) validationErrors.timeZone = 'Select a time zone';
    if (!formData.notes.trim()) validationErrors.notes = 'Share a few details about your project';

    return validationErrors;
  };

  const clearFieldError = (fieldName) => {
    if (!errors[fieldName]) {
      return;
    }

    setErrors((current) => {
      const nextErrors = { ...current };
      delete nextErrors[fieldName];
      return nextErrors;
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const isConsultationModeChange = name === 'consultationMode';

    if (success) {
      setSuccess(null);
    }

    if (
      errors[name] ||
      (isConsultationModeChange &&
        (errors.phoneNumber || errors.meetingLocation || errors.parkingInstructions))
    ) {
      setErrors((current) => {
        const nextErrors = { ...current };
        delete nextErrors[name];

        if (isConsultationModeChange) {
          if (value === 'Virtual Consultation') {
            delete nextErrors.phoneNumber;
          }

          if (value !== 'In-Person Consultation (Florida Only)') {
            delete nextErrors.meetingLocation;
            delete nextErrors.parkingInstructions;
          }
        }

        return nextErrors;
      });
    }

    setFormData((current) => ({
      ...current,
      phoneNumber:
        name === 'consultationMode' && value === 'Virtual Consultation'
          ? ''
          : current.phoneNumber,
      meetingLocation:
        name === 'consultationMode' && value !== 'In-Person Consultation (Florida Only)'
          ? ''
          : current.meetingLocation,
      parkingInstructions:
        name === 'consultationMode' && value !== 'In-Person Consultation (Florida Only)'
          ? ''
          : current.parkingInstructions,
      [name]: value,
    }));
  };

  const toggleCalendar = () => {
    if (success) {
      setSuccess(null);
    }

    if (!calendarOpen) {
      setCalendarMonth(getMonthStart(formData.date || minDate));
    }

    setCalendarOpen((current) => !current);
  };

  const handleDateSelect = (dateValue) => {
    clearFieldError('date');

    if (success) {
      setSuccess(null);
    }

    setFormData((current) => ({
      ...current,
      date: dateValue,
    }));
    setCalendarMonth(getMonthStart(dateValue));
    setCalendarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const selectedTime =
      TIME_SLOT_OPTIONS.find((timeOption) => timeOption.value === formData.time)?.label ||
      formData.time;
    const displayDate = formatDisplayDate(formData.date);
    const scheduleSummary = `${displayDate} at ${selectedTime} (${formData.timeZone})`;
    const ownerMessage = [
      `Consultation request for ${formData.name}`,
      `Email: ${formData.email}`,
      `Consultation mode: ${formData.consultationMode}`,
      phoneNumberRequired || formData.phoneNumber.trim()
        ? `Phone: ${formData.phoneNumber || 'Not provided'}`
        : null,
      inPersonSelected ? `Meeting location: ${formData.meetingLocation}` : null,
      inPersonSelected && formData.parkingInstructions.trim()
        ? `Parking instructions: ${formData.parkingInstructions}`
        : null,
      `Project type: ${formData.projectType}`,
      `Requested time: ${scheduleSummary}`,
      '',
      'Project details:',
      formData.notes,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      await sendEmail(EMAILJS_CONSULTATION_TEMPLATE_ID, {
        from_name: formData.name,
        from_email: formData.email,
        name: formData.name,
        email: formData.email,
        reply_to: formData.email,
        title: `Consultation Request: ${formData.projectType}`,
        time: scheduleSummary,
        to_email: EMAILJS_OWNER_EMAIL,
        owner_email: EMAILJS_OWNER_EMAIL,
        consultation_mode: formData.consultationMode,
        phone_number: formData.phoneNumber || 'Not provided',
        meeting_location: formData.meetingLocation || 'Not provided',
        parking_instructions: formData.parkingInstructions || 'Not provided',
        consultation_date: displayDate,
        consultation_time: selectedTime,
        consultation_timezone: formData.timeZone,
        project_type: formData.projectType,
        notes: formData.notes,
        message: ownerMessage,
      });

      if (EMAILJS_CONSULTATION_CONFIRM_TEMPLATE_ID) {
        const confirmationMessage = [
          `Thanks ${formData.name}, your consultation request has been received.`,
          `Requested time: ${scheduleSummary}`,
          inPersonSelected ? `Meeting location: ${formData.meetingLocation}` : null,
          inPersonSelected && formData.parkingInstructions.trim()
            ? `Parking instructions: ${formData.parkingInstructions}`
            : null,
          '',
          'We will follow up if we need to confirm or adjust the slot.',
        ]
          .filter(Boolean)
          .join('\n');

        await sendEmail(EMAILJS_CONSULTATION_CONFIRM_TEMPLATE_ID, {
          to_name: formData.name,
          to_email: formData.email,
          name: formData.name,
          email: formData.email,
          reply_to: EMAILJS_OWNER_EMAIL,
          owner_email: EMAILJS_OWNER_EMAIL,
          title: 'Consultation Request Received',
          time: scheduleSummary,
          consultation_mode: formData.consultationMode,
          phone_number: formData.phoneNumber || 'Not provided',
          meeting_location: formData.meetingLocation || 'Not provided',
          parking_instructions: formData.parkingInstructions || 'Not provided',
          consultation_date: displayDate,
          consultation_time: selectedTime,
          consultation_timezone: formData.timeZone,
          project_type: formData.projectType,
          notes: formData.notes,
          message: confirmationMessage,
        });
      }

      setSuccess({
        scheduleSummary,
        confirmationEmailConfigured: Boolean(EMAILJS_CONSULTATION_CONFIRM_TEMPLATE_ID),
      });
      setFormData(createInitialFormData());
    } catch (error) {
      console.error('Consultation scheduling error:', error);
      setErrors({
        form: 'We could not submit your consultation request right now. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Schedule a Consultation</p>
          <h1 className={styles.heading}>Let&apos;s Talk About It</h1>
          <p className={styles.intro}>
            Interested in bringing your website or app idea to life?
          </p>
          <p className={styles.intro}>
          Fill out the form below to schedule a consultation. Consultation fee waived upon signing.
          </p>
        </div>

        <aside className={styles.detailsCard} aria-label="Consultation details">
          <h2 className={styles.cardHeading}>What To Expect</h2>
          <ul className={styles.detailsList}>
            <li>Choose virtual, phone, or in-person consultation.</li>
            <li>Pick a date and preferred time using the fields below.</li>
            <li>Share a few details about your project or idea.</li>
            <li>You&apos;ll receive a follow-up by email with the scheduled details.</li>
          </ul>
          <p className={styles.note}>
            In-person consultations are available only in Florida. All meetings are confirmed by email.
          </p>
        </aside>
      </section>

      <section className={styles.formCard} aria-labelledby="consultation-form-heading">
        <div className={styles.formHeader}>
          <h2 id="consultation-form-heading" className={styles.formHeading}>
            Book Your Consultation
          </h2>
        </div>

        {success && (
          <div className={styles.success} role="status" aria-live="polite">
            <p className={styles.successTitle}>Consultation request received.</p>
            <p className={styles.successCopy}>
              Requested for {success.scheduleSummary}.
              {success.confirmationEmailConfigured
                ? ' A confirmation email has been sent to you.'
                : ` A notification has been sent to ${EMAILJS_OWNER_EMAIL}.`}
            </p>
          </div>
        )}

        {errors.form && (
          <p className={styles.error} role="alert">
            {errors.form}
          </p>
        )}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.fieldGrid}>
            <div className={styles.field}>
              <label htmlFor="consult-name">Full Name</label>
              <input
                id="consult-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="consult-email">Email</label>
              <input
                id="consult-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>
          </div>

          <fieldset className={styles.fieldset}>
            <legend>Consultation Format</legend>
            <div className={styles.modeGrid}>
              {CONSULTATION_MODE_OPTIONS.map((consultationMode) => (
                <label key={consultationMode.value} className={styles.modeOption}>
                  <input
                    type="radio"
                    name="consultationMode"
                    value={consultationMode.value}
                    checked={formData.consultationMode === consultationMode.value}
                    onChange={handleChange}
                  />
                  <span className={styles.modeLabel}>{consultationMode.label}</span>
                  <span className={styles.modeDescription}>
                    {consultationMode.description}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {phoneNumberRequired && (
            <div className={styles.field}>
              <label htmlFor="consult-phone">Phone Number</label>
              <input
                id="consult-phone"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                autoComplete="tel"
                required={phoneNumberRequired}
                aria-invalid={Boolean(errors.phoneNumber)}
                aria-describedby="consult-phone-help"
              />
              <span id="consult-phone-help" className={styles.helpText}>
                Required for phone and in-person consultations.
              </span>
              {errors.phoneNumber && (
                <span className={styles.errorText}>{errors.phoneNumber}</span>
              )}
            </div>
          )}

          {inPersonSelected && (
            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <label htmlFor="consult-location">Location of Meeting</label>
                <textarea
                  id="consult-location"
                  name="meetingLocation"
                  rows="4"
                  value={formData.meetingLocation}
                  onChange={handleChange}
                  required={inPersonSelected}
                  aria-invalid={Boolean(errors.meetingLocation)}
                  aria-describedby="consult-location-help"
                />
                <span id="consult-location-help" className={styles.helpText}>
                  Add the address, venue, or meeting point for the consultation.
                </span>
                {errors.meetingLocation && (
                  <span className={styles.errorText}>{errors.meetingLocation}</span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="consult-parking">Parking Instructions (If Applicable)</label>
                <textarea
                  id="consult-parking"
                  name="parkingInstructions"
                  rows="4"
                  value={formData.parkingInstructions}
                  onChange={handleChange}
                  aria-describedby="consult-parking-help"
                />
                <span id="consult-parking-help" className={styles.helpText}>
                  Optional: share garage info, validation details, or where to enter.
                </span>
              </div>
            </div>
          )}

          <fieldset className={styles.fieldset}>
            <legend>Consultation Details</legend>
            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <label htmlFor="consult-project-type">Project Type</label>
                <select
                  id="consult-project-type"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                >
                  {PROJECT_TYPE_OPTIONS.map((projectType) => (
                    <option key={projectType} value={projectType}>
                      {projectType}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="consult-timezone">Time Zone</label>
                <select
                  id="consult-timezone"
                  name="timeZone"
                  value={formData.timeZone}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.timeZone)}
                >
                  {TIME_ZONE_OPTIONS.map((timeZone) => (
                    <option key={timeZone} value={timeZone}>
                      {timeZone}
                    </option>
                  ))}
                </select>
                {errors.timeZone && (
                  <span className={styles.errorText}>{errors.timeZone}</span>
                )}
              </div>
            </div>

            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <label htmlFor="consult-date">Preferred Date</label>
                <div className={styles.calendarPicker} ref={calendarRef}>
                  <button
                    id="consult-date"
                    type="button"
                    className={
                      errors.date
                        ? `${styles.calendarTrigger} ${styles.calendarTriggerInvalid}`
                        : styles.calendarTrigger
                    }
                    onClick={toggleCalendar}
                    aria-haspopup="dialog"
                    aria-expanded={calendarOpen}
                    aria-controls="consult-calendar"
                    aria-describedby="consult-date-help"
                  >
                    <span
                      className={
                        formData.date
                          ? styles.calendarValue
                          : `${styles.calendarValue} ${styles.calendarPlaceholder}`
                      }
                    >
                      {selectedDateLabel}
                    </span>
                    <span className={styles.calendarIcon} aria-hidden="true" />
                  </button>
                  <input type="hidden" name="date" value={formData.date} />

                  {calendarOpen && (
                    <div
                      id="consult-calendar"
                      className={styles.calendarPopover}
                      role="dialog"
                      aria-label="Choose a consultation date"
                    >
                      <div className={styles.calendarHeader}>
                        <button
                          type="button"
                          className={styles.calendarNav}
                          onClick={() => setCalendarMonth((current) => shiftMonth(current, -1))}
                          disabled={previousMonthDisabled}
                          aria-label="Previous month"
                        >
                          &lt;
                        </button>
                        <p className={styles.calendarTitle}>{formatMonthLabel(calendarMonth)}</p>
                        <button
                          type="button"
                          className={styles.calendarNav}
                          onClick={() => setCalendarMonth((current) => shiftMonth(current, 1))}
                          aria-label="Next month"
                        >
                          &gt;
                        </button>
                      </div>

                      <div className={styles.calendarWeekdays} aria-hidden="true">
                        {WEEKDAY_LABELS.map((weekday) => (
                          <span key={weekday} className={styles.calendarWeekday}>
                            {weekday}
                          </span>
                        ))}
                      </div>

                      <div className={styles.calendarGrid}>
                        {calendarDays.map((day) => {
                          const dayClasses = [
                            styles.calendarDay,
                            !day.inCurrentMonth && styles.calendarDayMuted,
                            day.isToday && styles.calendarDayToday,
                            day.isSelected && styles.calendarDaySelected,
                          ]
                            .filter(Boolean)
                            .join(' ');

                          return (
                            <button
                              key={day.dateValue}
                              type="button"
                              className={dayClasses}
                              onClick={() => handleDateSelect(day.dateValue)}
                              disabled={day.isDisabled}
                              aria-label={formatDisplayDate(day.dateValue)}
                              aria-pressed={day.isSelected}
                            >
                              {day.dayNumber}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <span id="consult-date-help" className={styles.helpText}>
                  Choose today or a future date.
                </span>
                {errors.date && <span className={styles.errorText}>{errors.date}</span>}
              </div>

              <div className={styles.field}>
                <label htmlFor="consult-time">Preferred Time</label>
                <select
                  id="consult-time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.time)}
                  aria-describedby="consult-time-help"
                >
                  <option value="">Select a time</option>
                  {TIME_SLOT_OPTIONS.map((timeSlot) => (
                    <option key={timeSlot.value} value={timeSlot.value}>
                      {timeSlot.label}
                    </option>
                  ))}
                </select>
                <span id="consult-time-help" className={styles.helpText}>
                If you want to meet outside of normal work hours, please state this below.
                </span>
                {errors.time && <span className={styles.errorText}>{errors.time}</span>}
              </div>
            </div>
          </fieldset>

          <div className={styles.field}>
            <label htmlFor="consult-notes">Project Summary</label>
            <textarea
              id="consult-notes"
              name="notes"
              rows="6"
              value={formData.notes}
              onChange={handleChange}
              required
              aria-invalid={Boolean(errors.notes)}
              aria-describedby="consult-notes-help"
            />
            <span id="consult-notes-help" className={styles.helpText}>
              Share the type of product you want to build, timeline, and any goals you
              already have in mind.
            </span>
            {errors.notes && <span className={styles.errorText}>{errors.notes}</span>}
          </div>

          <button type="submit" className={styles.submit} disabled={isSubmitting}>
            {isSubmitting ? 'Scheduling...' : 'Schedule Consultation'}
          </button>
        </form>
      </section>
    </div>
  );
}
