import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import PERSONS from "../data/person.json";
// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios, { delayResponse: 3000 });

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet("/employees").reply(200, PERSONS);

axios.get("/employees").then(function (response) {});
