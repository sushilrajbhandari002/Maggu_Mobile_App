import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { User } from '../../app/index';
import { Bell, Calendar as CalendarIcon, Clock } from 'lucide-react-native';
import { Calendar } from 'react-native-calendars';

interface StudentOverviewSectionProps {
  user: User;
}

const mockNotices = [
  {
    id: 1,
    title: 'Annual Sports Day',
    content: 'Annual Sports Day will be held on December 20th, 2025. All students must participate.',
    date: '2025-12-10',
    type: 'Event'
  },
  {
    id: 2,
    title: 'Winter Break Announcement',
    content: 'School will remain closed from December 25th to January 5th for winter break.',
    date: '2025-12-08',
    type: 'Notice'
  },
  {
    id: 3,
    title: 'Parent-Teacher Meeting',
    content: 'Parent-Teacher meeting scheduled for December 18th. Parents are requested to attend.',
    date: '2025-12-07',
    type: 'Meeting'
  }
];

const mockEvents = [
  {
    id: 1,
    title: 'Science Exhibition',
    date: '2025-12-15',
    time: '10:00 AM',
    venue: 'School Auditorium'
  },
  {
    id: 2,
    title: 'Annual Sports Day',
    date: '2025-12-20',
    time: '8:00 AM',
    venue: 'School Ground'
  },
  {
    id: 3,
    title: 'Cultural Program',
    date: '2025-12-22',
    time: '2:00 PM',
    venue: 'School Auditorium'
  }
];

const mockRoutine = [
  { day: 'Monday', periods: [
    { time: '8:00-9:00', subject: 'Mathematics', teacher: 'Mr. Sharma' },
    { time: '9:00-10:00', subject: 'English', teacher: 'Ms. Patel' },
    { time: '10:00-10:30', subject: 'Break', teacher: '-' },
    { time: '10:30-11:30', subject: 'Science', teacher: 'Dr. Kumar' },
    { time: '11:30-12:30', subject: 'Social Studies', teacher: 'Mrs. Singh' }
  ]},
  { day: 'Tuesday', periods: [
    { time: '8:00-9:00', subject: 'Science', teacher: 'Dr. Kumar' },
    { time: '9:00-10:00', subject: 'Mathematics', teacher: 'Mr. Sharma' },
    { time: '10:00-10:30', subject: 'Break', teacher: '-' },
    { time: '10:30-11:30', subject: 'Hindi', teacher: 'Ms. Verma' },
    { time: '11:30-12:30', subject: 'Computer', teacher: 'Mr. Gupta' }
  ]},
  // ... other days
];

export function StudentOverviewSection({ user }: StudentOverviewSectionProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDay, setSelectedDay] = useState('Monday');

  return (
    <ScrollView className="space-y-4 p-4">
      {/* Notices */}
      <View className="bg-white rounded-lg shadow p-4">
        <View className="flex-row items-center mb-3">
          <Bell size={20} color="#16a34a" className="mr-2" />
          <Text className="text-lg font-bold">Recent Notices</Text>
        </View>
        {mockNotices.map((notice) => (
          <View key={notice.id} className="bg-gray-50 border-l-4 border-green-500 rounded p-3 mb-2">
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-900 font-medium">{notice.title}</Text>
              <Text className="text-green-700 text-xs bg-green-100 px-2 py-1 rounded">{notice.type}</Text>
            </View>
            <Text className="text-gray-600 text-sm mb-1">{notice.content}</Text>
            <Text className="text-gray-400 text-xs">{new Date(notice.date).toLocaleDateString()}</Text>
          </View>
        ))}
      </View>

      {/* Events */}
      <View className="bg-white rounded-lg shadow p-4">
        <View className="flex-row items-center mb-3">
          <CalendarIcon size={20} color="#16a34a" className="mr-2" />
          <Text className="text-lg font-bold">Upcoming Events</Text>
        </View>
        {mockEvents.map((event) => (
          <View key={event.id} className="bg-green-50 border border-green-200 rounded p-3 mb-2">
            <Text className="text-gray-900 font-medium mb-1">{event.title}</Text>
            <View className="flex-row justify-between text-sm text-gray-600">
              <View className="flex-row items-center gap-1">
                <CalendarIcon size={14} />
                <Text className="text-gray-600">{new Date(event.date).toLocaleDateString()}</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Clock size={14} />
                <Text className="text-gray-600">{event.time} - {event.venue}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Calendar */}
      <View className="bg-white rounded-lg shadow p-4">
        <View className="flex-row items-center mb-3">
          <CalendarIcon size={20} color="#16a34a" className="mr-2" />
          <Text className="text-lg font-bold">Calendar</Text>
        </View>
        <Calendar
          current={selectedDate}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{ [selectedDate]: { selected: true, selectedColor: '#16a34a' } }}
          theme={{ todayTextColor: '#16a34a' }}
        />
      </View>

      {/* Routine */}
      <View className="bg-white rounded-lg shadow p-4">
        <View className="flex-row items-center mb-3">
          <Clock size={20} color="#16a34a" className="mr-2" />
          <Text className="text-lg font-bold">Class Routine</Text>
        </View>

        {/* Day selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {mockRoutine.map((day) => (
            <TouchableOpacity
              key={day.day}
              onPress={() => setSelectedDay(day.day)}
              className={`px-4 py-2 mr-2 rounded-lg ${selectedDay === day.day ? 'bg-green-600' : 'bg-gray-100'}`}
            >
              <Text className={`${selectedDay === day.day ? 'text-white' : 'text-gray-700'}`}>{day.day}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Periods */}
        {mockRoutine.find((r) => r.day === selectedDay)?.periods.map((period, idx) => (
          <View
            key={idx}
            className={`p-3 mb-2 rounded-lg border ${period.subject === 'Break' ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-200'}`}
          >
            <View className="flex-row justify-between">
              <View>
                <Text className="text-gray-900">{period.subject}</Text>
                <Text className="text-gray-600 text-sm">{period.teacher}</Text>
              </View>
              <Text className="text-gray-500 text-sm">{period.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
