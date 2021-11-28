import { Component, OnInit } from '@angular/core';
import {PopulationService} from '../../private/services/population.service';

const populations = [{
    id: 1,
    name: 'Joycelin',
    surname: 'Fisbburne',
    email: 'jfisbburne0@webeden.co.uk',
    gender: 'Polygender'
  }, {
    id: 2,
    name: 'Daisy',
    surname: 'Beeckx',
    email: 'dbeeckx1@who.int',
    gender: 'Bigender'
  }, {
    id: 3,
    name: 'Patten',
    surname: 'Rickson',
    email: 'prickson2@wufoo.com',
    gender: 'Polygender'
  }, {
    id: 4,
    name: 'Tammy',
    surname: 'Furbank',
    email: 'tfurbank3@vistaprint.com',
    gender: 'Genderqueer'
  }, {
    id: 5,
    name: 'Sally',
    surname: 'Dubbin',
    email: 'sdubbin4@bravesites.com',
    gender: 'Female'
  }, {
    id: 6,
    name: 'Domenico',
    surname: 'Prin',
    email: 'dprin5@google.ru',
    gender: 'Non-binary'
  }, {
    id: 7,
    name: 'Rosie',
    surname: 'Becke',
    email: 'rbecke6@sakura.ne.jp',
    gender: 'Agender'
  }, {
    id: 8,
    name: 'Adrian',
    surname: 'Monument',
    email: 'amonument7@ibm.com',
    gender: 'Bigender'
  }, {
    id: 9,
    name: 'Quinn',
    surname: 'Ida',
    email: 'qida8@sbwire.com',
    gender: 'Genderfluid'
  }, {
    id: 10,
    name: 'Bambi',
    surname: 'Doni',
    email: 'bdoni9@va.gov',
    gender: 'Non-binary'
  }];

@Component({
  selector: 'app-population-overview',
  templateUrl: './population-overview.component.html',
  styleUrls: ['./population-overview.component.css']
})
export class PopulationOverviewComponent implements OnInit {

  population = populations;

  constructor(
    private populationService: PopulationService,
  ) { }

  ngOnInit(): void {
    this.fetchPopulation();
  }

  // tslint:disable-next-line:typedef
  fetchPopulation() {
    /*this.populationService.getPopulation().subscribe((res: any) => {
      this.population = res.data;
    });*/
  }
}
