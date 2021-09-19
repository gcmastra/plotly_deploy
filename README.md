# Module 12 Challenge- Biodiversity interactive graphs
### Student Name: Christopher Mastrangelo

## Overview of Project 
Given a database of bacteria samples, create an interactive webpage to visualize and display bacteria counts from different samples after the user selects the participant ID number

- The working web page has been deployed to GitHub pages at this URL<br>
<a href="https://gcmastra.github.io/plotly_deploy/">https://gcmastra.github.io/plotly_deploy/</a>

## Deliverable 1
The Top 10 Sample bar chart has the following features 
- Title of chart is "Top 10 Bacteria Cultures Found"
- Bars are in horizontal orientation with the OUT ID labels on the Y-axis
- Sample array for each OTU ID are sorted in descending order and then the top 10 values are shown (using slice() method)

## Deliverable 2
- Title of chart is "Bacteria Cultures Per Sample"
- The Bubble Chart color scheme and bubble size were modified as follows
- Size of bubbles increased to 2 times the sample size for emphasis
- Color of each bubble is based on the sample ID which is used just to distinguish one sample from another

## Deliverable 3
- The Gauge chart has a maximum value of 10

## Deliverable 4 - Make 3 customizations
### A. Modify colors in .Jumbotron object
There is a way to do this in the Bootstrap CSS file for jumbotron class but I opted to change it in the HTML instead.
Changed the background color to light blue and the text color to "whitesmoke" which stands out better against the blue background.
![image](https://user-images.githubusercontent.com/86205000/133939842-74eaef49-168b-40f5-91e6-27e201af6bc2.png)

### B. Added code to check for a null value
Added code to check for a null value in the WFREQ found in the metadata and if null set to zero with data type float instead of integer.
Also by setting the variable global_wfreq I could pass the value from the buildMetadata() function to the buildCharts() function.
![image](https://user-images.githubusercontent.com/86205000/133939919-3b070948-161b-4109-8510-2c522d0e0b2a.png)

### C. One Additional Customization TBD
Working one one more from the list

## Other Technical Notes
The index.html file was modified to use the charts.js file instead of plots.js file
![image](https://user-images.githubusercontent.com/86205000/133939399-f524f52c-297e-4ca3-820e-f37c6575298f.png)
