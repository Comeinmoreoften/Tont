import { Caption, DotsBackground, ArrowLink, Layout } from 'components/patterns'
import React, { useState, useEffect } from 'react'
import { fontSizes, colors, layout } from 'theme'
import { Logo } from 'components/pages/recipes'
import { formatNumber } from 'helpers'
import { Eye } from 'react-feather'

import {
  Text,
  Box,
  CodeEditor,
  Flex,
  Heading,
  Script
} from 'components/elements'

const Description = recipe => {
  const { description, domain } = recipe
  const children = []

  for (const str of description.split(domain)) {
    if (str !== '') {
      children.push(str.trim())
    } else {
      children.push(
        <Box ml={2} mr={1}>
          <Logo width='24px' height='24px' {...recipe} />
        </Box>
      )
      children.push(domain)
    }
  }

  return children
}

const Name = ({ isGeneric, name }) => (isGeneric ? name : `Microlink × ${name}`)

const RecipeTemplate = ({ pageContext: recipe }) => {
  const [count, setCount] = useState(null)
  const isLoaded = count !== null

  useEffect(() => {
    window
      .fetch(`https://count.vercel.app/recipes/${recipe.key}?incr`)
      .then(response => response.json())
      .then(setCount)
      .catch(() => undefined)
  }, [recipe.key])

  const meta = {
    title: `Microlink Recipe: ${recipe.name}`
  }

  const gitHubUrl = `https://github.com/microlinkhq/recipes/blob/master/recipes/${
    recipe.isGeneric ? 'by-feature' : 'by-provider'
  }/${recipe.slug}.js`

  return (
    <DotsBackground alignItems='center' justifyContent='center'>
      <Script async src='https://embed.runkit.com' />
      <Layout footer={{ bg: 'transparent' }} {...meta}>
        <Flex
          px={3}
          pt={[2, 2, 3, 3]}
          width='100%'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <Heading fontSize={4} pt={[3, 3, 4, 4]} titleize={false}>
            <Name {...recipe} />
          </Heading>

          <Caption
            titleize={false}
            pt={[3, 3, 3, 3]}
            px={[4, 4, 0, 0]}
            maxWidth={[
              layout.small,
              layout.small,
              layout.normal,
              layout.normal
            ]}
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Description {...recipe} />
          </Caption>

          {isLoaded && (
            <Flex pt={[2, 2, 2, 2]} alignItems='center'>
              <Eye size={fontSizes[2]} color={colors.black50} />
              <Text pl={2} color={colors.black50}>
                {formatNumber(count)}
              </Text>
            </Flex>
          )}

          <Flex
            pt={4}
            width='100%'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <CodeEditor
              title={`${recipe.key}.js`}
              width='100%'
              maxWidth={layout.small}
              interactive
            >
              {recipe.code}
            </CodeEditor>
          </Flex>

          <Flex
            alignItems={['center', undefined, undefined, undefined]}
            flexDirection={['column', 'row', 'row', 'row']}
            pt={[3, 3, 4, 4]}
          >
            <ArrowLink
              pr={[0, 4, 4, 4]}
              href='/docs/mql/getting-started/overview'
            >
              Read docs
            </ArrowLink>
            <ArrowLink pt={[3, 0, 0, 0]} href={gitHubUrl}>
              Edit on GitHub
            </ArrowLink>
          </Flex>
        </Flex>
      </Layout>
    </DotsBackground>
  )
}

export default RecipeTemplate
