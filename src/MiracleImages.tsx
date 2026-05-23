import { useState } from 'react';
import {
  Box,
  Carousel,
  Heading,
  Image,
  Paragraph,
} from 'grommet';
import parse from 'html-react-parser';
import { type Miracle } from './data/types';

type Props = {
  miracle: Miracle;
}

const cdnUrl = import.meta.env.VITE_API_CDN_URL;

export const MiracleImages = ({ miracle }: Props) => {
  const [activeImage, setActiveImage] = useState(0);

  if (miracle.images.length === 0) {
    return null;
  }

  return (
    <Box>
      <Heading margin='none' level={3}>Images</Heading>
      <Box>
        <Carousel
          activeChild={activeImage}
          controls="arrows"
          height='medium'
          onChild={setActiveImage}
          width='medium'
        >
          {miracle.images.map(img => (
            <Box
              key={img.path}
              width="medium"
              height="medium"
              background='background-front'
              overflow="hidden"
            >
              <Image
                className="blur-bg"
                fallback="/picture-failed-to-load.svg"
                fit="cover"
                src={`${cdnUrl}/images/${img.path}`}
              />
              <Image
                className="image-bg"
                fallback="/picture-failed-to-load.svg"
                fit="cover"
                src={`${cdnUrl}/images/${img.path}`}
              />
            </Box>
          ))}
        </Carousel>
        <Box width='medium'>
          <Paragraph fill>{parse(miracle.images[activeImage].caption)}</Paragraph>
        </Box>
      </Box>
    </Box>
  )
}