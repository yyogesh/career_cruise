import React, { useState } from 'react';
import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';
import { JOB_TYPES } from '../../../../config/constants';
import styles from './jobFilter.module.scss';

interface JobFilterProps {
  onFilter: (filters: JobFilterValues) => void;
}

export interface JobFilterValues {
  search: string;
  location: string;
  type: string;
  minSalary: string;
}

export const JobFilter: React.FC<JobFilterProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<JobFilterValues>({
    search: '',
    location: '',
    type: '',
    minSalary: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      location: '',
      type: '',
      minSalary: '',
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.filter}>
      <div className={styles.fields}>
        <Input
          label="Search"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Job title or keywords"
        />

        <Input
          label="Location"
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="City or country"
        />

        <div className={styles.selectWrapper}>
          <label htmlFor="type">Job Type</label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">All Types</option>
            {JOB_TYPES.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Min Salary"
          name="minSalary"
          type="number"
          value={filters.minSalary}
          onChange={handleChange}
          placeholder="Minimum salary"
        />
      </div>

      <div className={styles.actions}>
        <Button type="submit">Apply Filters</Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
};

export default JobFilter; 