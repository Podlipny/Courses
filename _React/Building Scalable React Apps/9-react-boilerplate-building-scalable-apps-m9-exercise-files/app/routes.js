// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/HomePage'),
          System.import('containers/NavigationContainer/reducer'),
          System.import('containers/NavigationContainer/sagas'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([
          component,
          navigationReducer,
          navigationSagas,
        ]) => {
          injectReducer('navigationContainer', navigationReducer.default);
          injectSagas('navigationContainer', navigationSagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      childRoutes: [
        {
          path: '/topics/:topicName',
          name: 'linkListContainer',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/LinkListContainer/reducer'),
              System.import('containers/LinkListContainer/sagas'),
              System.import('containers/LinkListContainer'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('linkListContainer', reducer.default);
              injectSagas('linkListContainer', sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
          childRoutes: [
            {
              path: '/topics/:topicName/add',
              name: 'linkFormContainer',
              getComponent(nextState, cb) {
                const importModules = Promise.all([
                  System.import('containers/LinkFormContainer/reducer'),
                  System.import('containers/LinkFormContainer/sagas'),
                  System.import('containers/LinkFormContainer'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                  injectReducer('linkFormContainer', reducer.default);
                  injectSagas('linkFormContainer', sagas.default);
                  renderRoute(component);
                });

                importModules.catch(errorLoading);
              },
            },
          ],
        }, {
          path: '/login',
          name: 'loginContainer',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/LoginContainer/reducer'),
              System.import('containers/LoginContainer/sagas'),
              System.import('containers/LoginContainer'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('loginContainer', reducer.default);
              injectSagas('loginContainer', sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
      ],
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
