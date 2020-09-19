import React from 'react'
import { MarkersStore } from '../stores/MarkersStore';

export const storesContext = React.createContext({
  markersStore: new MarkersStore(),
});