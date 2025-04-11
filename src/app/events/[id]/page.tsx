import EventDetails from '@/components/EventDetails';

export default function EventPage({ params }: { params: { id: string } }) {
  return <EventDetails id={params.id} />;
} 