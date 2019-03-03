import React, { Component } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { marshall, unmarshall } from 'helpers'
import mql from '@microlink/mql'

import {
  Text,
  Subhead,
  Box,
  Heading,
  Lead,
  Flex,
  Container,
  Link,
  Hide,
  SearchBox
} from 'components/elements'

import {
  DemoLinks,
  CardLink,
  LiveDemo,
  PricingTable,
  Grid,
  Layout
} from 'components/patterns'

import { List, ListItem } from 'components/patterns/List'

import {
  Working,
  BrowserStats,
  DesignProcess,
  Frameworks
} from 'components/icons'

import demoLinks from '../../data/demo-links.json'

const featuredDemoLinks = demoLinks.filter(demoLink => demoLink.featured)
const defaultDemoLink = demoLinks.find(demoLink => demoLink.brand === 'Twitter')
  .data

const Index = class extends Component {
  constructor (props) {
    super(props)

    const features = this.props.features.edges.map(item => item.node)

    this.state = {
      features,
      demoLinks: featuredDemoLinks,
      demoLink: defaultDemoLink,
      loading: false,
      url: ''
    }
  }

  componentDidMount () {
    const url = unmarshall(window.location.search).url
    if (url) this.setUrl(decodeURIComponent(url))
  }

  setUrl = url => {
    if (url === this.state.url) return
    const demoLink = demoLinks.find(demoLink => demoLink.url === url)
    if (demoLink) return this.setState({ url, demoLink: demoLink.data })

    this.setState({ url, hasError: null, loading: true })

    mql(url, {
      audio: true,
      video: true,
      force: true
    }).then(({ status, data }) => {
      if (status === 'success') {
        this.setState({ loading: false, demoLink: data })
      } else {
        this.setState({ loading: false, hasError: true })
      }
    })
  }
  render () {
    const { features, demoLinks, demoLink } = this.state
    const {
      siteUrl,
      paymentEndpoint,
      paymentApiKey,
      stripeKey
    } = this.props.site.siteMetadata

    return (
      <Layout>
        <Box as='article'>
          <Container as='section' pt={5} pb={5} px={0}>
            <Flex
              as='header'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              pb={[3, 4]}
            >
              <Heading
                children='Extract structured data from any website'
                maxWidth='12em'
              />
              <SearchBox
                width={[250, 400]}
                bg='white'
                my={3}
                loading={this.state.loading}
                placeholder={'Enter an URL, receive data'}
                value={this.state.url}
                onChange={url => {
                  this.setUrl(url)
                  window.history.pushState(
                    {},
                    '',
                    `${siteUrl}?${marshall({ url })}`
                  )
                }}
              />
              {this.state.hasError && (
                <Text
                  color='red7'
                  fontSize={0}
                  children='Your link failed. Make sure it has content.'
                />
              )}
            </Flex>
            <Box as='article'>
              <Container as='section' px={0}>
                <Flex flexDirection='column'>
                  <LiveDemo loading={this.state.loading} children={demoLink} />
                  <Flex
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Text
                      fontSize={1}
                      pt={4}
                      pb={3}
                      color='gray8'
                      children='Try another link →'
                    />
                    <DemoLinks
                      children={demoLinks}
                      px={[4, 0]}
                      size={[32, 38]}
                      onClick={demoLink => {
                        window.history.pushState(
                          {},
                          '',
                          `${siteUrl}?${marshall({ url: demoLink.url })}`
                        )
                        this.setState({
                          url: demoLink.url,
                          demoLink,
                          hasError: false
                        })
                      }}
                    />
                  </Flex>
                </Flex>
              </Container>
            </Box>
          </Container>
        </Box>
        <Box bg='#faf9fc' as='article'>
          <Container as='section' py={[4, 6]}>
            <Flex
              flexDirection={['column', 'row']}
              justifyContent='space-between'
            >
              <Flex
                px={[4, 0]}
                maxWidth={['100%', '23em']}
                justifyContent='center'
                flexDirection='column'
              >
                <Subhead
                  as='header'
                  textAlign={['center', 'inherit']}
                  children='Browser as service'
                />
                <Text
                  textAlign={['center', 'inherit']}
                  maxWidth={['inherit', 8]}
                  mt={[1, 3]}
                  children='Microlink is a powerful API for developers with top notch tecnologies of the industry.'
                />
                <Hide breakpoints={[2, 3]}>
                  <Box textAlign='center'>
                    <BrowserStats py={4} width={'16rem'} />
                  </Box>
                </Hide>
                <List pl={[4, 0]} mt={4}>
                  <ListItem children='Headless browser service.' />
                  <ListItem>
                    {'Simple '}
                    <Link
                      href='https://docs.microlink.io/api/#introduction'
                      children='API'
                    />
                    {' integration.'}
                  </ListItem>
                  <ListItem children='Add it to your existing stack or cloud.' />
                </List>
              </Flex>
              <Hide breakpoints={[0, 1]}>
                <Flex>
                  <BrowserStats
                    width={'24rem'}
                    transform={'translateY(-28px)'}
                  />
                </Flex>
              </Hide>
            </Flex>
          </Container>
        </Box>
        <Box as='article' id='features'>
          <Container as='section' py={5}>
            <Flex
              as='header'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              pb={[4, 5]}
            >
              <Heading children='Features' />
              <Lead
                mt={[2, 3]}
                color='black50'
                children='Our feature at a glance.'
              />
            </Flex>
            <Hide breakpoints={[0, 1]}>
              <Grid children={features} itemsPerRow={3} />
            </Hide>
            <Hide breakpoints={[2, 3]}>
              <Grid children={features} itemsPerRow={1} />
            </Hide>
          </Container>
        </Box>
        <Box bg='#faf9fc' as='article'>
          <Container as='section' py={[4, 6]}>
            <Flex
              flexDirection={['column', 'row']}
              justifyContent='space-between'
            >
              <Hide breakpoints={[0, 1]}>
                <Flex>
                  <DesignProcess
                    width={'24rem'}
                    transform={'translateY(4px)'}
                  />
                </Flex>
              </Hide>
              <Flex
                px={[4, 0]}
                maxWidth={['100%', '23em']}
                justifyContent='center'
                flexDirection='column'
              >
                <Subhead
                  as='header'
                  textAlign={['center', 'inherit']}
                  children='Turns any website into data'
                />
                <Text
                  textAlign={['center', 'inherit']}
                  maxWidth={['inherit', 6]}
                  mt={[1, 3]}
                  px={[3, 0]}
                  children='Microlink turns any website into useful structured data.'
                />
                <Hide breakpoints={[2, 3]}>
                  <Box textAlign='center'>
                    <DesignProcess py={4} width={'16rem'} />
                  </Box>
                </Hide>
                <List pl={[4, 0]} mt={4}>
                  <ListItem children='Works with any website.' />
                  <ListItem children='Detect complementary information (video, colors, dimensions, etc).' />
                  <ListItem>
                    {'Customize payload using '}
                    <Link href='/blog/custom-rules/' children='Custom Rules' />
                    {'.'}
                  </ListItem>
                </List>
              </Flex>
            </Flex>
          </Container>
        </Box>
        <Box variant='gradient' as='article'>
          <Container as='section' py={[4, 5]}>
            <Flex
              px={3}
              flexDirection={['column', 'row']}
              justifyContent='space-between'
            >
              <Flex
                justifyContent='center'
                flexDirection='column'
                alignItems='center'
                mb={[4, 0]}
              >
                <CardLink
                  href='https://docs.microlink.io/sdk'
                  title='Explore the SDK'
                  description='See beyond any link, easily converting links into beautiful previews. Build engagement for your website, improving the user experience.'
                  iconComponent={Frameworks}
                />
              </Flex>
              <Flex
                justifyContent='center'
                flexDirection='column'
                alignItems='center'
              >
                <CardLink
                  href='https://docs.microlink.io'
                  title='Explore the Docs'
                  description='Customize each payload using custom rules, detect predominant colors or take sreenshot. Embed API calls directly in your markup.'
                  iconComponent={Working}
                />
              </Flex>
            </Flex>
          </Container>
        </Box>
        <Box as='article' id='pricing'>
          <Container as='section' pt={5} pb={0}>
            <Flex
              as='header'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              pb={[4, 5]}
            >
              <Heading children='Pricing' />
              <Lead mt={[2, 3]} color='black50' children='Pay as you go.' />
            </Flex>
            <PricingTable
              apiEndpoint={paymentEndpoint}
              apiKey={paymentApiKey}
              stripeKey={stripeKey}
            />
          </Container>
        </Box>
      </Layout>
    )
  }
}

const query = graphql`
  query IndexQuery {
    features: allFeaturesYaml {
      edges {
        node {
          title
          description
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
        paymentEndpoint
        paymentApiKey
        stripeKey
      }
    }
  }
`

export default () => (
  <StaticQuery query={query} render={data => <Index {...data} />} />
)
