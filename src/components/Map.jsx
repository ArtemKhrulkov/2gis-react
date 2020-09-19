import React, {useEffect, useState} from 'react';
import { load } from '@2gis/mapgl';
import { observer } from 'mobx-react-lite';
import { useStores } from '../hooks/use-stores';
import fillMarkersContainer from '../helpers/fillMarkersContainer';

const style = {
  width: '100%',
  height: `${window.innerHeight}px`
};

const MapWrapper = React.memo(
  () => {
    return <div id="map" style={{width: '100%', height: '100%'}}/>;
  },
  () => true,
);

const Map = observer(() => {
  const { markersStore } = useStores();
  const [mapgl, setMapGl] = useState();
  const [map, setMap] = useState();
  const [markersPoint, setMarkersPoint] = useState([]);

  useEffect(() => {
    load().then((mapglAPI) => {
      const mapInstance = new mapglAPI.Map('map', {
        center: [37.603554, 55.751341],
        zoom: 14,
        minZoom: 10,
        key: '6aa7363e-cb3a-11ea-b2e4-f71ddc0b6dcb',
      });
      setMap(mapInstance);
      setMapGl(mapglAPI);
    });

    return () => map && map.destroy();
  }, []);

  useEffect(() => {
    // Level 1. Выводим все маркеры на экран по запросу
    const markers = markersStore.getMarkers();

    if (markersPoint) {
      markersPoint.forEach(marker => marker.destroy());
      setMarkersPoint([]);
    }
    if (markers) {
      markers.forEach((marker) => {
        const point = new mapgl.Marker(map, {
          coordinates: [marker.lon, marker.lat]
        })
        setMarkersPoint(previousPoints => [...previousPoints, point]);
      })
    }
  }, [markersStore.markers]);

  useEffect(() => {
    // Level 2. Решение можно улучшить сделав сравнение расстрояние между маркерами не через вектора,
    // а через через сравнение расстояний между пикселями (более сложный вариант проверки)

    // создаем контейнер для массивов отфильтрованных точек
    const container = fillMarkersContainer(markersPoint, []);
    // скрываем все элементы в массивах, кроме первого
    container.forEach((params) => {
      params.forEach((p, idx) => idx !== 0 && p.hide())
    });

    map && map.on('zoom', (event) => {
      if (map.getZoom() > 16) {
        container.forEach((params) => {
          params.forEach((p) => p.show())
        });
      }
      if (map.getZoom() <= 15) {
        container.forEach((params) => {
          params.forEach((p, idx) => idx !== 0 && p.hide())
        });
      }
    })
  }, [markersPoint])

  return (
    <div style={style}>
      <MapWrapper/>
    </div>
  )
});

export default Map;
