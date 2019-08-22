import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { User } from '../../model/misc.model';
import { CustomerSearchPage } from '../models/asm.models';
import { CustomerActions } from '../store/actions/index';
import { AsmState, ASM_FEATURE } from '../store/asm-state';
import * as fromReducers from '../store/reducers/index';
import { AsmService } from './asm.service';

const mockUser: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'user@test.com',
  customerId: '123456',
};

const mockCustomerSearchPage: CustomerSearchPage = {
  entries: [mockUser],
} as CustomerSearchPage;

describe('AsmService', () => {
  let service: AsmService;
  let store: Store<AsmState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(ASM_FEATURE, fromReducers.getReducers()),
      ],
      providers: [AsmService],
    });

    service = TestBed.get(AsmService);
    store = TestBed.get(Store as Type<Store<AsmState>>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch proper action for customer search', () => {
    spyOn(store, 'dispatch').and.stub();
    const searchTerm = 'search term';
    service.customerSearch(searchTerm);
    expect(store.dispatch).toHaveBeenCalledWith(
      new CustomerActions.CustomerSearch({ searchTerm })
    );
  });

  it('should return search result', () => {
    store.dispatch(
      new CustomerActions.CustomerSearchSuccess(mockCustomerSearchPage)
    );

    let result: CustomerSearchPage;
    service
      .getCustomerSearchResult()
      .subscribe(value => (result = value))
      .unsubscribe();
    expect(result).toEqual(mockCustomerSearchPage);
  });

  it('should dispatch proper action for customer search reset', () => {
    spyOn(store, 'dispatch').and.stub();
    service.customerSearchReset();
    expect(store.dispatch).toHaveBeenCalledWith(
      new CustomerActions.CustomerSearchReset()
    );
  });
});
