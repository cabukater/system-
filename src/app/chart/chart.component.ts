import { ChartService } from './chart.service';
import { Component, OnInit } from '@angular/core';
import { createChart } from 'lightweight-charts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [DatePipe]
})
export class ChartComponent implements OnInit {
  dataCharts: any = [];
  constructor(
    private datePipe : DatePipe,
    private service : ChartService
  ) { }

  ngOnInit(): void {

    const chart = createChart(document.body, { width: 1400, height:800 });
    var lineSeries = chart.addLineSeries({ priceFormat: { minMove: 0.00000001 } });  

    this.service.getDataChart().subscribe( 

      chartData => {
        this.dataCharts = chartData,
        console.log(this.dataCharts)

        lineSeries.setData(this.dataCharts.map((cht: { timestamp: any; bid: number; }) => {

         return { time: this.datePipe.transform(new Date(cht.timestamp*1000), 'yyyy-MM-dd')  , value: cht.bid };

        }));
      }
    )
  }
}