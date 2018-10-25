import { inject, injectable } from 'inversify';

import { TYPES } from '../constant/types';
import { ILogger } from '../interface/logger.inferface';
import { Account, APIQuery, APIResult } from '../model';
import { MongoDBClient } from '../util/mongodb/client';
import { AnalyticsService } from './analytics.service';
import { AccountRepository } from '../database/repository';

@injectable()
export class AccountService {
  @inject(TYPES.AccountRepository)
  public accountRepository: AccountRepository;

  @inject(TYPES.LoggerService)
  public logger: ILogger;

  public getAccounts(apiQuery: APIQuery): Promise<APIResult> {
    apiQuery.paginationField = 'registeredOn';
    apiQuery.sortAscending = false;
    return this.accountRepository.find(apiQuery);
  }

  public getAccount(address: string): Promise<Account> {
    const apiQuery = new APIQuery();
    apiQuery.query = { address };
    return this.accountRepository.findOne(apiQuery);
  }
}
