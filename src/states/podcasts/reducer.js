import ACTION_TYPES from "./action-types";
import INIT_STATE from "./init-state";

const Reducer = (state, { type, payload }) => {
  const config = {
    [ACTION_TYPES.SET_PODCASTS]: () => ({ ...state, podcasts: payload }),
    [ACTION_TYPES.RESET]: () => ({ ...INIT_STATE }),
  };
  return config[type]?.() ?? state;
};

export default Reducer;
