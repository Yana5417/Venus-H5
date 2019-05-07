import { combineReducers } from 'redux';
import apiReducer from './apiReducer';
import { user } from './user';
import { sectionModal } from './sectionModal';

const rootReducer = combineReducers({
  user,
  sections: apiReducer({ state: 'FETCH_BABY_SECTION' }),
  interest: apiReducer({ state: 'FETCH_BABY_INTEREST_DETAIL' }),
  base_interest: apiReducer({ state: 'FETCH_BABY_INTEREST_TAGS' }),
  read: apiReducer({ state: 'FETCH_BABY_READS' }),
  base_read: apiReducer({ state: 'FETCH_BASE_BABY_READS' }),
  family: apiReducer({ state: 'FETCH_BABY_FAMILY_DETAIL' }),
  footprint_domestic: apiReducer({ state: 'FETCH_BABY_Footprint_DOMESTIC_DETAIL' }),
  footprint_overseas: apiReducer({ state: 'FETCH_BABY_Footprint_OVERSEAS_DETAIL' }),
  character: apiReducer({ state: 'FETCH_BABY_CHARACTER_DETAIL' }),
  impressions: apiReducer({ state: 'FETCH_BABY_EVALUATE' }),
  sectionModal,
});

export default rootReducer;
