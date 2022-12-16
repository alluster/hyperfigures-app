## Google Data in Hyperfigures Client

The Hyperfigures App connects to Google data sources to fetch a user's/organization's drive files and contents.

## Config



## The flow in human terms

Step 0: We have google client inited
- you are in the dashboard view of a certain datapoint configuration
- click Publish Dashboard
    - Dashboard.js handles the request, and what it does is
        - receives the current dashboard metadata (name, ids, etc)
    - calls createPublicDashboard()


