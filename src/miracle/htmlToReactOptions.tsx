import {
  Anchor,
  Image,
  Paragraph,
} from 'grommet';
import { Link } from 'react-router';
import {
  domToReact,
  Element,
  Text as HtmlReactText,
  type DOMNode,
  type HTMLReactParserOptions
} from 'html-react-parser';
import { getPath } from '../data/utils';

/**
 * this will convert html from the backend into React code
 * intro, overview, captions are expected to contain html
 * for example, there may be an anchor in the overview text
*/
export const htmlToReactOptions: HTMLReactParserOptions = {
  replace(domNode) {
    // Mostly for typescript purposes
    if (!(domNode instanceof Element)) {
      return;
    }
    /**
       * <p> check is recursive
       * since it can have a or img child elements
      */
    if (domNode.name === 'p') {
      return (
        <Paragraph margin='none' fill={true}>
          {domToReact(domNode.children as DOMNode[], htmlToReactOptions)}
        </Paragraph>
      )
    }
    /**
       * expecting a href value set to the UI endpoint
       * will use that to get the miracle details
       * which will be used to get the miracle details path
      */
    if (domNode.name === 'a' && domNode.children.length > 0) {
      const endpoint = domNode.attribs.href;
      const path = getPath(endpoint);
      const firstChild = domNode.children[0];
      if (!(firstChild instanceof HtmlReactText)) {
        console.warn('Ignoring invalid Anchor')
        return;
      }
      return (
        <Anchor
          as={Link}
          label={firstChild.data}
          // Odd syntax for typescript
          {...{
            to: endpoint,
            state: { path },
          }}
        />
      )
    }
    // This is only used for the QR code in Buenos Aires 1996 (part 3)
    if (domNode.name === 'img') {
      const attribs = domNode.attribs;
      const src = attribs.src;
      const alt = attribs.alt;
      return (
        <Image
          alt={alt}
          fit="contain"
          src={`/images/${src}`}
        />
      )
    }
  } 
}