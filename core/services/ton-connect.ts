
import { TonConnect } from '@tonconnect/sdk';
import { FRONT_URL } from '../constants/front-url';


export const tonConnect = new TonConnect({
manifestUrl: `${FRONT_URL}/tonconnect-manifest.json`,
});
