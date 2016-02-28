$(function() {
    $("#visualisation").change(function() {
           domain=$( "#visualisation option:selected" ).text();
           if (domain=="Time")
           {
           plot_chart.series[0].update({pointInterval:1./Fe});
           plot_chart.xAxis[0].setExtremes(null,analyser.fftSize/Fe);
           plot_chart.xAxis[0].update({title:{text: "Time (s)"}});
           }
           if (domain=="Frequency")
           {
           plot_chart.series[0].update({pointInterval:Fe/analyser.fftSize});
           plot_chart.xAxis[0].setExtremes(null,Fe/2);
           plot_chart.xAxis[0].update({title:{text: "Frequency (Hz)"}});
           }
           draw();
           });
  }


//DRAW
draw= function(){
    if (domain=="Time")
    {
        drawVisual = requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray);
    }
    if (domain=="Frequency")
    {
        drawVisual = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
    }
    plot_chart.series[0].setData(dataArray,true,false);
}

function create_chart(){
    var chart=new Highcharts.Chart({   credits: {enabled: false,},
                                   chart: {renderTo:'plot',},
                                   title: {text:''},
                                   xAxis: {min: 0,max: Fe/2.,},
                                   yAxis: {min: 0,max: 256,},
                                   plotOptions: {line: {marker: {enabled: false},animation: false,}},
                                   series: [{
                                            data: [0,0],
                                            pointInterval:Fe/analyser.fftSize,
                                            pointStart: 0,
                                            enableMouseTracking: false
                                            }]
                                   });
    
    return chart;
}