import {Component, OnInit} from '@angular/core';
import {SignaturesService} from "./signatures.service";

@Component({
  moduleId: module.id,
  selector: 'signatures',
  templateUrl: 'signatures.component.html'
})
export class SignaturesComponent implements OnInit {
  private news: string[] = [];
  private olds: string[] = [];
  constructor(private service: SignaturesService) {
  }

  ngOnInit() {
  }

  submit(signatures: string): void {
    $('#signatures').val("");
    this.service.replace(signatures, 30002811).then(data => {
      this.news = data.json().new;
      this.olds = data.json().old;
    });
  };
}
