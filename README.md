# Contact Tracerr

> Full stack Django/React/Redux app that uses token based authentication with Knox to track users localizations and find possible contacts with COVID19 Virus

<img width="1440" alt="Screen Shot 2021-02-19 at 13 56 20" src="https://user-images.githubusercontent.com/37647916/108538182-495ab980-72bd-11eb-9a99-c3d83e0889af.png">

## Quick Start

```bash
# Install dependencies
npm install

# Serve API on localhost:8000
python covid_contact_tracer/manage.py runserver

# Run webpack (from root)
npm run dev

# Build for production
npm run build
```

## Usage Guide

### Location
Each item represents a place that you visited, ordered in chronological order. You can click the place icon to see the location on the map. Don't upload the same locations or another users locations in your account, time and date needs to be unique.

By clicking the location you will be abre to see details about the place, like number of people that you entered in contact, and the number of notification(possible encounters with infected people).

<p align="center">
  <img width="412" alt="Location" src="https://user-images.githubusercontent.com/37647916/108536619-6a220f80-72bb-11eb-8216-cedde70b3949.png">
</p>

Here you can notify (alert) another users about your infection or delete the location from the database.
<p align="center">
  <img width="341" alt="LocationCard" src="https://user-images.githubusercontent.com/37647916/108536620-6abaa600-72bb-11eb-8de8-9e8654469975.png">
</p>

### Alerts

A location is marked as a yellow alert when you notified this place as a possible infected.
<p align="center">
  <img width="414" alt="YellowAlert" src="https://user-images.githubusercontent.com/37647916/108536642-6db59680-72bb-11eb-824f-4b1b73b51a50.png">
</p>

A location is marked as a red alert when another user notified this place as a possible infected. In this case keep attempt to COVID-19 symptoms and follow the instructions provided by the health authorities.

<p align="center">
  <img width="413" alt="RedAlert" src="https://user-images.githubusercontent.com/37647916/108536627-6bebd300-72bb-11eb-8808-438a35eb211f.png"></p>
</p>

When a location is notified by you and another user, it will display as a red alert and a text bellow the time will display that you notified too.
<p align="center">
  <img width="411" alt="DoubleAlert" src="https://user-images.githubusercontent.com/37647916/108536597-65f5f200-72bb-11eb-8efe-956e53049abf.png">
</p>

### Map

<p align="center">
  <img width="571" alt="Map" src="https://user-images.githubusercontent.com/37647916/108536623-6b533c80-72bb-11eb-9d8e-cacb8cb75790.png">
</p>

Map all your timeline, be careful that is possible that multiple locations stack, when this happens, the alerts will be on top. You can click the icon to view more datails.

A location is marked as a yellow alert when you notified this place as a possible infected.

A location is marked as a red alert when another user notified this place as a possible infected. In this case keep attempt to COVID-19 symptoms and follow the instructions provided by the health authorities.

When a location is notified by you and another user, it will display as a red alert and a text bellow the time will display that you notified too.

### HeatMap

Show in a format of heatmap the places that you visited, more brighter more is the density.

<p align="center">
  <img width="569" alt="HeatMap" src="https://user-images.githubusercontent.com/37647916/108536613-68f0e280-72bb-11eb-9b00-7f3340da8d1c.png">
</p>

### How to Upload my Locations

Step 1: Sign in to your Google Account

Google store all your data, wich includes your geographic location. We will use that data, to analyze and compare with other users data, when a contact happens. Don't worry only you have acess to your data in Contact Tracerr.

<p align="center">
  <img width="461" alt="Login" src="https://user-images.githubusercontent.com/37647916/108536622-6b533c80-72bb-11eb-82ba-3b2f5a9a836a.png">
</p>

Step 2: Go to Google Takeout

<p align="center">
  <img width="674" alt="Takeout" src="https://user-images.githubusercontent.com/37647916/108536628-6bebd300-72bb-11eb-9947-18f6e759754e.png">
</p>

In "Multiple formats" choose JSON

<p align="center">
  <img width="538" alt="TakeoutFormat" src="https://user-images.githubusercontent.com/37647916/108536638-6d1d0000-72bb-11eb-918a-19feef9805fc.png">
</p>

Click "Next step"

Choose your delivery method, frequency, file type, and maximum size. For our purpose just one export is enough, if you have a good network connection you can change the limit size to a larger one.

<p align="center">
  <img width="658" alt="TakeoutConfig" src="https://user-images.githubusercontent.com/37647916/108536631-6c846980-72bb-11eb-9803-ba4bed8b693d.png">
</p>

Click "Create export". This can take a few minutes, after that the export will be delivered to the place you chose in delivery method.

Step 3: Extract and Upload
Now extract your .zip or .tar file, it will contain all your data.

Open folder "Takeout". Go to "Location History", inside this folder you will find all your location history in the file "Location History.json".

We don't recommend using this file, because of the large size, what we recommend using the files inside the folder "Semantic Location History, that separates your history by year and month.

<p align="center">
<img width="828" alt="Folders" src="https://user-images.githubusercontent.com/37647916/108536605-67bfb580-72bb-11eb-8be3-44f683886b26.png">
</p>

Now just use the upload tool in the website.

<p align="center">
<img width="594" alt="Upload" src="https://user-images.githubusercontent.com/37647916/108536640-6db59680-72bb-11eb-9389-60f1e654ff94.png">
</p>

## Screenshots

<img width="1440" alt="Screen Shot 2021-02-19 at 13 58 28" src="https://user-images.githubusercontent.com/37647916/108538198-4e1f6d80-72bd-11eb-8458-dee4ffbcaaae.png">
<img width="1440" alt="Screen Shot 2021-02-19 at 13 59 19" src="https://user-images.githubusercontent.com/37647916/108538201-4f509a80-72bd-11eb-8008-3291ca7864e9.png">
<img width="1440" alt="Screen Shot 2021-02-19 at 13 59 31" src="https://user-images.githubusercontent.com/37647916/108538203-4fe93100-72bd-11eb-80bd-df5ee33ba84c.png">





