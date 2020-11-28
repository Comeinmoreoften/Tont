import { Heading, Container, Flex } from 'components/elements'
import { Caption, Layout, Chat } from 'components/patterns'
import { layout } from 'theme'
import React from 'react'

export default () => (
  <Layout>
    <Container pt={5} justifyContent='center' alignItems='center'>
      <Heading>Chat</Heading>

      <Caption
        pt={[3, 3, 4, 4]}
        px={4}
        titleize={false}
        maxWidth={[layout.small, layout.small, layout.small, layout.small]}
      >
        Direct support via chat with guaranteed response from exclusive top-tier
        engineers.
      </Caption>

      <Flex alignItems='center' justifyContent='center' pt={[0, 0, 4, 4]}>
        <Chat large />
      </Flex>
    </Container>
  </Layout>
)
