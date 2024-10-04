/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { classNames } from '../utils';

// const items = [
//   { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
//   { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
//   { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
// ];

// eslint-disable-next-line arrow-body-style
const PaginationSummary = ({ start, end, total }: { start: number; end: number; total: number }) => {
  return (
    <div>
      <p className="text-sm text-gray-700">
        Showing <span className="font-medium">{start}</span> to <span className="font-medium">{end}</span> of{' '}
        <span className="font-medium">{total}</span> results
      </p>
    </div>
  );
};

// eslint-disable-next-line react/function-component-definition, import/prefer-default-export
export const Pagination = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const maxViewPage = 5;
  const currentPage: number = Number(queryParams.get('page'));

  const addQueryParam = (key: string, value: string | number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(key, value.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const setPage = (page: number) => {
    addQueryParam('page', page);
  };

  useEffect(() => {
    if (!currentPage) {
      addQueryParam('page', 1);
    }
  }, []);

  const onPrevious = () => {
    if (!currentPage) throw new Error('currentPage is null');
    setPage(+currentPage - maxViewPage);
  };

  const onNext = () => {
    if (!currentPage) throw new Error('currentPage is null');
    setPage(+currentPage + maxViewPage);
  };

  const onAddPage = (page: number) => {
    if (!currentPage) throw new Error('currentPage is null');
    setPage(+currentPage + page);
  };

  // addQueryParam('page', pageNumber);

  const [start, end, total] = [1, 10, 97];

  // const arr = Array.from({ length: end - start + 1 }, (_, i) => i + start);
  const arr = Array.from({ length: maxViewPage }, (_, i) => i + start);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          // href="#"
          type="button"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={onAddPage.bind(null, -1)}
        >
          Previous
        </button>
        <button
          type="button"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={onAddPage.bind(null, 1)}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <PaginationSummary start={start} end={end} total={total} />
        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            <button
              type="button"
              onClick={onAddPage.bind(null, -maxViewPage)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {arr.map((page) => (
              <button
                key={page}
                // className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                className={classNames(
                  'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                  currentPage === page &&
                    'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                )}
                type="button"
                onClick={setPage.bind(null, page)}
              >
                {page}
              </button>
            ))}
            {/* <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span> */}
            <button
              type="button"
              onClick={onAddPage.bind(null, maxViewPage)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
