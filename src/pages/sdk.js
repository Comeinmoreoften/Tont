import { layout, breakpoints, transition, shadows } from 'theme'
import React, { useMemo, useEffect, useState } from 'react'
import { mqlCode, debounceComponent } from 'helpers'
import { useWindowSize } from 'components/hook'
import isUrl from 'is-url-http/lightweight'
import * as Icons from 'components/icons'
import prependHttp from 'prepend-http'
import styled from 'styled-components'
import { Choose } from 'react-extras'
import { getDomain } from 'tldts'

import {
  Box,
  Button,
  Caps,
  Card,
  Container,
  MultiCodeEditor,
  Flex,
  Input,
  InputIcon,
  Heading,
  Link,
  Subhead,
  Text
} from 'components/elements'

import {
  ArrowLink,
  Caption,
  Microlink,
  Layout,
  FetchProvider
} from 'components/patterns'

import humanizeUrl from 'humanize-url'

import demoLinks from '../../data/demo-links'

const INITIAL_SUGGESTION = 'youtube'

const DEMO_LINK = demoLinks.find(demoLink => demoLink.id === INITIAL_SUGGESTION)

const SUGGESTIONS = [
  'instagram',
  'soundcloud',
  'spotify',
  'theverge',
  'youtube'
].map(id => {
  const { data } = demoLinks.find(item => item.id === id)
  return { value: humanizeUrl(data.url) }
})

const SMALL_BREAKPOINT = Number(breakpoints[0].replace('px', ''))
const MODES = ['preview', 'iframe']
const TYPES = ['render', 'code']

const INTEGRATIONS = [
  {
    logo: 'React',
    url: '/docs/sdk/integrations/react/'
  },
  {
    logo: 'Vue',
    url: '/docs/sdk/integrations/vue/'
  },
  {
    logo: 'JavaScript',
    url: '/docs/sdk/integrations/vanilla/'
  }
]

const HeroCard = styled(Card)`
  &:hover {
    box-shadow: ${shadows[0]};
  }

  .microlink_card__iframe iframe {
    width: 100%;
    height: 100%;
  }
`

const MicrolinkDebounce = debounceComponent(styled(Microlink)`
  --microlink-max-width: 100%;
  --microlink-border-style: transparent;
  --microlink-hover-background-color: white;
`)

const LogoWrap = styled(Box)`
  cursor: pointer;
  opacity: 0.5;
  transition: opacity ${transition.medium};
  &:hover {
    opacity: 1;
  }
`

LogoWrap.defaultProps = {
  display: 'inline-block'
}

const LiveDemo = ({
  data,
  isInitialData,
  isLoading,
  onSubmit,
  suggestions
}) => {
  const size = useWindowSize()
  const [mode, setMode] = useState(MODES[0])
  const [type, setType] = useState(TYPES[0])

  const cardBase = size.width < SMALL_BREAKPOINT ? 1.2 : 2.2
  const cardWidth = size.width / cardBase
  const cardHeight = cardWidth / Card.ratio

  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (!isInitialData) setInputValue(data.url)
  }, [isInitialData])

  const targetUrlPrepend = useMemo(() => {
    const isSuggestion = SUGGESTIONS.some(({ value }) => value === inputValue)
    return prependHttp(isSuggestion ? inputValue || data.url : data.url)
  }, [inputValue, data])

  const domain = getDomain(inputValue)

  const media = [
    mode === 'iframe' && 'iframe',
    'video',
    'audio',
    'image',
    'logo'
  ].filter(Boolean)

  return (
    <Container alignItems='center' pt={5}>
      <Heading px={5} titleize={false} maxWidth={layout.large}>
        Embed any content
      </Heading>

      <Caption
        pt={[3, 3, 4, 4]}
        px={[4, 4, 0, 0]}
        titleize={false}
        maxWidth={[layout.small, layout.small, layout.small, layout.small]}
      >
        Create beauty link previews — Turn your content into embeddable rich
        media.
      </Caption>

      <Flex
        alignItems={['center', undefined, undefined, undefined]}
        flexDirection={['column', 'row', 'row', 'row']}
        pt={[3, 3, 4, 4]}
      >
        <ArrowLink pr={[0, 4, 4, 4]} href='/docs/sdk/getting-started/overview/'>
          Get Started
        </ArrowLink>
        <ArrowLink pt={[3, 0, 0, 0]} href='https://github.com/microlinkhq/sdk'>
          View on GitHub
        </ArrowLink>
      </Flex>

      <Flex justifyContent='center' alignItems='center'>
        <Flex
          pt={[3, 3, 4, 4]}
          pb={[3, 3, 4, 4]}
          as='form'
          mx={[0, 'auto', 'auto', 'auto']}
          justifyContent='center'
          flexDirection={['column', 'row', 'row', 'row']}
          onSubmit={event => {
            event.preventDefault()
            const url = prependHttp(inputValue)
            onSubmit(isUrl(url) ? url : undefined)
          }}
        >
          <Box>
            <Input
              id='sdk-demo-url'
              fontSize={2}
              iconComponent={<InputIcon domain={domain} />}
              placeholder='Enter a URL...'
              type='text'
              suggestions={suggestions}
              value={inputValue}
              onChange={event => {
                const url = event.target.value
                setInputValue(url)
              }}
              width={['100%', '180px', '180px', '180px']}
              autoFocus
            />
          </Box>
          <Button mt={[3, 0, 0, 0]} ml={[0, 2, 2, 2]} loading={isLoading}>
            <Caps fontSize={1}>Embed it</Caps>
          </Button>
        </Flex>
      </Flex>

      <Flex
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
        mx='auto'
      >
        <HeroCard width={cardWidth} height={cardHeight} mode={mode} type={type}>
          <Choose>
            <Choose.When condition={type === 'render'}>
              <MicrolinkDebounce
                style={{ width: cardWidth, height: cardHeight }}
                key={targetUrlPrepend + mode}
                loading={isLoading}
                size='large'
                url={targetUrlPrepend}
                setData={demoLink => demoLink || data}
                media={media}
              />
            </Choose.When>
            <Choose.When condition={type === 'code'}>
              <MultiCodeEditor
                width='100%'
                languages={mqlCode(
                  {
                    url: data.url,
                    data: {
                      audio: true,
                      video: true,
                      meta: true
                    }
                  },
                  `audio: true,
    video: true,
    iframe: ${mode === 'iframe'}
    meta: true`
                )}
              />
            </Choose.When>
          </Choose>
        </HeroCard>
        <Flex
          width='100%'
          pl='15px'
          pr='7px'
          alignItems={['center', undefined, undefined, undefined]}
          justifyContent='space-between'
          flexDirection={['column', 'row', 'row', 'row']}
        >
          <Box pt={[3, 4, 4, 4]}>
            {MODES.map(children => (
              <Card.Option
                key={children}
                value={mode}
                onClick={() => setMode(children)}
              >
                {children}
              </Card.Option>
            ))}
          </Box>
          <Box pt={[3, 4, 4, 4]}>
            {TYPES.map(children => (
              <Card.Option
                key={children}
                value={type}
                onClick={() => setType(children)}
              >
                {children}
              </Card.Option>
            ))}
          </Box>
        </Flex>
      </Flex>
    </Container>
  )
}

const Integrations = () => {
  return (
    <Container
      id='integrations'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      pt={5}
    >
      <Subhead width='100%'>Built for developers</Subhead>

      <Flex pt={5} justifyContent='center' flexWrap='wrap'>
        {INTEGRATIONS.map(({ url, logo }) => {
          const LogoComponent = Icons[logo]

          return (
            <Card
              key={logo}
              flexDirection='column'
              justifyContent='center'
              ratio={[0.45, 0.45, 0.45, 0.45]}
              mb={4}
              mr={4}
            >
              <Link href={url}>
                <Flex justifyContent='center'>
                  <LogoComponent width={['40px', '40px', '40px', '40px']} />
                </Flex>
                <Flex
                  pt={4}
                  width='100%'
                  justifyContent='center'
                  flexDirection='column'
                  alignItems='center'
                >
                  <Text color='black' fontWeight='bold'>
                    Microlink SDK
                  </Text>
                  <Text color='black'>for {logo}</Text>
                </Flex>
              </Link>
            </Card>
          )
        })}
      </Flex>

      <Flex
        alignItems={['center', undefined, undefined, undefined]}
        flexDirection={['column', 'row', 'row', 'row']}
        pt={[3, 3, 4, 4]}
      >
        <ArrowLink href='/docs/sdk/getting-started/overview/'>
          See more integrations
        </ArrowLink>
      </Flex>
    </Container>
  )
}

export default () => {
  return (
    <Layout>
      <FetchProvider
        mqlOpts={{ palette: true, audio: true, video: true, iframe: true }}
      >
        {({ status, doFetch, data }) => {
          const isLoading = status === 'fetching'
          const unifiedData = data || DEMO_LINK.data
          const isInitialData = unifiedData.url === DEMO_LINK.data.url

          return (
            <>
              <LiveDemo
                isLoading={isLoading}
                suggestions={SUGGESTIONS}
                data={data || DEMO_LINK.data}
                isInitialData={isInitialData}
                onSubmit={doFetch}
              />
              <Integrations />
              {/* TODO: Add Hover banner */}
            </>
          )
        }}
      </FetchProvider>
    </Layout>
  )
}
