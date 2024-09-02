import { WarningIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export default function NoMorePosts() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="flex justify-center items-center flex-col">
      <WarningIcon
        color="#FFC843"
        className="w-10 h-10 mb-2"
      />
      <Text className="text-xl font-semibold">No more posts</Text>
    </div>
  );
}
