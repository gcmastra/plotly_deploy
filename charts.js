function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

// set global variable to hold wash frequency
global_wfreq = 2.0;

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  // get the function working then uncomment the next line 
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    // console.log(result);
    // set the global variable to use in the gauge chart in a different function
    global_wfreq = result.wfreq;
    if (global_wfreq == null) { 
      global_wfreq = 0.0
    };
  

    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var resultNames = data.sampleNames;
    var resultSamples = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var mySample = resultSamples.filter(thisSample => thisSample.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var firstSample = mySample[0];

    // console.log(mySample);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.

    
    // the sample_values look like they are already sorted in descending order
    // but should we assume that is always true, or sort it again to be sure?
    // AHA the DOM displays them in order but they are not really sorted when you try to work with them
    
    var sorted_sample = mySample.sort((a,b) => a.sample_values - b.sample_values);
    // try this irst to see if it sorts in ascending then i can reverse it
    
    var myValues = sorted_sample[0].sample_values.slice(0, 10).reverse();
    var myOtu_ids = sorted_sample[0].otu_ids.slice(0, 10).reverse();  
    var myOtu_labels = sorted_sample[0].otu_labels.slice(0, 10).reverse(); 
    
    // console.log(myValues);
      

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    var my_yLabels = myOtu_ids.map(item => "OTU " + item);

    
    // 8. Create the trace for the bar chart. 
    var barData = [
      {
      x: myValues,
      y: my_yLabels,
 
      // do we make the otu labels into the hover over text?
      type: "bar",
      orientation: "h"
      }
    ];
    // 9. Create the layout for the bar chart. 
    var barLayout = {

     title: "Top 10 Bacteria Cultures Found",
     labels: my_yLabels

    };
    // 10. Use Plotly to plot the data with the layout. 
    // debug - uncomment the next line after using console to verify the data
    Plotly.newPlot("bar", barData, barLayout);

    // Bar and Bubble charts

    // for bubble charts use the unsorted sample instead of sorted or the colors are the same
    
    var myBubbleValues = mySample[0].sample_values;
    var myBubbleOtu_ids = mySample[0].otu_ids;  
    var myBubbleOtu_labels = mySample[0].otu_labels; 
    var colornums = myBubbleOtu_ids.map(function(num){
      return num * 2;
    });

    // console.log(colornums);

    //  11. Create the trace for the bubble chart.
    // note that this the whole sample not just the top 10 and it does not have to be 
    // colors- i only have the first 4 and it still lets me build the chart
    // do I need to generate a list of random colors the same number of entries as the list?
    var bubbleData = [
      {
      x: myBubbleOtu_ids,
      y: myBubbleValues,
      // for labels do I want the list or just the first entry?
      text: myBubbleOtu_labels, 
      type: "bubble",
      mode: 'markers',
      marker: {
        color: colornums, 
        size: myBubbleValues
      }
      }
    ];

    // 12. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      x_axis_title: "OTU ID",
    };

    // 13. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
    
    // look up the wfreq to use in the gauge chart below, for now use a fixed number for testing
    // var wfreq = d3.select("WFREQ").text
    // var wfreq = 2.0;

    // var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    // borrowed code from buildMetadata - need to do it again because function was 
    // var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    // var result = resultArray[0];
    // var wfreq = result.wfreq;
    var wfreq = global_wfreq;

    // 14. Create the trace for the gauge chart.
    var gaugeData = [
      {
      // domain: { x: [0, 10], y: [0, 10] },
  		value: global_wfreq,
      //wfreq, global var metadata.wfreq from buildMetadata function
      type: "indicator",
		  mode: "gauge+number",
      gauge: {
        axis: { range: [null, 10] }
        }
      }
    ];
    
    // 15. Create the layout for the gauge chart.
    var gaugeLayout = { 
      title: "Belly Button Washing Frequency"
     
    };

    // 16. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
};
