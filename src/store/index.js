import { proxy } from 'valtio';

const state = proxy({
  home: true,
  magasinVirtuel: false,
  magasin: false,
  laboratoire: false,
  paiement: false
});

export default state;