import { LawnService } from './../services/lawn.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-lawn',
  templateUrl: './lawn.component.html',
  styleUrls: ['./lawn.component.css']
})
export class LawnComponent implements OnInit {

  id: string;
  lawnResult: any;
  dataPrecipitation: number[];
  dataTemperature: number[];


  public lineChartDataPrecipitation: ChartDataSets[] = [];
  public lineChartDataTemperature: ChartDataSets[] = [];

  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(private route: ActivatedRoute, private lawnService: LawnService) {
    this.route.paramMap.subscribe(params => {

      let id = params.get('id');
      this.id = id;

      this.lawnService.getLawn(this.id).subscribe(result => { this.lawnResult = result;

        this.dataPrecipitation = this.lawnResult[0].precipitation.precipitation;
        this.dataTemperature = this.lawnResult[0].temperature.temperature;

        this.lineChartDataPrecipitation = [
          { data: this.dataPrecipitation, label: 'Series A' },
        ];

        this.lineChartDataTemperature = [
          { data: this.dataTemperature, label: 'Series A' },
        ];

        console.log(this.lineChartDataPrecipitation);
        console.log(this.lawnResult); });
    });
  }

  ngOnInit() {  }

}