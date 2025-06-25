import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import type { FetchNotesResponse } from '../../../../lib/api';
import NotesClient from './Notes.client';



type Params = {
  slug?: string[]
};

export default async function NotesPage({ params }: { params: Params }) {
  const queryClient = new QueryClient();

   const tag = params.slug?.[0] || '';  

   const data: FetchNotesResponse = await fetchNotes(1, 12, '', tag);

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag], 
    queryFn: () => Promise.resolve(data),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialData={data} />
    </HydrationBoundary>
  );
};