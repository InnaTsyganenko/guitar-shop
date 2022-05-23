/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import { compareObjectsByKey } from '../utils/utils';
import { SortDirection, ItemKey, SortOption } from '../types/state';

export interface SortProps<T> {
  data: T[];
  onSortChange(data: T[]): void;
  sortOptions: any[];
}

export function useSort<T>({ data, onSortChange, sortOptions }: SortProps<T>) {
  // Local state
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const initialSortKey = sortOptions[0].value as ItemKey<T>;
  const [sortKey, setSortKey] = useState<ItemKey<T>>(initialSortKey);

  // Execute the sort and callback when local state
  // or supplied props have changed.
  useEffect(() => {
    // Create a copy before sorting, as the original array is frozen in strict mode.
    const sortedData = [...data];
    console.log(sortedData);
    if (sortedData?.length) {
      sortedData.sort(compareObjectsByKey(sortKey, sortDirection === 'asc'));

      if (onSortChange) {
        onSortChange(sortedData);
      }
    }
  }, [data, onSortChange, sortDirection, sortKey]);

  /**
   * Handle changes to the sort key.
   * @param event: ChangeEvent<HTMLSelectElement>
   * TODO: generalize to allow other change event types.
   * TODO: expand to allow multiple, nested keys for multi-part sorting.
   */
  const handleSortKeyChange = (event: React.MouseEvent<HTMLElement>) => {
    const newSortKey = (event.target as any).value as ItemKey<T>;
    if (sortKey !== newSortKey) {
      setSortKey(newSortKey);
      console.log(newSortKey);
    }
  };

  /**
   * Handle directly passed options (e.g. from react-select).
   * @param option
   */
  const handleKeyChange = (selectedOption: SortOption<T> | null) => {
    const newSortKey = selectedOption?.value;
    if (newSortKey && sortKey !== newSortKey) {
      setSortKey(newSortKey);
    }
  };

  /**
   * Handle changes to the sort direction.
   */
  const handleDirectionToggle = (selectedDirection: any) => {
    setSortDirection(selectedDirection);
    console.log(sortDirection);
  };

  return {
    handleDirectionToggle,
    handleKeyChange,
    handleSortKeyChange,
    sortDirection,
    sortKey,
  };
}
