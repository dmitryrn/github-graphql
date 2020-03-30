import path from 'path'
import produce from 'immer'
import DotEnv from 'dotenv-webpack'

import type { Configuration } from 'webpack'

import webpackConfig from '../webpack.config'

export default {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async (config: Configuration): Promise<Configuration> => {
    config.resolve!.extensions!.push('.tsx', '.ts')

    config.module!.rules.push(...webpackConfig!.module!.rules)

    return config
  }
}
