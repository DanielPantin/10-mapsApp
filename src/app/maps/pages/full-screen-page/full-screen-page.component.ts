import { AfterViewInit, Component } from '@angular/core';
import {Map} from '@maptiler/sdk';



@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: "./full-screen-page.component.css"
})

export class FullScreenPageComponent implements AfterViewInit{

  ngAfterViewInit(): void {
    const map = new Map({
      container: 'map', // container's id or the HTML element to render the map
      style: "dataviz",
      center: [16.62662018, 49.2125578], // starting position [lng, lat]
      zoom: 14, // starting zoom
      navigationControl: false,
      geolocateControl: false,
    });
  }




}
