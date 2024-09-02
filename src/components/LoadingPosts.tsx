import { Spinner } from '@chakra-ui/react';

export default function LoadingPosts() {
  return (
    <div className="flex justify-center items-center py-3">
      <Spinner
        size="xl"
        thickness="4px"
        speed="0.65s"
        color="#FFC843"
      />
    </div>
  );
}
