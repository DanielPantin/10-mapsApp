import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { LngLat, Map } from '@maptiler/sdk';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: "./zoom-range-page.component.css"
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{

  public zoom: number = 10;
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
    this.mapListeners();
  }

  mapListeners(){
    if(!this.map) throw "El mapa no existe";

    this.map.on("zoom", (ev) => {
      this.zoom = this.map?.getZoom()!;
    });

    this.map.on("zoomend", (ev) => {
      if(this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    });

    this.map.on("move", () =>{
      this.currentLngLat = this.map!.getCenter();
    })

  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged(value: string){
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }

}
