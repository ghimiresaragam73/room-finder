import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css', './../../app.component.css']
})
export class FooterComponent implements OnInit {
  url;
  constructor(
    public activeRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

}
