import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgService } from '../services/msg.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
url;

  constructor(
  //  public activeRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
