import { useState, useCallback, useEffect } from 'react';
import { Clock, Plus, Edit2, Trash2, X, Check, ChevronLeft, ChevronRight } from 'lucide-react';

// Card component matching your design
const Card = ({ children, extra = "" }) => {
  return (
    <div className={`relative flex flex-col bg-white bg-clip-border shadow-md dark:bg-navy-800 dark:text-white dark:shadow-none ${extra}`}>
      {children}
    </div>
  );
};

// Toast component
const Toast = ({ message, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-brand-500 text-white px-4 py-2 rounded-lg shadow-lg">
      {message}
    </div>
  );
};

// Date Picker Component
const DatePicker = ({ selectedDate, onDateSelect, onClose }) => {
  const [viewMode, setViewMode] = useState('month'); // 'year', 'month', 'day'
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getYearRange = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  };

  const getDaysInMonth = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const handleYearSelect = (year) => {
    setCurrentYear(year);
    setViewMode('month');
  };

  const handleMonthSelect = (monthIndex) => {
    setCurrentMonth(monthIndex);
    setViewMode('day');
  };

  const handleDaySelect = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);
    onDateSelect(newDate);
    onClose();
  };

  const renderYearView = () => (
    <div className="grid grid-cols-3 gap-2 p-4">
      {getYearRange().map(year => (
        <button
          key={year}
          onClick={() => handleYearSelect(year)}
          className={`p-3 rounded-lg text-center hover:bg-brand-100 hover:text-brand-600 transition-colors ${
            year === currentYear ? 'bg-brand-500 text-white' : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {year}
        </button>
      ))}
    </div>
  );

  const renderMonthView = () => (
    <div>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-navy-600">
        <button
          onClick={() => setViewMode('year')}
          className="text-lg font-bold text-navy-700 dark:text-white hover:text-brand-500 transition-colors"
        >
          {currentYear}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 p-4">
        {months.map((month, index) => (
          <button
            key={month}
            onClick={() => handleMonthSelect(index)}
            className={`p-3 rounded-lg text-center hover:bg-brand-100 hover:text-brand-600 transition-colors ${
              index === currentMonth ? 'bg-brand-500 text-white' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );

  const renderDayView = () => {
    const days = getDaysInMonth(currentYear, currentMonth);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-navy-600">
          <button
            onClick={() => setViewMode('month')}
            className="text-lg font-bold text-navy-700 dark:text-white hover:text-brand-500 transition-colors"
          >
            {months[currentMonth]} {currentYear}
          </button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => day && handleDaySelect(day)}
                disabled={!day}
                className={`p-2 rounded-lg text-center hover:bg-brand-100 hover:text-brand-600 transition-colors ${
                  day && 
                  selectedDate.getDate() === day && 
                  selectedDate.getMonth() === currentMonth && 
                  selectedDate.getFullYear() === currentYear
                    ? 'bg-brand-500 text-white' 
                    : day 
                      ? 'text-gray-700 dark:text-gray-300' 
                      : 'text-transparent cursor-not-allowed'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card extra="rounded-[20px] max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-navy-600">
          <h3 className="text-lg font-bold text-navy-700 dark:text-white">Select Date</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-navy-700 rounded"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        {viewMode === 'year' && renderYearView()}
        {viewMode === 'month' && renderMonthView()}
        {viewMode === 'day' && renderDayView()}
      </Card>
    </div>
  );
};

// Sample events data
const sampleEvents = [
  { id: 1, title: "Morning Standup", start: "09:00", end: "09:30", color: "bg-blue-500", date: "2025-09-05" },
  { id: 2, title: "Client Meeting", start: "10:00", end: "11:00", color: "bg-green-500", date: "2025-09-05" },
  { id: 3, title: "Design Review", start: "14:00", end: "15:30", color: "bg-purple-500", date: "2025-09-05" },
  { id: 4, title: "Code Review", start: "16:00", end: "17:00", color: "bg-orange-500", date: "2025-09-05" },
];

const DailySchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(sampleEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    start: '',
    end: '',
    color: 'bg-blue-500'
  });

  const colors = [
    { name: 'Blue', value: 'bg-blue-500' },
    { name: 'Green', value: 'bg-green-500' },
    { name: 'Purple', value: 'bg-purple-500' },
    { name: 'Orange', value: 'bg-orange-500' },
    { name: 'Red', value: 'bg-red-500' },
    { name: 'Pink', value: 'bg-pink-500' },
  ];

  const timeSlots = [];
  for (let hour = 6; hour < 24; hour++) {
    timeSlots.push(
      `${hour.toString().padStart(2, '0')}:00`,
      `${hour.toString().padStart(2, '0')}:30`
    );
  }

  // Format date to YYYY-MM-DD for comparison
  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Get events for selected date
  const getEventsForDate = (date) => {
    const dateKey = formatDateKey(date);
    return events.filter(event => event.date === dateKey);
  };

  const showToast = useCallback((message) => {
    setToastMessage(message);
    setToastOpen(true);
  }, []);

  const handleEventClick = useCallback((event) => {
    setSelectedEvent(event);
    showToast(`Event: ${event.title}`);
  }, [showToast]);

  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const startEdit = (event) => {
    setEditForm({
      title: event.title,
      start: event.start,
      end: event.end,
      color: event.color
    });
    setSelectedEvent(event);
    setIsEditing(true);
  };

  const startCreate = () => {
    setEditForm({
      title: '',
      start: '09:00',
      end: '10:00',
      color: 'bg-blue-500'
    });
    setIsCreating(true);
  };

  const saveEvent = () => {
    if (!editForm.title.trim()) {
      showToast('Please enter a title');
      return;
    }

    if (editForm.start >= editForm.end) {
      showToast('End time must be after start time');
      return;
    }

    const dateKey = formatDateKey(selectedDate);

    if (isCreating) {
      const newEvent = {
        id: Date.now(),
        ...editForm,
        date: dateKey
      };
      setEvents(prev => [...prev, newEvent]);
      showToast('Event created successfully');
    } else {
      setEvents(prev => prev.map(event => 
        event.id === selectedEvent.id ? { ...event, ...editForm } : event
      ));
      showToast('Event updated successfully');
    }

    setIsEditing(false);
    setIsCreating(false);
    setSelectedEvent(null);
  };

  const deleteEvent = (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    showToast('Event deleted successfully');
    setSelectedEvent(null);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setIsCreating(false);
    setSelectedEvent(null);
  };

  const getEventPosition = (start, end) => {
    const startMinutes = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]);
    const endMinutes = parseInt(end.split(':')[0]) * 60 + parseInt(end.split(':')[1]);
    const startOffset = (startMinutes - 360) * (60 / 30); // 360 = 6:00 AM in minutes
    const height = (endMinutes - startMinutes) * (60 / 30);
    return { top: startOffset, height };
  };

  const currentEvents = getEventsForDate(selectedDate);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Header */}
      <Card extra="rounded-[20px] p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
              <Clock className="w-6 h-6 text-brand-500 dark:text-white" />
            </div>
            <div>
              <p className="font-dm text-sm font-medium text-gray-600">
                {selectedDate.toDateString() === new Date().toDateString() ? "Today's Schedule" : "Schedule"}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateDate(-1)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-navy-700 rounded transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-500" />
                </button>
                <button
                  onClick={() => setShowDatePicker(true)}
                  className="text-xl font-bold text-navy-700 dark:text-white hover:text-brand-500 transition-colors"
                >
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </button>
                <button
                  onClick={() => navigateDate(1)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-navy-700 rounded transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={startCreate}
            className="flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Event</span>
          </button>
        </div>
      </Card>

      {/* Schedule View */}
      <Card extra="rounded-[20px] overflow-hidden">
        <div className="flex flex-row">
          {/* Time Column */}
          <div className="lg:w-20 border-r border-gray-200 dark:border-navy-600">
            <div className="sticky top-0 bg-white dark:bg-navy-800 p-4 font-dm text-sm font-medium text-gray-600">
              Time
            </div>
            <div className="space-y-0">
              {timeSlots.map((time) => (
                <div key={time} className="h-[30px] border-b border-gray-100 dark:border-navy-700 px-2 flex items-center text-xs text-gray-500">
                  {time}
                </div>
              ))}
            </div>
          </div>

          {/* Events Column */}
          <div className="flex-1 relative">
            <div className="sticky top-0 bg-white dark:bg-navy-800 p-4 font-dm text-sm font-medium text-gray-600 border-b border-gray-200 dark:border-navy-600">
              Events ({currentEvents.length})
            </div>
            <div className="relative" style={{ height: `${timeSlots.length * 30}px` }}>
              {/* Time Grid */}
              {timeSlots.map((time, index) => (
                <div
                  key={time}
                  className="absolute w-full h-[30px] border-b border-gray-100 dark:border-navy-700"
                  style={{ top: index * 30 }}
                />
              ))}

              {/* Events */}
              {currentEvents.map((event) => {
                const { top, height } = getEventPosition(event.start, event.end);
                return (
                  <div
                    key={event.id}
                    className={`absolute left-2 right-2 ${event.color} text-white rounded-lg p-2 cursor-pointer hover:opacity-80 transition-opacity`}
                    style={{ 
                      top: `${top}px`, 
                      height: `${height}px`,
                      minHeight: '30px'
                    }}
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="text-sm font-medium truncate">{event.title}</div>
                    <div className="text-xs opacity-90">{event.start} - {event.end}</div>
                  </div>
                );
              })}

              {/* No events message */}
              {currentEvents.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <p className="font-dm text-sm">No events scheduled</p>
                    <p className="font-dm text-xs">Click "Add Event" to create one</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DatePicker
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onClose={() => setShowDatePicker(false)}
        />
      )}

      {/* Event Details Modal */}
      {selectedEvent && !isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card extra="rounded-[20px] p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-navy-700 dark:text-white">{selectedEvent.title}</h3>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-navy-700 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-2 mb-6">
              <p className="font-dm text-sm text-gray-600">
                <strong>Time:</strong> {selectedEvent.start} - {selectedEvent.end}
              </p>
              <p className="font-dm text-sm text-gray-600">
                <strong>Date:</strong> {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(selectedEvent)}
                className="flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors flex-1"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => deleteEvent(selectedEvent.id)}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex-1"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Edit/Create Modal */}
      {(isEditing || isCreating) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card extra="rounded-[20px] p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                {isCreating ? 'Create Event' : 'Edit Event'}
              </h3>
              <button 
                onClick={cancelEdit}
                className="p-1 hover:bg-gray-100 dark:hover:bg-navy-700 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block font-dm text-sm font-medium text-gray-600 mb-2">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-navy-700 dark:border-navy-600 dark:text-white"
                  placeholder="Event title"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-dm text-sm font-medium text-gray-600 mb-2">Start Time</label>
                  <select
                    value={editForm.start}
                    onChange={(e) => setEditForm(prev => ({ ...prev, start: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-navy-700 dark:border-navy-600 dark:text-white"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block font-dm text-sm font-medium text-gray-600 mb-2">End Time</label>
                  <select
                    value={editForm.end}
                    onChange={(e) => setEditForm(prev => ({ ...prev, end: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-navy-700 dark:border-navy-600 dark:text-white"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block font-dm text-sm font-medium text-gray-600 mb-2">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {colors.map(color => (
                    <button
                      key={color.value}
                      onClick={() => setEditForm(prev => ({ ...prev, color: color.value }))}
                      className={`w-8 h-8 rounded-full ${color.value} ${editForm.color === color.value ? 'ring-2 ring-brand-500' : 'hover:scale-110'} transition-all`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <button
                onClick={saveEvent}
                className="flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors flex-1"
              >
                <Check className="w-4 h-4" />
                {isCreating ? 'Create' : 'Save'}
              </button>
              <button
                onClick={cancelEdit}
                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex-1"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </Card>
        </div>
      )}

      <Toast 
        message={toastMessage} 
        isOpen={isToastOpen} 
        onClose={() => setToastOpen(false)} 
      />
    </div>
  );
};

export default DailySchedule;