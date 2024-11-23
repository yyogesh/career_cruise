import React, { Suspense } from 'react';
import { BrowserRouter as Router, useRoutes, RouteObject } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Loader from './components/common/Loader/Loader';
import { routes } from './routes/routes';
import styles from './assets/styles/app.module.scss';

const AppRoutes: React.FC = () => {
  const element = useRoutes(routes as RouteObject[]);
  return element;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className={styles.app}>
          <Header />
          <main className={styles.main}>
            <Suspense
              fallback={
                <div className={styles.loaderContainer}>
                  <Loader size="large" />
                </div>
              }
            >
              <AppRoutes />
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
