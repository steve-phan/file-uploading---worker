import type {Config} from 'jest';

const config: Config = {
    preset: 'ts-jest', 
    testEnvironment: 'node',  
    transform: {
      '^.+\\.tsx?$': 'ts-jest', 
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: ['/node_modules/'],   
};

export default config;