# Use MSW with a self signed certificate

## Example of usage

MSW is a very great tool for testing and for creating a mock server in a very easy way.
Many users could have problems using it when they are running their application not on `localhost` domain.

I have two use cases in mind:

1. I want to access from my smartphone the application running on my computer.
2. I want to run my e2e tests on a docker container while my application is running on a different container.

In both cases I can't access my application using `localhost` but I should use the local IP of my network or the IP of the container.

MSW is using service workers to do all the magic but they require to be used [through HTTPS](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)

## How to solve

How we can solve ? We can create a self signed certifcate and use SSL on our application. Great!😎

## Installation

All my configuration are made on a Mac

I have installed [`mkcert`](https://github.com/FiloSottile/mkcert) using [`brew`](https://brew.sh/)

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
mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem localhost app
```
If you want to use the certificate for more domains you can append them after localhost, I have added my local IP for example

To make it works on mobile or other systems you could install the CA certificate. See [this section](https://github.com/FiloSottile/mkcert#installing-the-ca-on-other-systems) on `mkcert` library 

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

I have created the test case using playwright. To make test works with local and docker env I have added into my /etc/hosts the entry
```
127.0.0.1 msw-app
```

 To run test you should start your application first and then you can run. 

```bash
yarn test
```
or 
```bash
npm test
```


### With Docker

I have created two Dockerfile, one for the application and one for the test framework.

SSL certificate should be installed on the application container while the CA certificate should be installed on test container.

After you have created a local CA cert with the command `mkcert -install` you can copy the CA file into `.cert` folder. To get the folder containing the CA file you can run

```bash
mkcert -CAROOT 
```

Copy the `.pem` file inside the CA root folder into `.cert` folder created above.

The first thing to do is build the two images so you can run

```bash
docker build -t msw-playwright --file Dockerfile.playwright .
```

for the test container, and 

```bash
docker build -t msw-app --file Dockerfile.node .
```

for the app container.

You need also a network to make the two containers to communicate, so run

```bash
docker network create --driver bridge msw-net
```

Now is time to run our application so 

```bash
docker run -it --rm --network msw-net --name msw-app -p 3000:3000 msw-app
```

and

```bash
docker run -it --rm --network msw-net --name msw-test  msw-playwright
```








