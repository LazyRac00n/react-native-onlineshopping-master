import { observable } from 'mobx';

export default class OrderStore {
  @observable allDatas = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}
