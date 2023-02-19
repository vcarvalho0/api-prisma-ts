import type { Config } from 'jest'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  modulePathIgnorePatterns: ['<rootDir/dist>'],
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths,
    {
      prefix: '<rootDir>'
    }
  )
}

export default config
