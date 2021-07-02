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

    const chart = createChart(document.body, { width: 400, height: 300 });
    var lineSeries = chart.addLineSeries({ priceFormat: { minMove: 0.00000001 } });  

    this.service.getDataChart().subscribe( 

      chartData => {
        this.dataCharts = chartData,
        console.log(this.dataCharts)

        const changeFormat = this.dataCharts.map( (timestamp:  { timestamp: any; }) => {
          return { time: new Date(timestamp.timestamp)
        }})
        
        lineSeries.setData(this.dataCharts.map((cht: { timestamp: any; high: any; }) => {

          const date = new Date(cht.timestamp*1000)
            console.log(date)
         return { time: this.datePipe.transform(date, 'yyyy-MM-dd')  , value: cht.high };

        }));
      }
    )
  }
}