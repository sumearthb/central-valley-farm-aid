**Canvas / Ed Discussion group number:**

Group 14

**Names of the team members:**

-   Martin Murtiono

-   Akif Abidi

-   Anthony Do

-   Kunal Mody

-   Samarth Bhat

**Name of the project:**

Rural Farm Aid

**The proposed project:**

Our website helps rural farmers in the United States identify where they can sell their crops in farmers' markets based on their location and the crops that they grow. It also shows them what non-profit organizations can provide assistance based on their location and crops.

**URLs of at least three data sources that you will programmatically scrape using a RESTful API**

<https://www.usdalocalfoodportal.com/fe/fregisterpublicapi/>

<https://charityapi.orghunter.com>

<https://quickstats.nass.usda.gov/>

<https://developers.google.com/maps/>

**At least three models:**

-   Location (state/region in US)

-   Type(s) of crops grown

-   Non-profits

-   Farmers' markets

**An estimate of the number of instances of each model:**

-   Location: 50

-   Type(s) of crops grown: >= 50

-   Non-profits: >= 100

-   Farmers' markets: >= 1000

**Each model must have many attributes:**

Location (state/ region in US)

1.  Number/variety of crops sold

2.  Crops that are grown in the region

3.  Climate

4.  Name

5.  Non-profits in the region

6.  Number of markets in the region

7.  Volume of agricultural production

Type(s) of crops grown

1.  Name

2.  Cost of growing crop (seed price)

3.  Average selling price 

4.  Image of crop

5.  Region crop is grown

6.  Time to grow

7.  Shelflife

8.  Drought/weather tolerance

9.  High yield potential

Non-profits

1.  Location

2.  Specializations (grants, infrastructure, materials)

3.  Name of organization

4.  Logo

5.  Contact info

6.  Mission statement

7.  Fees of service (free, low-cost, or some other value)

Farmers' markets

1.  Location

2.  Hours of operation

3.  Name

4.  Produce offered

5.  Non-profits connected

6.  Contact info

7.  Description

**Describe five of those attributes for each model that you can filter or sort:**

Location (state/ region in US)

1.  Number/variety of crops sold

2.  Name

3.  Number of markets in the region

4.  Number of non-profits in the region

5.  Volume of agricultural production

Type(s) of crops grown

1.  Cost of growing crop (seed price)

2.  Average selling price 

3.  Region crop is grown

4.  Name of crop

5.  Time to grow

6.  Shelflife

Non-profits

1.  Location

2.  Specializations (grants, infrastructure, materials)

3.  Name

4.  Crop focus

5.  If service has fees or not

Farmers' markets

1.  Location

2.  Hours of operation

3.  Name

4.  Number/variety of produce

5.  Number of vendors

**Instances of each model must connect to instances of at least two other models:**

-   Non-profits → location/types of crops

-   Farmers' markets → location/types of crops/non-profits

-   Crops → location

Number of connections:

Location: 3

Type(s) of crops grown: 3

Non-profits: 3

Farmers' Markets: 3

**Describe two types of media for instances of each model:**

Crops 

1.  Image of the crop

2.  Important characteristics/values of the crop 

Location

1.  Map of the particular area

2.  Most common crops in a location (could be a graph) 

Non-profits

1.  Links to more information about the organization

2.  Image (logo) 

Farmers' Markets

1.  Add the hours of operation for each instance

2.  Map -- could also integrate Google Maps API to enter an origin and find the shortest route to said market

**Describe three questions that your site will answer:**

1.  Where can rural farmers go to sell their products in nearby farmers' markets?

2.  What non-profit organizations can help rural farmers sell their products based on location and crops grown?

3.  How can the farmers get started or receive assistance in selling their crops?
