# Livedebug docker image

Run this image to output HTML string to browser.
Useful for debugging blocking languages like PHP when you do not want/have XDEBUG.

Available environment variables:

* LIVEDEBUG_PORT: Internal exposed port to listen on (default: 3030)
* LIVEDEBUG_URL: Host to listen on (default: http://localhost:3030)

Example DDEV file for UI available at http://debug.YOURSITE.ddev.site

  ```yaml
  services:
  livedebug:
    container_name: "ddev-${DDEV_SITENAME}-livedebug"
    image: guillaumedevreese/livedebug
    labels:
      com.ddev.site-name: ${DDEV_SITENAME}
      com.ddev.approot: ${DDEV_APPROOT}
    expose:
      - "3030"
    environment:
      - VIRTUAL_HOST=debug.$DDEV_HOSTNAME
      - HTTP_EXPOSE=80:3030
      - HTTPS_EXPOSE=443:3030
      - LIVEDEBUG_PORT=3030
      - LIVEDEBUG_URL=http://debug.$DDEV_HOSTNAME:3030
```

Use gdv/livedebug composer package to use Kint-backed debug functions.
