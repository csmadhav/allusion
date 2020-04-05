---
id: api-references
title: API Reference
---

## Setup options
While calling `init` or importing standalone build of Allusion JS make sure you have properly configured setup options.

We currently support only one setup option:

| Option       | Type      | Description   | Required |
|:------------:|:---------:|-------------|----------|
|`trackingUrl` | `string`  | Endpoint to push [payload](#payload) to, this should to any logging and alert management platforms like ELK, splunk, cloudwatch or your company's inhouse solution. Request method to this URL would be `POST`| `true` |
<a name="payload"></a>

## The Payload

The payload which trackingUrl will receive.

| Property       | Type      | Description   |
|:------------:|:---------:|-------------|
|`global_user_id` | `string`  | Allusion assigns user an ID and saves it in form of cookie, when user returns the webpage, we identify its the same user using cookie value. |
|`global_visit_id` | `string`  | Allusion assigns each user's visit an ID. You can search your logs using this ID. You may get multiple entries in your log for the same visit ID since Allusion will send this payload for each error. Each payload will contain event details (like click, XHR sent and all) occured before the error. Once and event is sent it wont be sent again. Number of payloads sent from the page would be equal to the errors encountered on the page. |
|`url` | `string`  | URL of the page where Allusion reported error. |
|<a name="visited_at"></a>`visited_at` | `string`  | timestamp when user visited the page (UTC). |
|`events` | `[]Event`  | This will be a array of event objects. Checkout [Event](#event) object. |
<a name="event"></a>

## The Event object.

| Property       | Type      | Description   |
|:------------:|:---------:|-------------|
|`event_type` | `Enum`  | event type occurred on the page. Checkout [EventType](#eventtype) enum.  |
|`visit_timestamp` | `Number`  | seconds till the [visited_at](#visited_at). |
|`event_data` | `EventData`  | event related data goes in to this object. Checkout [EventData](#eventdata) object. |
<a name="eventtype"></a>

## The EventType enum.

| Event Name       | Description   |
|:------------:|---------|
|`click` | User clicked an element on the page |
|`change` | Input change event |
|`load` | DOM load event |
|`promiseRejectionEvent` | any promise rejection event |
|`xhrSent` | xhr was sent event |
<a name="eventdata"></a>

## The EventData object.

| Property       | Type      | Description   |
|:------------:|:---------:|-------------|
|`srcElement` | `string`  | target element which caused this error. In case of click target element would be the element which was clicked. It may come for `click` and `change` events. |
|`stack` | `string`  | call stack for the error. It may come for `error` or `promiseRejectionEvent`. |
|`event_data` | `EventData`  | event related data goes in to this object. Checkout [EventData](#eventdata) object. |
|`url` | `string`  | URL of the xhr, it may only come for `xhrSent` event |
|`method` | `string`  | HTTP method of the xhr, it may only come for `xhrSent` event |
|`responseText` | `EventData`  | response as a text of the xhr, it may only come for `xhrSent` event |
|`status` | `Number`  | response status of the xhr, it may only come for `xhrSent` event |