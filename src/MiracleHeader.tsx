import {
  Box,
  Button,
  PageHeader,
  Text,
} from 'grommet';
import {
  DocumentPdf,
  Facebook,
  Link as LinkIcon,
  X,
} from 'grommet-icons';
import { type Miracle } from './data/types';

type Props = {
  miracle: Miracle,
}

export const MiracleHeader = ({ miracle }: Props) => {
  const tweetContent = [
    `Check out the ${miracle?.title} ${miracle?.city}, ${miracle?.country} ${miracle?.year}.`,
    window.location.href
  ].join('%0A%0A')

  return (
    <PageHeader
      title={`${miracle?.title} ${miracle?.city}`}
      subtitle={(
        <Box gap='small'>
          <Text>
            {miracle?.country} {miracle.year}
          </Text>
          <Box direction='row' gap='xsmall'>
            <Button
              hoverIndicator
              icon={<X />}
              href={`https://twitter.com/intent/tweet?text=${tweetContent}`}
              target="_blank"
            />
            <Button
              hoverIndicator
              icon={<Facebook />}
              href={`http://www.facebook.com/sharer.php?u=${window.location.href}`}
              target="_blank"
            />
            <Button
              hoverIndicator
              icon={<LinkIcon />}
              onClick={() => navigator.clipboard.writeText(window.location.href)}
            />
            <Button
              hoverIndicator
              icon={<DocumentPdf />}
              href={miracle.pdfLink}
              target="_blank"
            />
          </Box>
        </Box>
      )}
    />
  )
}