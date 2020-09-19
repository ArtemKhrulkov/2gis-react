import {distance, exactEquals} from "./vec";
const fillMarkersContainer = (markersPoint, container) => {
  if(markersPoint.length > 0) {
    // проходимся через массив маркеров и фильтруем их по заданным точкам
    for (let i = 0; i < markersPoint.length; i++ ) {
      const point = markersPoint[i];
      let min = 1;

      const filteredPoints = markersPoint.filter((otherPoint, idx) => {
        if(exactEquals(point.getCoordinates(), otherPoint.getCoordinates())) {
          return;
        }
        const dist = distance(point.getCoordinates(), otherPoint.getCoordinates());
        if (dist < min) {
          min = dist;
          return otherPoint.getCoordinates();
        }
      });
      // пушим в контейнер массив
      container.push([point, ...filteredPoints]);
    }
  }

  return container;
}

export default fillMarkersContainer;