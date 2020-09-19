import {action, observable,decorate} from 'mobx';
import ApiService from '../service/ApiService';

export class MarkersStore {
  markers = [];

  async requestMarkers(params) {
    const markers = await ApiService.getRequestedMarkers(params);
    this.setMarkers(markers);
    return true;
  }

  setMarkers(value) {
    this.markers = value;
  }

  getMarkers() {
    return this.markers?.items;
  }
}

decorate(MarkersStore, {
  markers: observable,
  requestMarkers: action,
  setMarkers: action,
  getMarkers: action,
});