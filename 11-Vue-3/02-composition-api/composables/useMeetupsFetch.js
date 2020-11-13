import { computed, onMounted, ref, inject } from '../vue3.esm-browser.js';
import meetupsData from '../meetups-data.js';

export function useMeetupsFetch() {
  const { API_URL } = inject('config');

  const rawMeetups = ref([]);

  const meetups = computed(() =>
    rawMeetups.value.map((meetup) => ({
      ...meetup,
      cover: meetup.imageId ? `${API_URL}/images/${meetup.imageId}` : undefined,
      date: new Date(meetup.date),
      localDate: new Date(meetup.date).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      ISODate: new Date(meetup.date).toISOString().substr(0, 10),
    }))
  );

  const fetchMeetups = () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(meetupsData);
      }, 100);
    });

  onMounted(async () => {
    rawMeetups.value = await fetchMeetups();
  });

  return {
    meetups,
    // в целом нет нужды экспортировать остальное, оно больше нигде не используется
    // rawMeetups,
    // fetchMeetups
  };
}
