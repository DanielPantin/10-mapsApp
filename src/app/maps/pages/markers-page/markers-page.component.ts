import { Component } from '@angular/core';
import { LngLat, Map, Marker } from '@maptiler/sdk';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: "./markers-page.component.css"
})
export class MarkersPageComponent {

  public markers: MarkerAndColor[] = [];
  public zoom: number = 13;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-7.96, 43.61);

  ngAfterViewInit(): void {

    this.map = new Map({
      container: 'map', // container's id or the HTML element to render the map
      style: "basic-v2",
      center: [-7.96, 43.61], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      navigationControl: false,
      geolocateControl: false,

    });

    this.readFromLocalStorage();

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Daniel Pantin'

    // const marker = new Marker({color: "#FF0000", element: markerHtml})
    //   .setLngLat(this.currentLngLat)
    //   .addTo(this.map);

  }

  createMarker() {

    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);

  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({
      color,
      marker,
    })
    this.saveToLocalStorage();


    marker.on("dragend", () => this.saveToLocalStorage());

  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
    // localStorage.removeItem("plainMarkers");
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    })
  }

  saveToLocalStorage() {
    const plainMarker: PlainMarker[] = this.markers.map(({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray(),
      }
    });

    localStorage.setItem("plainMarkers", JSON.stringify(plainMarker))

  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem("plainMarkers") ?? "[]";

    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({color, lngLat}) => {
      const coords = new LngLat(lngLat[0], lngLat[1]);
      this.addMarker(coords, color);
    })


  }

}
