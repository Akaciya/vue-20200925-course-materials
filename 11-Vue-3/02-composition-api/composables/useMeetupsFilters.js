import { computed, reactive, toRefs } from '../vue3.esm-browser.js';

export function useMeetupsFilters(meetups) {
  const state = reactive({
    filter: {
      date: 'all',
      participation: 'all',
      search: '',
    },
    view: 'list',
  });

  const dateFilterOptions = [
    { text: 'Все', value: 'all' },
    { text: 'Прошедшие', value: 'past' },
    { text: 'Ожидаемые', value: 'future' },
  ];

  const filteredMeetups = computed(() => {
    let filteredMeetups = meetups.value;

    if (state.filter.date === 'past') {
      filteredMeetups = filteredMeetups.filter(
        meetup => new Date(meetup.date) <= new Date()
      );
    } else if (state.filter.date === 'future') {
      filteredMeetups = filteredMeetups.filter(
        meetup => new Date(meetup.date) > new Date()
      );
    }

    if (state.filter.participation === 'organizing') {
      filteredMeetups = filteredMeetups.filter(meetup => meetup.organizing);
    } else if (state.filter.participation === 'attending') {
      filteredMeetups = filteredMeetups.filter(meetup => meetup.attending);
    }

    if (state.filter.search) {
      const concatMeetupText = meetup =>
        [meetup.title, meetup.description, meetup.place, meetup.organizer]
          .join(' ')
          .toLowerCase();
      filteredMeetups = filteredMeetups.filter(meetup =>
        concatMeetupText(meetup).includes(state.filter.search.toLowerCase())
      );
    }

    return filteredMeetups;
  });

  return {
    ...toRefs(state),
    filteredMeetups,
    dateFilterOptions,
  };
}
