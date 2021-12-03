import { ReactNode } from 'react';
import { CalendarIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import { CfpState } from '../server/common/cfp-dates';
import { Link } from 'remix';

type EventsListProps = { children: ReactNode };

export function EventsList({ children }: EventsListProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {children}
      </ul>
    </div>
  );
}

type EventsItemProps = {
  id: string;
  name: string;
  type: string;
  address: string | null;
  cfpStart?: string;
  cfpEnd?: string;
  cfpState: CfpState;
};

export function EventItem({ id, name, type, address, cfpStart, cfpEnd, cfpState }: EventsItemProps) {
  return (
    <li>
      <Link to={`/event/${id}`} className="block hover:bg-gray-50">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-indigo-600 truncate">{name}</p>
            <div className="ml-2 flex-shrink-0 flex">
              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {type}
              </p>
            </div>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="sm:flex">
              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                {address}
              </p>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
              <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              {cfpState === 'FINISHED' && <p>CFP is finished</p>}
              {cfpState === 'OPENED' && type === 'MEETUP' && <p>CFP is opened</p>}
              {cfpState === 'OPENED' && type === 'CONFERENCE' && (
                <p>
                  CFP is opened until <time dateTime={cfpEnd}>{cfpEnd}</time>
                </p>
              )}
              {cfpState === 'CLOSED' && (
                <p>
                  CFP will open the <time dateTime={cfpStart}>{cfpStart}</time>
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
