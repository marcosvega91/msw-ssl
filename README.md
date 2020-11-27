# Use MSW with a self signed certificate

## Example of usage

MSW is a very great tool for testing and for creating a mock server in a very easy way.
Anyway many users could have problems using it when they are running their application not on `localhost` domain.

I have two use cases in mind:

1. I want to access from my smartphone the application running on my computer.
2. I want to run my e2e tests on a docker container while my application is running on a different container.

In both cases I can't access my application using `localhost` but I should use the local IP of my network or the IP of the container.

MSW is using service worker to do all the magic and service workers require to use [site through HTTPS](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)

## How to solve

How we can solve ? We can create a self signed certifcate and use SSL on our application. Great!

## Installation

All my configuration are made on a Mac

I have installed `mkcert` using [`brew`](https://brew.sh/)

```bash
brew install mkcert
```
Then to create a CA on your machine you should run
```bash
mkcert -install
```
Install dependences of this project by running 
```bash
yarn
```
or 
```bash
npm install
```
Create a local certificate by running
```bash
mkdir -p .cert
mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"
```
If you want to use the certificate for more domains you can append them after "localhost", I have added my local IP for example

### Run

After installation you can run your application using
```bash
yarn start
```
or 
```bash
npm start
```

### Test
 
I have created also a test case using playwright. To run test you should start yor application first and the you can run 

```bash
yarn test
```

or 

```bash
npm test
```
