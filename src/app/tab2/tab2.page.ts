import { Component,ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { EventService } from '../services/event-service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    
label:string
language:string;
  lines: any;
  hrzLines: any;
  hrzLines2: any;
  hrzLines3: any;
  colorArray: any;
  @ViewChild('hrzLineChart') hrzLineChart;
  constructor(public eventService:EventService){
    this.eventService.currentEvent.subscribe(data =>{
      if (data) {
        this.language = data.language
        if (this.language == 'EN') {
          this.label = "Product price"
        }else{
          this.label = "Precio del Producto"
        }
        
      }
    }) 
  }

  ionViewDidEnter() {

    this.createSimpleLineChart()
  }


  createSimpleLineChart() {
    this.hrzLines = new Chart(this.hrzLineChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
          label: this.label,
          data: [9.5, 7.0, 5, 6.5, 8.0, 6.5, 10, 12],
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


}
