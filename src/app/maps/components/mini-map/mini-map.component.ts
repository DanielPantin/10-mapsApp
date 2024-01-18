import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from '@maptiler/sdk';


@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: "./mini-map.component.css"
})
export class MiniMapComponent {

  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit() {

    if (!this.lngLat) throw "LngLat can't be null"

    const map = new Map({
      container: this.divMap?.nativeElement, // container's id or the HTML element to render the map
      style: "basic-v2",
      center: this.lngLat, // starting position [lng, lat]
      zoom: 9, // starting zoom
      navigationControl: false,
      geolocateControl: false,
      interactive: false,
      maptilerLogo: false
      // attributionControl: false,
    });

    new Marker()
    .setLngLat(this.lngLat)
    .addTo(map);

  }

}
