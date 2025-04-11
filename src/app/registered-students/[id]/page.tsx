import RegisteredStudents from "@/components/RegisteredStudents";

export default function RegisteredStudentsPage({ params }: { params: { id: string } }) {
  return <RegisteredStudents eventId={params.id} />;
} 