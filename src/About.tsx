import {
  Anchor,
  Box,
  Heading,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
} from 'grommet';
import { Hero } from "./Hero"

export const About = () => {
  return (
    <Box>
      <Hero />
      <Page background='background-front' pad={{ bottom: 'xlarge' }} kind='narrow'>
        <PageContent gap='medium'>
          <PageHeader
            title="About this website"
            subtitle={(
              <Paragraph margin="none" fill={true}>
                This page is dedicated to answer any questions you may have about the site.
              </Paragraph>
            )}
          />
          <Box>
            <Heading margin="none" level={3}>Who is St. Carlo?</Heading>
            <Paragraph margin="none" fill={true}>
              Saint Carlo Acutis (d. 2006) was a young Italian layman known for his deep devotion to the Eucharist, frequent prayer, and charity toward others. He became widely remembered for using the internet to spread faith.
              Among these is building the first {" "}
              <Anchor
                href="https://www.miracolieucaristici.org/"
                label="Eucharistic miracles"
                target="_blank"
              />
              {" website and "}
              <Anchor
                href="https://www.carloacutis.com/"
                label="Marian apparitions"
                target="_blank"
              />
              {" website. There is a lot more information available about Saint Carlo Acutis such as in the University of Notre Dame series "}
              <Anchor
                href="https://faith.nd.edu/saint/st-carlo-acutis/"
                label="explore the Saints"
                target="_blank"
              />
              .
            </Paragraph>
          </Box>
          <Box>
            <Heading margin="none" level={3}>Is this website St. Carlo's original?</Heading>
            <Paragraph margin="none" fill={true}>
              No! The original Eucharistic miracles website can be found {" "}
              <Anchor
                href="https://www.miracolieucaristici.org/"
                label="here"
                target="_blank"
              />
              . The original website also contains more information than this replica such as stories about the following:
              <ul>
                <li>
                  Saints, Mystics and the Eucharist
                </li>
                <li>
                  Our Lady and the Eucharist
                </li>
                <li>
                  Miraculous Communions
                </li>
              </ul>
              The purpose of this website is to provide a more modern user interface to discover the many documented Eucharistic miracles. The text and images of these Eucharistic miracles is identical to that of the original.
            </Paragraph>
          </Box>
          <Box>
            <Heading margin="none" level={3}>What is a Eucharistic Miracle?</Heading>
            <Paragraph margin="none" fill>
               A Eucharistic miracle is an extraordinary event connected to the consecrated Eucharist, most often occurring when the consecrated bread and/or wine appears to change in a way that cannot be explained by ordinary natural processes. The Catholic Church teaches that in the Mass there is transubstantiation, meaning the whole substance of the bread becomes the Body of Christ and the whole substance of the wine becomes the Blood of Christ while the appearances remain. Eucharistic miracles are signs that make this Real Presence especially visible to human senses in particular cases.
            </Paragraph>
          </Box>
          <Box>
            <Heading margin="none" level={3}>Who authored these Eucharistic Miracles?</Heading>
            <Paragraph margin="none" fill>
              All credit is due to the owners of the official {" "}
              <Anchor
                href="https://www.miracolieucaristici.org/"
                label="Saint Carlo Acutis"
                target="_blank"
              />
              {" website. "}
              This replica of the original website takes all the text and images from the original PDF's then attempts to present them in a more web/mobile friendly manner.
            </Paragraph>
          </Box>
          <Box>
            <Heading margin="none" level={3}>Can I contribute?</Heading>
            <Paragraph margin="none" fill>
              Any contributions no matter how small or large are welcome. This replica intends to be a community maintained version of the Eucharistic miracles. As such, the {" "}
              <Anchor
                href="https://github.com/thsmale/eucharistic-miracles-ui"
                label="source code"
                target="_blank"
              />
              {" for the website is open source. "}
              The actual content of the miracles this website uses is not generally available to the public, as that data belongs to the creators of the original website. However, you can visit the original website to download the PDF copies of the original miracles.
            </Paragraph>
          </Box>
          <Box>
            <Heading margin="none" level={3} fill>Contact information</Heading>
            <Paragraph margin="none" fill>
              Please reach out to {" "}
              <Anchor
                href="mailto:tom.snail.mail@gmail.com"
                label="tom.snail.mail@gmail.com"
                target="_blank"
              />
              {" "}
              should you have any further questions. Such as if you would like to report a typo, provide feedback, or issue a notice of intent to sue.
            </Paragraph>
          </Box>
        </PageContent>
      </Page>
    </Box>
  )
}