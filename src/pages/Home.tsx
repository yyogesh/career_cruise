import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import Button from '../components/common/Button/Button';
import { ROUTES } from '../config/constants';
import { RootState } from '../store';
import styles from './styles/home.module.scss';

export const Home: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  const jobCategories = [
    'Software Development',
    'Data Science',
    'Product Management',
    'UI/UX Design',
    'Marketing',
    'Sales',
    'Customer Support',
    'Human Resources',
  ];

  const features = [
    {
      icon: '🎯',
      title: 'Targeted Job Matches',
      description: 'Find jobs that perfectly match your skills and experience.',
    },
    {
      icon: '💼',
      title: 'Top Companies',
      description: 'Connect with leading companies across various industries.',
    },
    {
      icon: '📈',
      title: 'Career Growth',
      description: 'Access resources to help advance your career.',
    },
    {
      icon: '🔒',
      title: 'Secure Platform',
      description: 'Your data is protected with industry-leading security.',
    },
  ];

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1>Find Your Dream Job Today</h1>
          <p>
            Connect with top employers and discover opportunities that match your
            skills and aspirations.
          </p>
          {user ? (
            <Link to={ROUTES.JOBS}>
              <Button size="large">Browse Jobs</Button>
            </Link>
          ) : (
            <div className={styles.cta}>
              <Link to={ROUTES.LOGIN}>
                <Button size="large">Sign In</Button>
              </Link>
              <Link to={ROUTES.REGISTER}>
                <Button size="large" variant="outline">
                  Create Account
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className={styles.features}>
        <h2>Why Choose Us</h2>
        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.title} className={styles.feature}>
              <div className={styles.icon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.categories}>
        <h2>Popular Job Categories</h2>
        <div className={styles.grid}>
          {jobCategories.map((category) => (
            <Link
              key={category}
              to={`${ROUTES.JOBS}?category=${encodeURIComponent(category)}`}
              className={styles.category}
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Ready to Take the Next Step?</h2>
        <p>Join thousands of professionals who've found their dream jobs.</p>
        <Link to={user ? ROUTES.JOBS : ROUTES.REGISTER}>
          <Button size="large">
            {user ? 'Browse Jobs' : 'Get Started'}
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Home; 