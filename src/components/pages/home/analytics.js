import { Hide, Box, Caps, Flex, Subhead } from 'components/elements'
import { Block, Caption } from 'components/patterns'
import { useAnalytics } from 'components/hook'
import styled from 'styled-components'
import take from 'lodash/take'
import { colors } from 'theme'
import React from 'react'

const Separator = styled(Box)`
  border-right: 1px solid ${colors.white20};
  width: 1px;
`

const Analytics = ({ color, ...props }) => {
  const { reqs_pretty: reqsPretty, bytes_pretty: bytesPretty } = useAnalytics()

  const bytes = (() => {
    const [value, unit] = bytesPretty.split(' ')
    const fixedValue = Number(value).toFixed(0)
    return `${fixedValue}${unit}`
  })()

  const stats = [
    { value: 240, name: 'CDN Edges' },
    { value: reqsPretty, name: 'reqs per month' },
    { value: bytes, name: 'data served' },
    { value: '99.9%', name: 'uptime' }
  ]

  const Stat = ({ value, name, isLast }) => (
    <Flex>
      <Flex alignItems='center' flexDirection='column'>
        <Subhead
          as='div'
          fontSize={[3, 4, 6, 6]}
          color={color}
          titleize={false}
        >
          {value}
        </Subhead>
        <Caption
          pt={[2, 3, 3, 3]}
          color='pink'
          fontWeight='bold'
          titleize={false}
          style={{ opacity: 0.8 }}
        >
          <Caps fontSize={[0, 2, 3, 3]}>{name}</Caps>
        </Caption>
      </Flex>
      {!isLast && <Separator mt={[1, 1, 0, 0]} mx={[3, 3, 4, 4]} />}
    </Flex>
  )

  const blockOne = (
    <>
      <Hide breakpoints={[0, 1]}>
        <Flex width='100%' justifyContent='space-around'>
          {stats.map((stat, index) => (
            <Stat
              key={stat.name}
              isLast={index === stats.length - 1}
              {...stat}
            />
          ))}
        </Flex>
      </Hide>
      <Hide breakpoints={[2, 3]}>
        <Flex width='100%' justifyContent='space-around'>
          {take(stats, stats.length - 1).map((stat, index) => (
            <Stat
              key={stat.name}
              isLast={index === stats.length - 2}
              {...stat}
            />
          ))}
        </Flex>
      </Hide>
    </>
  )

  return (
    <Block
      id='analytics'
      flexDirection='column'
      blockOne={blockOne}
      {...props}
    />
  )
}

export default Analytics
