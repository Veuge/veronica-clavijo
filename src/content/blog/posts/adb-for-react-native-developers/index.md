---
title: "ADB para desarrolladores en React Native"
date: "2020-01-17"
description: "Han habido ocasiones en las que he necesitado abrir AndroidStudio para realizar una simple tarea relacionada con el dispositivo Android. ¿Hay una manera más rápida?"
tags: ["react-native", "consola"]
---

En el tiempo que llevo desarrollando aplicaciones móviles con React Native muchas veces he tenido que abrir AndroidStudio para poder hacer _algo_ relacionado con el dispositivo (emulador o dispositivo físico).

Para aquellos que alguna vez han desarrollado para Android saben que AndroidStudio tarda un par de minutos en iniciar y que consume mucha memoria. Tiempo y recursos que no valen la pena ser utilizados para tareas sencillas y repetitivas...

Aprender un par de comandos de ADB me ha ayudado a hacer dichas tareas de manera más sencilla y rápida usando la línea de comandos, sin mencionar que me gusta mucho hacer cosas con la terminal :P.

# ¿Qué es ADB?

Según la [definición oficial](https://developer.android.com/studio/command-line/adb), Android Debug Bridge es una herramienta de línea de comandos que permite interactuar con el dispositivo con el que estás debuggeando una aplicación Android en desarrollo. Básicamente, un comando.

ADB tiene muchas opciones y argumentos que permiten ejecutar tareas diferentes en el emulador o dispositivo físico. Pero la estructura básica es:

```bash
adb [opción] comando
```

El argumento `opción` es innecesario si solo tienes un dispositivo o emulador conectado y `comando` es la acción que quieres ejecutar (es un argumento requerido).

Hay una lista muy larga de comandos que puedes ejecutar con `adb` para interactuar con el almacenamiento del dispositivo, para configurar los puertos, configurar el WiFi o las opciones de red y hasta tomar screenshots o grabar la pantalla del dispositivo.

Para ver todas las alternativas puedes ejecutar desde una línea de comandos

```bash
adb --help
```

o consultar la [documentación oficial](https://developer.android.com/studio/command-line/adb). En este post voy a describir solo unas cuantas que uso frecuentemente...


## 1. Port Forwarding

Este es un clásico, configurar la redirección de puertos. Si usas librerias como [Storybook](https://storybook.js.org/) o [Reactotron](https://infinite.red/reactotron) te encuentras con que necesitas comunicar el puerto del dispositivo que usan estas librerias a un puerto de tu maquina de desarrollo, `adb` te ayuda con esto!

```bash
adb reverse <puerto-remoto> <puerto-local>
```

En el caso de [Storybook](https://storybook.js.org/docs/guides/guide-react-native/) el puerto remoto es `tcp:7007`, por lo que el comando `adb` es:

```bash
adb reverse tcp:7007 tcp:7007
```

## 2. Abrir el menú de desarrollo

Si, ya sé que esto mismo se puede hacer con la combinación de teclado `Ctrl + M` (o `Cmd + M` para los usuarions de macOS). Pero yo lo hago con línea de comandos porque... se puede! xD

```bash
adb shell input keyevent 82
```

## 3. Copiar archivos desde y hacia el almacenamiento del dispositivo

Para copiar un archivo **hacia** el almacenamiento del dipositivo:

```bash
adb push <archivo-local> <archivo-dispositivo>
```

Por ejemplo:

```bash
adb push ~/Downloads/image.png /sdcard/Downloads/image.png
```

Para copiar un archivo **desde** el almacenamiento del dispositivo hacia tu máquina de desarrollo:

```bash
adb pull <archivo-disposivo> <archivo-local>
```

Por ejemplo:

```bash
adb pull /sdcard/Downloads/voice.aac ~/Downloads/voice.aac
```

## 4. Instalar una app

Si tienes un instalador .apk válido que quisieras instalar en un dispositivo desde la línea de comandos:

```shell
adb install <archivo-apk>
```

## 5. Sacar screenshot

Es útil también tomar una captura de pantalla del dispositivo en un determinado momento para documentar el estado de la aplicación. Se logra facilmente con la siguiente sintaxis del comando:

```shell
adb shell screencap <nombre-de-archivo>
```

Por ejemplo, el resultado de:

```shell
adb shell screencap /sdcard/Pictures/captura-pantalla.png
```

es una imagen en `/sdcard/Pictures` con el nombre `captura-pantalla.png`.

## 6. Grabar video de la pantalla

Así como se puede obtener una captura de pantalla, es también posible grabar un video de la pantalla.

```shell
adb shell screenrecord <nombre-de-archivo>
```

Para parar la grabación basta con presionar la combinación de teclado `Ctrl + C`.

Por ejemplo:

```shell
adb shell screenrecord /sdcard/Video/record.mp4

# 10 segundos después
Ctrl + C
```

## Bonus!

Este no es un comando de ADB en sí, pero es posible abrir un emulador Android mediante la línea de comandos.

En el directorio donde está instalado el Android SDK y dentro del directorio emulator (`/path/to/Android/Sdk/emulator`) existe un ejecutable llamado `emulator` con el cual se puede levantar un emulador:

```bash
cd /path/to/Android/Sdk/emulator
./emulator @<nombre-del-emulador>
```

Para tener una lista de los emuladores disponibles para ejecutar:

```bash
./emulator -list-avds
```

En mi caso la salida de este último comando es:

```bash
# Example Response!
Pixel2
Pixel2old
Pixel_2_API_25
Pixel_2_API_26
```

Por lo que un ejemplo de comando para ejecutar el emulador Pixel2 es:

```bash
emulator @Pixel2
```

Por facilidad yo creé un link simbolico que apunta al ejecutable `/path/to/Android/Sdk/emulator/emulator` ;)

Básicamente esos son los comandos que uso diaramente para desarrollar con React Native para Android. Saludos!
