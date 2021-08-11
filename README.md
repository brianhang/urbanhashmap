# UrbanHashmap
TODO

# Development
First, [install Docker Compose](https://docs.docker.com/compose/install/). Docker Compose is used to set the database and node.

Then, set up the database credentials by creating a file called `.env` in the project root directory with:
```
DB_USERNAME=username
DB_PASSWORD=password
```

Afterwards, create a file called `app.env`. This environment file is used for variables that the application code specifically. For example, the Facebook Login app ID, secrets, etc... This file should contain:
```
FB_APP_ID=<from https://developers.facebook.com/>
FB_APP_SECRET=<from https://developers.facebook.com/>
SESSION_SECRET=secretstringhere
```

Next, the TLS keys need to be set up for HTTPS to work. Create a directory named `keys` in the project root. This directory needs to contain two files:
- `key.pem`: The private key file for a certificate
- `cert.pem`: The certificate
I use [mkcert](https://github.com/FiloSottile/mkcert) to generate these files for development.
```
mkcert -install && mkcert -cert-file cert.pem -key-file key.pem
```
These `.pem` files should be created in your home directory.

Finally, start the application by running `docker-compose up`. By default, the app will be available at https://localhost:3000.
