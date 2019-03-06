import { Directive, Input, ElementRef,
                OnInit, OnChanges, SimpleChange  } from '@angular/core';
import * as d3 from "d3";

@Directive({
  selector: 'donut-chart'
})
export class DonutChartComponent implements OnInit, OnChanges  {
  @Input() data: number;
  @Input() size: number;
  @Input() background: string;
  @Input() foreground: string;
  element: any;
  vCircunferencia: number; arc: any;
  foregroundC: any; textEl: any;
  progress: number = 0;

  constructor(private elementRef: ElementRef ) {
    this.element = this.elementRef.nativeElement;

  }

    donutChart(background: string = "E0E0E0", size: number){
      let width = size;
      let height = size;

      this.vCircunferencia = 2 * Math.PI; // valor de una circungerencia

      this.arc = d3.arc()
                        .startAngle(0)
                        .innerRadius(size/4)
                        .outerRadius(size-size/2);

      var svg = d3.select(this.element).append('svg')
                       .attr("width",   width)
                       .attr("height", height)
                       .append("g")
                       .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      var meter = svg.append("g")
                            .attr("class", "progress-meter");
            meter.append("path")
                      .attr("class", "background")
                      .attr("d", this.arc.endAngle(this.vCircunferencia))
                      .attr("fill", "#"+ background);

        this.foregroundC = meter.append("path")
                                                    .attr("class", "foreground");

        this.textEl = meter.append("text")
                                         .attr("text-anchor", "middle")
                                         .attr("dy", "0.35em");

  }
  ngOnInit(){
    this.donutChart(this.background, this.size);
    this.render(this.data, this.foreground);
  }

    ngOnChanges( changes: { [propName: string] : SimpleChange } ){
      /*
          {
            'data': {
                currentValue: ...
                previosValue: ...
                isFirstChange: ...
          }
        }
      */
      this.render(changes['data'].currentValue, this.foreground);
    }

  render(percentage:number, foreground: string = "424242"){
    var i = d3.interpolate(this.progress, percentage/100);
    var vm = this;
    d3.transition()
        .tween("progress", ()=>
                     function(t){
                     /* mostramos el progreso */
                        vm.progress = i(t);
                        vm.foregroundC.attr("d", vm.arc.endAngle(vm.vCircunferencia*vm.progress));
                        vm.foregroundC.attr("fill", "#"+foreground);
                        vm.textEl.text(d3.format(".0%")(vm.progress));
                      }
        );


  }


}
