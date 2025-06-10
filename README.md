# SPIT Hackthon Website

The official SPIT Hackthon 2025 website.

## Environment

- Built on Node.js v20
- Framework: Next.js 15

## Installing Prerequisites
1. Curl - `sudo apt install curl`
2. Node.js and npm
```bash
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 20

# Verify the Node.js version:
node -v # Should print "v20.19.2".
nvm current # Should print "v20.19.2".

# Verify npm version:
npm -v # Should print "10.8.2".
```
3. PM2 - to manage the Node.js process which will help to automatically start the app if the server reboots.

`npm install -g pm2`


## Setting up Repository
1. `cd` to `/var/www/`
2. Clone this repository - `git clone https://github.com/CSI-SPIT/SPIT-Hackathon-25.git`
3. Rename `SPIT-Hackathon-25` to `html` - `sudo mv SPIT-Hackathon-25/ html/`
4. Check permission of current user on `html` directory:

```bash
ls -l /var/www/html/
```

If write access is not there, run:

```bash
sudo chown -R $USER:$USER /var/www/html
```

## Building the Nextjs App

1. `cd` to the `html` directory.
2. Run `npm install` to install dependencies.
3. Run `npm run build` to build the source files.

## Deploying Nextjs App

1. Start the Next.js App
  `pm2 start npm --name "spit-hackathon-website" -- start`
2. Save the PM2 process \
  `pm2 save` \
  `pm2 startup`

## Changes required for Deployment

Below is the Nginx configuration for website:

```nginx
  location /_next/static/ {
    alias /var/www/html/.next/static/;
  }

  location / {
    proxy_pass http://localhost:3000; # Next.js app runs on port 3000 by default
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  error_page 404 /404.html;
  location = /404.html {
    root /var/www/html/public/;
    internal;
  }
```
