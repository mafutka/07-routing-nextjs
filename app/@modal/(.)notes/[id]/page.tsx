import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '../../../../lib/api';
import NotePreview from './NotePreview.client';


export default async function NoteModalPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();

  const { id } = params;

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
}