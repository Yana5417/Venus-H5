import { ENV } from '@/constants';

if (ENV === 'development' && window.localStorage) {
  window.localStorage.setItem('debug', 'constants,containers:*,components:*,utils:*,actions:*');
}
