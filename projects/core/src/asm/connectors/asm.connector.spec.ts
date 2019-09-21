import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../models/asm.models';
import { AsmAdapter } from './asm.adapter';
import { AsmConnector } from './asm.connector';

class MockAsmAdapter {
  search(_options: CustomerSearchOptions): Observable<CustomerSearchPage> {
    return of();
  }
}

const testSearchOptions: CustomerSearchOptions = { query: 'abcde' };
const testSearchResults: CustomerSearchPage = {
  entries: [
    {
      name: 'test-name',
      uid: 'test-uid',
      customerId: 'test-customerId',
      displayUid: 'test-displayUid',
      firstName: 'test-firstName',
      lastName: 'test-lastName',
    },
    {
      name: 'test-name',
      uid: 'test-uid',
      customerId: 'test-customerId',
      displayUid: 'test-displayUid',
      firstName: 'test-firstName',
      lastName: 'test-lastName',
    },
  ],
  pagination: {
    currentPage: 0,
    pageSize: 20,
  },
} as CustomerSearchPage;

describe('AsmConnector', () => {
  let asmConnector: AsmConnector;
  let asmAdapter: AsmAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AsmAdapter, useClass: MockAsmAdapter }],
    });

    asmConnector = TestBed.get(AsmConnector);
    asmAdapter = TestBed.get(AsmAdapter);
  });

  it('should be created', () => {
    expect(asmConnector).toBeTruthy();
  });

  it('should call adapter for customerSearch', () => {
    spyOn(asmAdapter, 'search').and.stub();
    asmConnector.customerSearch(testSearchOptions);
    expect(asmAdapter.customerSearch).toHaveBeenCalledWith(
      testSearchOptions
    );
  });

  it('should return customerSearch results ', () => {
    spyOn(asmAdapter, 'search').and.returnValue(of(testSearchResults));
    let results: CustomerSearchPage;
    asmConnector
      .customerSearch(testSearchOptions)
      .subscribe(value => (results = value))
      .unsubscribe();
    expect(results).toEqual(testSearchResults);
  });
});
