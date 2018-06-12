import * as sagas from './sagas';

export const initSagas = (sagaMiddleware) => {
    // projdeme pomoci middlewaru vsechny sagu a spustime
    Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
}