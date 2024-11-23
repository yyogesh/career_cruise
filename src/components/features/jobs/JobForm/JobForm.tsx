import React, { useState } from 'react';
import Input from '../../../common/Input/Input';
import Button from '../../../common/Button/Button';
import { Job } from '../../../../services/api/job.service';
import { JOB_TYPES, CURRENCIES } from '../../../../config/constants';
import styles from './jobForm.module.scss';

interface JobFormProps {
  initialData?: Job;
  onSubmit: (data: Partial<Job>) => void;
  loading?: boolean;
}

export const JobForm: React.FC<JobFormProps> = ({
  initialData,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    company: initialData?.company || '',
    location: initialData?.location || '',
    description: initialData?.description || '',
    requirements: initialData?.requirements.join('\n') || '',
    type: initialData?.type || 'full-time',
    salary: {
      min: initialData?.salary.min || '',
      max: initialData?.salary.max || '',
      currency: initialData?.salary.currency || 'USD',
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith('salary.')) {
      const salaryField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        salary: {
          ...prev.salary,
          [salaryField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requirements = formData.requirements
      .split('\n')
      .filter((req) => req.trim());

    onSubmit({
      ...formData,
      requirements,
      salary: {
        min: Number(formData.salary.min),
        max: Number(formData.salary.max),
        currency: formData.salary.currency,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        label="Job Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <Input
        label="Company"
        name="company"
        value={formData.company}
        onChange={handleChange}
        required
      />

      <Input
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <div className={styles.select}>
        <label htmlFor="type">Job Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          {JOB_TYPES.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.salary}>
        <div className={styles.select}>
          <label htmlFor="salary.currency">Currency</label>
          <select
            id="salary.currency"
            name="salary.currency"
            value={formData.salary.currency}
            onChange={handleChange}
            required
          >
            {CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Minimum Salary"
          name="salary.min"
          type="number"
          value={formData.salary.min}
          onChange={handleChange}
          required
        />

        <Input
          label="Maximum Salary"
          name="salary.max"
          type="number"
          value={formData.salary.max}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.textarea}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
        />
      </div>

      <div className={styles.textarea}>
        <label htmlFor="requirements">
          Requirements (one per line)
        </label>
        <textarea
          id="requirements"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          rows={5}
          required
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : initialData ? 'Update Job' : 'Create Job'}
      </Button>
    </form>
  );
};

export default JobForm; 