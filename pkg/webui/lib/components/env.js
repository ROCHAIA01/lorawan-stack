// Copyright © 2019 The Things Network Foundation, The Things Industries B.V.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from 'react'
import displayName from 'react-display-name'

import PropTypes from '@ttn-lw/lib/prop-types'
import { warn } from '@ttn-lw/lib/log'

export const withEnv = function(Component) {
  const Base =
    Component.prototype instanceof React.Component ? React.Component : React.PureComponent

  class WithEnv extends Base {
    static displayName = `WithEnv(${displayName(Component)})`

    static propTypes = Component.propTypes

    static contextTypes = {
      env: PropTypes.env,
    }

    render() {
      const { env } = this.context

      if (!env) {
        warn('No env in context, make sure to use env.Provider')
      }

      return <Component env={env || {}} {...this.props} />
    }
  }

  return WithEnv
}

export class EnvProvider extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    env: PropTypes.env.isRequired,
  }

  static childContextTypes = {
    env: PropTypes.env.isRequired,
  }

  getChildContext() {
    return {
      env: this.props.env,
    }
  }

  render() {
    return this.props.children
  }
}

export default withEnv
