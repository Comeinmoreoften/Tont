import React, { Fragment } from 'react'
import { Hide } from 'components/elements'
import ToolbarMobile from './ToolbarMobile'
import ToolbarDesktop from './ToolbarDesktop'

export default () => (
  <Fragment>
    <Hide breakpoints={[0]}>
      <ToolbarDesktop />
    </Hide>
    <Hide breakpoints={[1, 2, 3]}>
      <ToolbarMobile />
    </Hide>
  </Fragment>
)
