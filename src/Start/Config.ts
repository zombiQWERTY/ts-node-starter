import configFile from '../../config/config.json'

type Service = {
  port: number
}

export type ConfigObject = {
  service: Service
}

export class Config {
  private static readonly _instance: Config = new Config()
  public readonly _configObject: ConfigObject = configFile

  constructor() {
    if (Config._instance) {
      throw new Error('Instantiation failed: Use Config.getInstance() instead of new.')
    }
  }

  public static get instance(): Config {
    return Config._instance
  }

  public get config(): ConfigObject {
    return this._configObject
  }
}
