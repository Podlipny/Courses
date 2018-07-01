export const combineReducers = (config) => {
    return (state, action) => {
        // vezmeme keys a na vsechny aplikujeme function a vratime upraveny state, ktery predavame
        return Object.keys(config).reduce((state, key) => {
            const reducer = config[key];

            // zjistime previous state
            const previousState = state.get(key);

            // zavolame reducer s previousState a action
            const newValue = reducer(previousState, action);

            if (!newValue) {
                throw new Error(`A reducer returned undefined when reducing key::"${key}"`);
            }
            // nastavbime store new value - key je jmeno naseho reduceru
            return state.set(key, newValue);
        }, state);
    };
}