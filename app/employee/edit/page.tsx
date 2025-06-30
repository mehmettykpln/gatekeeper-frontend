import EditEmployeeForm from '@/components/ui/EditEmployeeForm'
type Props = {
  params: { id: string }
}

export default function EditPage({ params }: Props) {
  return <EditEmployeeForm id={params.id} />
}
