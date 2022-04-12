import { IConfigService } from './config.servise.innterface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private loggerServise: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.loggerServise.error('[ConfigService],Не удалось прочитать файл env');
		} else {
			this.loggerServise.log('[ConfigService], Конфигурация env загружена');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		console.log(this.config['SALT']);
		return this.config[key];
	}
}
