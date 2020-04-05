---
id: what-and-how
title: Getting Started
---

## What is Allusion JS?
Allusion JS is the javascript bug tracking framework, embed Allusion JS into your source and it will track all the javascript errors and pushes them to an endpoint configured by you. You just need to expose an endpoint from your backend services where Allusion's SDK will push errors to, this endpoint could lead to logs and alerting management platforms like Splunk or ELK. Allusion JS can give you deep insights about user interactions. It provides events in form of a timeline which makes debugging easy!

## How it works?
Import as an NPM module or a standalone JS into your source code. When Allusion JS is loaded onto the page it starts tracking all the user interactions, XHRs, unhandled promise rejections etc and classify these into events. Whenever an event of type "Error" comes up it pushes all the events happened till now to the configured endpoint. Dont worry we wont track the values of sensitive input fields like password :-). Why its important to push these logs to server? Imagine a user is trying to do some payments and the errors are coming up while validating or doing the payment, you are loosing a business there and those errors need to be logged to debug it as fast as possibile.